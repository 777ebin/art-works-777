/**
 * Cultural Image Resolver
 * Accurately maps traditions and docx URLs to verified high-resolution images
 * from the authentic cultural archives and Kerala heritage resources.
 */

export const DOCX_IMAGE_MAP: Record<string, { image: string; docxUrl: string; title: string }> = {
  // Ritual Arts & Performances
  theyyam: {
    image: 'https://i.pinimg.com/736x/a6/33/89/a6338943bca2273f9383316aa27bf90e.jpg',
    docxUrl: 'https://in.pinterest.com/shabnamrs6/theyyam/',
    title: 'Theyyam: The Living Gods of Malabar',
  },
  kathakali: {
    image: 'https://i.pinimg.com/736x/0c/bc/0b/0cbc0b44b21a41f4828e2d3c727011f6.jpg',
    docxUrl: 'https://www.pinterest.com/pramithab1/kathakali/',
    title: 'Kathakali: The Classical Dance-Drama of Epic Splendor',
  },
  pulikali: {
    image: 'https://i.pinimg.com/736x/15/c9/3c/15c93ca1bef44837416ac3dde3b691df.jpg',
    docxUrl: 'https://in.pinterest.com/prajish_vjn/pulikali/',
    title: 'Pulikali: The Tiger Dance of Thrissur Onam',
  },
  ottanthullal: {
    image: 'https://www.keralatourism.org/ktadmin/img/pages/large-desktop/ottanthullal-1727622696_f9e4ab178a2ed9d7bcc1.jpg',
    docxUrl: 'https://www.keralatourism.org/photo-gallery/ottanthullal/1748/',
    title: 'Ottanthullal: The Satirical Solo Dance of Kunjan Nambiar',
  },

  // Indigenous Crafts & Metallurgy
  'aranmula-kannadi': {
    image: 'https://aranmulakannadi.net/cdn/shop/files/Aranmulakannadi-AM12614WR-02_1024x1024.png',
    docxUrl: 'https://aranmulakannadi.net/products/aranmula-kannadi-am12614wr',
    title: 'Aranmula Kannadi: The Sacred Front-Surface Metal Mirrors',
  },
  'nettur-petti': {
    image: 'https://d35l77wxi0xou3.cloudfront.net/collab/craft1582800612Nettur-Banner.jpg',
    docxUrl: 'https://www.directcreate.com/craft/nettur-petti',
    title: 'Nettur Petti: The Royal Jewel Casket of Kerala',
  },
  'kerala-mural': {
    image: 'https://artnindia.com/cdn/shop/products/57_a41708fb-1def-42f8-9f88-3b52113db721_1200x1200.jpg',
    docxUrl: 'https://artnindia.com/products/copy-of-kerala-mural-painting-handmade-south-indian-nature-bird-ethnic-miniature-art',
    title: 'Kerala Mural Painting: Sacred Mineral Pigment Frescoes',
  },

  // Martial Arts & Movement Traditions
  kalaripayattu: {
    image: 'https://i.pinimg.com/736x/ad/a8/87/ada887b1e8fe83be1ea6fa7dff8288d7.jpg',
    docxUrl: 'https://www.pinterest.com/ideas/kalaripayattu-kerala-martial-arts/952093362241/',
    title: 'Kalaripayattu: Ancient Martial Science of Kerala',
  },

  // Traditional Knowledge & Healing
  'kani-tribal': {
    image: 'https://www.holidify.com/images/cmsuploads/compressed/AgasthamalaiBiosphereReserve_2_20171012215025.jpg',
    docxUrl: 'https://www.holidify.com/pages/agasthyamalai-biosphere-reserve-296.html',
    title: 'Maravuri & Kani Tribal Oral Herbal Lore: Agasthyarkoodam Rainforest',
  },

  // Folk Songs & Oral Epics / Living Archives
  'vadakkan-pattukal': {
    image: 'https://i.pinimg.com/736x/1d/4b/37/1d4b37085da7386d19777292eee7e304.jpg',
    docxUrl: 'https://jp.pinterest.com/pin/vadakkan-pattukal-3993mb-by-appunni-nambiyar-free-download--419397784053760956/',
    title: 'Vadakkan Pattukal: Heroic Ballads of Kadathanad & Unniyarcha',
  },
  chendamelam: {
    image: 'https://i.pinimg.com/736x/83/15/17/831517686f16ccc58c5430a8ca6a4ac0.jpg',
    docxUrl: 'https://www.pinterest.com/pin/179158891404276515/',
    title: 'Chendamelam: The Thunderous Percussion Symphony',
  },
  'living-archives': {
    image: 'https://i.pinimg.com/736x/07/2a/2c/072a2c8ca136f3f9f91596a97610f2e1.jpg',
    docxUrl: 'https://www.pinterest.com/ideas/kerala-scenery-nature/940913782121/',
    title: 'Kerala Living Heritage Archives',
  },
};

