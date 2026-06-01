import { defineConfig } from 'astro/config';
import remarkSectionize from 'remark-sectionize';
import remarkSmartypants from 'remark-smartypants';
import rehypeExternalLinks from 'rehype-external-links';
import remarkReferenceLinks from 'remark-reference-links';
import { rehypeObsidian } from './src/rehype/obsidian.mjs';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkCodeTitles from 'remark-code-titles';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ysabella.me',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      ['remark-wiki-link', {
        hrefTemplate: (permalink) => '/writing/' + permalink.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-'),
        aliasDivider: '|',
      }],
      remarkSmartypants,
      remarkReferenceLinks,
      remarkCodeTitles,
      remarkSectionize,
      'remark-callout',
    ],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      [rehypePrettyCode, { 
        theme: {
          light: 'night-owl-light',
          dark: 'night-owl',
        },
        keepBackground: false,
      }],
      rehypeObsidian,
    ]
  },
});