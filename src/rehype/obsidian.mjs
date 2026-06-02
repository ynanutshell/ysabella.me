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

export function wrapListItems() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'li' && node.children.length > 0) {
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

export function addMissingFootnotes() {
  return (tree) => {
    // This runs AFTER Astro builds the footnotes section
    visit(tree, 'element', (node) => {
      if (node.properties?.className === 'data-footnote-backref' ||
          (Array.isArray(node.properties?.className) && node.properties?.className.includes('data-footnote-backref'))) {
        node.children = [{
          type: 'raw',
          value: `<svg class="footnote-icon" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.707153 3.5H6.70715V0M3.20715 6L0.707153 3.5L3.20715 1" stroke="currentColor"/>
          </svg>`
        }];
      }
      
      if (node.tagName === 'section' && node.properties?.dataFootnotes !== undefined) {
        const ol = node.children.find(n => n.tagName === 'ol');
        if (ol && !ol.children.some(li => li.properties?.id === 'fn-4')) {
          ol.children.push({
            type: 'element',
            tagName: 'li',
            properties: { id: 'fn-4' },
            children: [{
              type: 'element', tagName: 'div',
              children: [{
                type: 'element', tagName: 'p',
                children: [
                  { type: 'raw', value: 'An idea borrowed from Luke Mitchell.' },
                  { type: 'raw', value: ' <a href="#fnref-4" class="data-footnote-backref" data-footnote-backref="" aria-label="Back to reference 4"><svg class="footnote-icon" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.707153 3.5H6.70715V0M3.20715 6L0.707153 3.5L3.20715 1" stroke="currentColor"/></svg></a>' },
                ],
              }],
            }],
          });
        }
      }
    });
  };
}