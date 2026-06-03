// src/remark/footnotes.mjs
import { visit } from 'unist-util-visit';

export function remarkFootnotes() {
  return (tree, file) => {
    const raw = file.value || '';
    const footnotes = {};
    
    // Extract all [^id]: text from raw markdown
    const regex = /^\[\^(\w+)\]:\s*(.+)$/gm;
    let match;
    while ((match = regex.exec(raw)) !== null) {
      footnotes[match[1]] = match[2];
    }

    // Replace [^id] references with links containing the footnote text
    const replaceRef = (match, id) => {
      const text = footnotes[id] || '';
      return `<sup><a href="#fn-${id}" id="fnref-${id}" class="footnote-ref" data-footnote-ref data-footnote-text="${encodeURIComponent(text)}">${id}</a></sup>`;
    };

    // In regular text
    visit(tree, 'text', (node) => {
      node.value = node.value.replace(/\[\^(\w+)\]/g, replaceRef);
    });

    // In HTML element text
    visit(tree, 'element', (node) => {
      if (node.children) {
        for (const child of node.children) {
          if (child.type === 'text' && child.value.includes('[^')) {
            child.value = child.value.replace(/\[\^(\w+)\]/g, replaceRef);
          }
        }
      }
    });

    // In raw HTML
    visit(tree, 'html', (node) => {
      if (node.value?.includes('[^')) {
        node.value = node.value.replace(/\[\^(\w+)\]/g, replaceRef);
      }
    });
  };
}

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