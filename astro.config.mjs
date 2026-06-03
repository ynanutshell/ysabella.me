import { defineConfig } from 'astro/config';
import remarkCallout from 'remark-callout';
import remarkCodeTitles from 'remark-code-titles';
import remarkReferenceLinks from 'remark-reference-links';
import remarkSectionize from 'remark-sectionize';
import remarkSmartypants from 'remark-smartypants';
import { remarkFootnotes, stripUserContent } from './src/remark/footnotes.mjs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import { headingAnchors, wrapListItems, obsidianHighlights, addMissingFootnotes, replaceFootnoteIcons } from './src/rehype/obsidian.mjs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ysabella.me',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    footnotes: false,
    syntaxHighlight: false,
    remarkPlugins: [
      remarkFootnotes,
      ['remark-wiki-link', {
        hrefTemplate: (permalink) => '/writing/' + permalink.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-'),
        aliasDivider: '|',
       }],
      remarkCallout,
      remarkCodeTitles,
      // remarkReferenceLinks,
      remarkSectionize,
      remarkSmartypants,
    ],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      [rehypePrettyCode, { 
        theme: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
        keepBackground: false,
      }],
      headingAnchors,
      obsidianHighlights,
      addMissingFootnotes,
      replaceFootnoteIcons,
      stripUserContent,
    ]
  },
});