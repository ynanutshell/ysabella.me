# Personal Website of Ysabella Nicole Alvarez

This is the source code for [ysabella.me](https://www.ysabella.me), a personal website and digital garden featuring the work and writing of Ysabella Nicole Alvarez, a product designer, aspiring technologist, and middling web developer.

Built from scratch on [Astro](https://github.com/withastro/astro).

## Project Structure

```
portfolio/
├── public/
├── src/
│ ├── components/
│ ├── layouts/
│ ├── pages/
│ │ ├── index.astro → /
│ │ ├── about.astro → /about
│ │ ├── garden.astro → /garden
│ │ ├── writing/
│ │ │ ├── index.astro → /writing
│ │ │ └── [slug].astro → /writing/:slug
│ │ ├── tags/
│ │ │ └── [filter].astro → /tags/:filter
│ │ ├── bookmarks.astro → /bookmarks
│ │ ├── work/
│ │ ├── [slug].astro
│ ├── sections/
│ ├── content/
│ │ └── garden/
│ ├── styles/
│ ├── remark/
│ └── utils/
├── astro.config.ts
├── content.config.ts
├── package.json
├── tsconfig.json
└── README.md
```