import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const GARDEN_PATH = import.meta.env.GARDEN_PATH || 'src/content/garden';

const gardenCollection = defineCollection({
  loader: glob({ 
    pattern: '{garden,bookmarks}/**/*.md', 
    base: GARDEN_PATH,
  }),
});

export const collections = {
  garden: gardenCollection,
};