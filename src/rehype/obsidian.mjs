import { visit } from 'unist-util-visit';

export function headingAnchors() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const text = node.children
          .filter(c => c.type === 'text' || c.type === 'raw')
          .map(c => c.value || '')
          .join('');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        node.properties = { ...node.properties, id };
        node.children.push({
          type: 'element',
          tagName: 'a',
          properties: { href: `#${id}`, class: 'anchor' },
          children: [{ type: 'text', value: '#' }],
        });
      }
    });
  };
}

export function obsidianHighlights() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (!node.value) return;
      node.value = node.value.replace(/%%.+?%%/g, '');
      node.value = node.value.replace(/==(.+?)==/g, '<mark>$1</mark>');
    });
    visit(tree, 'text', (node) => {
      if (node.value?.includes('<mark>')) {
        node.type = 'raw';
      }
    });
  };
}

export function addMissingFootnotes() {
  return (tree) => {
    const footnoteMap = {};

    // Parse raw HTML nodes for footnote references
    visit(tree, 'raw', (node) => {
      if (node.value?.includes('fnref-')) {
        const matches = node.value.matchAll(/<a[^>]*href="#fn-(\w+)"[^>]*data-footnote-text="([^"]*)"[^>]*>/g);
        for (const match of matches) {
          footnoteMap[match[1]] = decodeURIComponent(match[2]);
        }
      }
    });

    visit(tree, 'element', (node) => {
      if (node.tagName === 'section' && node.properties?.dataFootnotes !== undefined) {
        const ol = node.children.find(n => n.tagName === 'ol');
        if (ol) {
          for (const [id, text] of Object.entries(footnoteMap)) {
            if (!ol.children.some(li => li.properties?.id === `fn-${id}`) && text) {
              const html = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
              ol.children.push({
                type: 'element',
                tagName: 'li',
                properties: { id: `fn-${id}` },
                children: [{
                  type: 'element', tagName: 'p',
                  children: [
                    { type: 'raw', value: html },
                    { type: 'raw', value: ` <a href="#fnref-${id}" class="data-footnote-backref" data-footnote-backref aria-label="Back to reference ${id}"><svg viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.707153 3.5H6.70715V0M3.20715 6L0.707153 3.5L3.20715 1" stroke="currentColor"/>
          </svg></a>` },
                  ],
                }],
              });
            }
          }
        }
      }
    });
  };
}

export function replaceFootnoteIcons() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.properties?.className === 'data-footnote-backref' ||
        (Array.isArray(node.properties?.className) && node.properties?.className.includes('data-footnote-backref'))) {
        node.children = [{
          type: 'raw',
          value: `<svg viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.707153 3.5H6.70715V0M3.20715 6L0.707153 3.5L3.20715 1" stroke="currentColor"/>
          </svg>`
        }];
      }
    });
  };
}