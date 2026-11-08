const https = require('https');
const http = require('http');

const items = [
  { name: 'kathakali', url: 'https://www.pinterest.com/pramithab1/kathakali/' },
  { name: 'pulikali', url: 'https://in.pinterest.com/prajish_vjn/pulikali/' },
  { name: 'ottanthullal', url: 'https://www.keralatourism.org/photo-gallery/ottanthullal/1748/' },
  { name: 'theyyam', url: 'https://in.pinterest.com/shabnamrs6/theyyam/' },
  { name: 'aranmula', url: 'https://aranmulakannadi.net/products/aranmula-kannadi-am12614wr' },
  { name: 'mural', url: 'https://artnindia.com/products/copy-of-kerala-mural-painting-handmade-south-indian-nature-bird-ethnic-miniature-art' },
  { name: 'nettur', url: 'https://www.directcreate.com/craft/nettur-petti' },
  { name: 'kalaripayattu', url: 'https://www.pinterest.com/ideas/kalaripayattu-kerala-martial-arts/952093362241/' },
  { name: 'agasthyamalai', url: 'https://www.holidify.com/pages/agasthyamalai-biosphere-reserve-296.html' },
  { name: 'vadakkan', url: 'https://jp.pinterest.com/pin/vadakkan-pattukal-3993mb-by-appunni-nambiyar-free-download--419397784053760956/' },
  { name: 'all_living', url: 'https://www.pinterest.com/ideas/kerala-scenery-nature/940913782121/' },
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const mod = u.protocol === 'https:' ? https : http;
      const req = mod.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        timeout: 8000,
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchHtml(res.headers.location).then(resolve);
        }
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve(data));
      });
      req.on('error', (err) => resolve(`ERR: ${err.message}`));
      req.on('timeout', () => { req.destroy(); resolve('TIMEOUT'); });
    } catch (e) {
      resolve(`ERR: ${e.message}`);
    }
  });
}

async function run() {
  for (const item of items) {
    const html = await fetchHtml(item.url);
    const ogImg = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    
    // Also look for twitter:image or main image
    const twImg = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

    // Look for i.pinimg.com or img src
    const pinMatch = html.match(/(https:\/\/[^"'\s>]*(?:i\.pinimg\.com|images\.keralatourism\.org|cdn\.shopify\.com|directcreate)[^"'\s>]*\.(?:jpg|jpeg|png|webp))/i);

    console.log(`=== ${item.name} (${item.url}) ===`);
    console.log('OG Image:', ogImg ? ogImg[1] : 'None');
    console.log('Twitter Image:', twImg ? twImg[1] : 'None');
    console.log('Other Match:', pinMatch ? pinMatch[1] : 'None');
  }
}

run();

