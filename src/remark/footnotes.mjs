// src/remark/footnotes.mjs
import { visit } from 'unist-util-visit';

export function stripUserContent() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Strip from id attributes
      if (node.properties?.id?.startsWith('user-content-')) {
        node.properties.id = node.properties.id.replace('user-content-', '');
      }
      // Strip from href attributes
      if (node.properties?.href?.startsWith('#user-content-')) {
        node.properties.href = node.properties.href.replace('user-content-', '');
      }
    });
  };
}

export function remarkFootnotes() {
  return (tree) => {
    const footnotes = new Map();
    const toRemove = [];

    function extractText(node) {
      if (!node.children) return '';
      return node.children.map(c => {
        if (c.type === 'text') return c.value;
        if (c.type === 'link') {
          const text = c.children?.map(t => t.value || '').join('') || '';
          const url = c.url || '';
          return `[${text}](${url})`;
        }
        if (c.type === 'emphasis') {
          const text = c.children?.map(t => t.value || '').join('') || '';
          return `*${text}*`;
        }
        if (c.type === 'strong') {
          const text = c.children?.map(t => t.value || '').join('') || '';
          return `**${text}**`;
        }
        if (c.type === 'inlineCode') return `\`${c.value}\``;
        if (c.type === 'html') return c.value || '';
        return c.value || '';
      }).join('');
    }

    // Find footnote definitions: "[^1]: text"
    function findDefinitions(node, parent) {
      if (node.type === 'paragraph') {
        const text = extractText(node);
        const match = text.match(/^\[\^(\w+)\]:\s*(.+)/);
        if (match) {
          footnotes.set(match[1], match[2]);
          // Remove THIS paragraph from its parent
          const index = parent.children.indexOf(node);
          if (index !== -1) parent.children.splice(index, 1);
          return;
        }
      }
      if (node.children) {
        for (const child of node.children) {
          findDefinitions(child, node);
        }
      }
    }

    findDefinitions(tree, tree);

    // Find footnote references: "[^1]" in text
    visit(tree, 'text', (node) => {
      node.value = node.value.replace(/\[\^(\w+)\]/g, (match, id) => {
        footnotes.set(id, footnotes.get(id) || '');
        return `<sup><a href="#fn-${id}" id="fnref-${id}" class="footnote-ref" data-footnote-ref>${id}</a></sup>`;
      });
    });

    // Find footnote references in HTML element text content
    visit(tree, 'element', (node) => {
      if (node.children) {
        for (const child of node.children) {
          if (child.type === 'text' && child.value.includes('[^')) {
            child.value = child.value.replace(/\[\^(\w+)\]/g, (match, id) => {
              footnotes.set(id, footnotes.get(id) || '');
              return `<sup><a href="#fn-${id}" id="fnref-${id}" class="footnote-ref" data-footnote-ref>${id}</a></sup>`;
            });
          }
        }
      }
    });

    // Find footnote references in raw HTML content
    visit(tree, 'html', (node) => {
      if (node.value?.includes('[^')) {
        node.value = node.value.replace(/\[\^(\w+)\]/g, (match, id) => {
          footnotes.set(id, footnotes.get(id) || '');
          return `<sup><a href="#fn-${id}" id="fnref-${id}" class="footnote-ref" data-footnote-ref>${id}</a></sup>`;
        });
      }
    });

    // Find HTML footnote references: <a href="#fn-X" id="fnref-X">
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href?.match(/^#fn-\w+$/)) {
        const id = node.properties.href.replace('#fn-', '');
        footnotes.set(id, footnotes.get(id) || '');
      }
    });

    // Find HTML footnote definitions: <li id="fn-X">
    visit(tree, 'element', (node) => {
      if (node.tagName === 'li' && node.properties?.id?.startsWith('fn-')) {
        const id = node.properties.id.replace('fn-', '');
        const text = node.children
          .filter(c => c.type === 'text')
          .map(c => c.value)
          .join('');
        footnotes.set(id, text);
      }
    });

    // Remove parsed definitions from tree
    for (const { index, parent } of toRemove.reverse()) {
      parent.children.splice(index, 1);
    }
  };
}