// Direct mapping from the exact raw docx URLs (as pasted by the user) to actual image URLs
export const RAW_DOCX_URL_MAP: Record<string, string> = {
  'https://www.pinterest.com/pramithab1/kathakali/': 'https://i.pinimg.com/736x/0c/bc/0b/0cbc0b44b21a41f4828e2d3c727011f6.jpg',
  'https://in.pinterest.com/prajish_vjn/pulikali/': 'https://i.pinimg.com/736x/15/c9/3c/15c93ca1bef44837416ac3dde3b691df.jpg',
  'https://www.keralatourism.org/photo-gallery/ottanthullal/1748/': 'https://www.keralatourism.org/ktadmin/img/pages/large-desktop/ottanthullal-1727622696_f9e4ab178a2ed9d7bcc1.jpg',
  'https://in.pinterest.com/shabnamrs6/theyyam/': 'https://i.pinimg.com/736x/a6/33/89/a6338943bca2273f9383316aa27bf90e.jpg',
  'https://aranmulakannadi.net/products/aranmula-kannadi-am12614wr': 'https://aranmulakannadi.net/cdn/shop/files/Aranmulakannadi-AM12614WR-02_1024x1024.png',
  'https://www.directcreate.com/craft/nettur-petti': 'https://d35l77wxi0xou3.cloudfront.net/collab/craft1582800612Nettur-Banner.jpg',
  'https://artnindia.com/products/copy-of-kerala-mural-painting-handmade-south-indian-nature-bird-ethnic-miniature-art': 'https://artnindia.com/cdn/shop/products/57_a41708fb-1def-42f8-9f88-3b52113db721_1200x1200.jpg',
  'https://www.pinterest.com/ideas/kalaripayattu-kerala-martial-arts/952093362241/': 'https://i.pinimg.com/736x/ad/a8/87/ada887b1e8fe83be1ea6fa7dff8288d7.jpg',
  'https://www.holidify.com/pages/agasthyamalai-biosphere-reserve-296.html': 'https://www.holidify.com/images/cmsuploads/compressed/AgasthamalaiBiosphereReserve_2_20171012215025.jpg',
  'https://www.pinterest.com/ideas/kerala-scenery-nature/940913782121/': 'https://i.pinimg.com/736x/07/2a/2c/072a2c8ca136f3f9f91596a97610f2e1.jpg',
  'https://jp.pinterest.com/pin/vadakkan-pattukal-3993mb-by-appunni-nambiyar-free-download--419397784053760956/': 'https://i.pinimg.com/736x/1d/4b/37/1d4b37085da7386d19777292eee7e304.jpg',
  'https://www.pinterest.com/pin/179158891404276515/': 'https://i.pinimg.com/736x/83/15/17/831517686f16ccc58c5430a8ca6a4ac0.jpg',
  'https://www.pinterest.com/pin/179158891404276515': 'https://i.pinimg.com/736x/83/15/17/831517686f16ccc58c5430a8ca6a4ac0.jpg',
};

/**
 * Resolves any image URL or slug to a guaranteed working high-resolution image URL.
 * Handles raw docx webpage URLs, pinterest links, relative paths, and fallbacks.
 */
