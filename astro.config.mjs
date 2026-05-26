import { defineConfig } from 'astro/config';
import { rehypeObsidian } from './src/rehype/obsidian.mjs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ysabella.me',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'night-owl-light', },
    remarkPlugins: [
      () => (tree, file) => {
        file.data.wikilinks = file.data.wikilinks || {};
      },
      ['remark-wiki-link', {
        hrefTemplate: (permalink) => '/writing/' + permalink.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-'),
          aliasDivider: '|',
          wikiLinkClassName: 'wiki-link',
          newClassName: 'new-wiki-link',
          permalinks: [],
          pageResolver: (name) => [name],
      }],
      'remark-callout',
    ],
    rehypePlugins: [rehypeObsidian],
  },
});