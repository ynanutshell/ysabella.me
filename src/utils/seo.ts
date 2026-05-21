interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  canonicalURL?: string;
}

export function getPageMetadata(
  slug: string, 
  overrides: Partial<SEOMetadata> = {}
): SEOMetadata {
  const defaults: Record<string, SEOMetadata> = {
    'work': {
      title: "ysabella nicole alvarez",
      description: "Ysabella is crafting interfaces, developing digital products, and learning to sprinkle a dash of whimsy to intuitive design.",
      ogImage: '/opengraph.png',
    },
    'garden': {
      title: "the digital garden of ysabella",
      description: "A collection of (likely unfinished) notes, thoughts, and explorations Ysabella is slowly tending to over time.",
    },
    'about': {
      title: "a little about ysabella",
      description: "Ysabella is a product designer and aspiring technologist with a deep-rooted interest in digital spaces–from the day she first booted up a computer: from roaming questionable, online worlds at an all-too-young age to carving out her own slice of the internet on BlogSpot, custom MySpace pages, and restyling phpBB themes.",
    },
    'reading': {
      title: "reading — ysabella",
      description: "A collection of stories, comics, and books that Ysabella is currently or has previously been reading.",
    },
  };

  const defaultMeta = defaults[slug] || {
    title: "ysabella nicole alvarez",
    description: "Ysabella is crafting interfaces, developing digital products, and learning to sprinkle a dash of whimsy to intuitive design."
  };

  return {
    ...defaultMeta,
    ogImage: overrides.ogImage || defaultMeta.ogImage || "/opengraph.png",
    canonicalURL: `https://www.ysabella.me/${slug}`,
    ...overrides,
  };
}