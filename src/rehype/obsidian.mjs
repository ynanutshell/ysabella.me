import { visit } from 'unist-util-visit';

export function rehypeObsidian() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (!node.value) return;
      // Comments
      node.value = node.value.replace(/%%.+?%%/g, '');
      // Highlights
      node.value = node.value.replace(/==(.+?)==/g, '<mark>$1</mark>');
    });
    // Convert raw mark strings to actual elements
    visit(tree, 'text', (node, index, parent) => {
      if (node.value?.includes('<mark>')) {
        node.type = 'raw';
      }
    });
    visit(tree, 'element', (node) => {
      if (node.properties?.className === 'data-footnote-backref' ||
          (Array.isArray(node.properties?.className) && node.properties?.className.includes('data-footnote-backref'))) {
        node.children = [{
          type: 'raw',
          value: 
            `<svg width="10" height="9" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.707153 3.5H6.70715V0M3.20715 6L0.707153 3.5L3.20715 1" stroke="currentColor"/>
            </svg>`
        }];
      }
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;
        if (!href.includes('ysabella.me')) {
          node.properties.target = '_blank';
          node.properties.rel = 'noopener noreferrer';
        }
      }
      if (node.tagName === 'li' && node.children.length > 0) {
        console.log('wrapping li');
        node.children = [{
          type: 'element',
          tagName: 'div',
          properties: {},
          children: node.children,
        }];
      }
    });
  };
}