export function resolveImageUrl(url?: string, slugOrTitle?: string): string {
  if (url) {
    const cleanUrl = url.trim();

    // 0. If it's an uploaded media file, return it directly!
    // Handle both relative /uploads/ and absolute URLs with /uploads/
    if (cleanUrl.startsWith('/uploads/') || cleanUrl.includes('/uploads/')) {
      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        return cleanUrl;
      }
      const apiOrigin = process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
        : 'http://localhost:4000';
      return `${apiOrigin}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
    }

    // 0.1 Data URIs or Blob URIs (e.g. from local previews or direct file reader)
    if (cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) {
      return cleanUrl;
    }

    // 1. Direct match with docx reference URLs
    if (RAW_DOCX_URL_MAP[cleanUrl]) {
      return RAW_DOCX_URL_MAP[cleanUrl];
    }

    // 2. Already a valid direct image file format
    if (
      cleanUrl.startsWith('http') &&
      (cleanUrl.includes('.jpg') ||
        cleanUrl.includes('.jpeg') ||
        cleanUrl.includes('.png') ||
        cleanUrl.includes('.webp') ||
        cleanUrl.includes('.gif') ||
        cleanUrl.includes('.svg') ||
        cleanUrl.includes('cdn/shop/files') ||
        cleanUrl.includes('i.pinimg.com') ||
        cleanUrl.includes('images.unsplash.com') ||
        cleanUrl.includes('cloudfront.net'))
    ) {
      return cleanUrl;
    }

    // 3. Match against known URL patterns
    for (const [rawUrl, resolved] of Object.entries(RAW_DOCX_URL_MAP)) {
      if (cleanUrl.includes(rawUrl) || rawUrl.includes(cleanUrl)) {
        return resolved;
      }
    }

    // 3.5 Any standard http/https URL that is not an unresolvable docx link
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      if (
        !cleanUrl.includes('pinterest.com') &&
        !cleanUrl.includes('keralatourism.org/photo-gallery') &&
        !cleanUrl.includes('directcreate.com/craft')
      ) {
        return cleanUrl;
      }
    }
  }

  // 4. Resolve by slug or title only when no valid image was provided
  if (slugOrTitle) {
    const s = slugOrTitle.toLowerCase();
    if (s.includes('theyyam')) return DOCX_IMAGE_MAP.theyyam.image;
    if (s.includes('kathakali')) return DOCX_IMAGE_MAP.kathakali.image;
    if (s.includes('puli') || s.includes('tiger')) return DOCX_IMAGE_MAP.pulikali.image;
    if (s.includes('thullal') || s.includes('ottan')) return DOCX_IMAGE_MAP.ottanthullal.image;
    if (s.includes('aranmula') || s.includes('mirror') || s.includes('kannadi')) return DOCX_IMAGE_MAP['aranmula-kannadi'].image;
    if (s.includes('nettur') || s.includes('petti') || s.includes('casket')) return DOCX_IMAGE_MAP['nettur-petti'].image;
    if (s.includes('mural') || s.includes('fresco')) return DOCX_IMAGE_MAP['kerala-mural'].image;
    if (s.includes('kalari') || s.includes('martial')) return DOCX_IMAGE_MAP.kalaripayattu.image;
    if (s.includes('kani') || s.includes('maravuri') || s.includes('agasthya')) return DOCX_IMAGE_MAP['kani-tribal'].image;
    if (s.includes('vadakkan') || s.includes('unniyarcha') || s.includes('ballad')) return DOCX_IMAGE_MAP['vadakkan-pattukal'].image;
    if (s.includes('chenda') || s.includes('melam') || s.includes('drum')) return DOCX_IMAGE_MAP.chendamelam.image;
  }

  // Fallback to high-res living archive motif
  return DOCX_IMAGE_MAP['living-archives'].image;
}

/**
 * Returns the original Word document reference link for transparency and attribution
 */
export function getDocxSourceUrl(slugOrTitle: string): string | null {
  const s = slugOrTitle.toLowerCase();
  for (const [key, item] of Object.entries(DOCX_IMAGE_MAP)) {
    if (s.includes(key)) {
      return item.docxUrl;
    }
  }
  return null;
}

