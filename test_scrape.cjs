const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
  try {
    const { data } = await axios.get('https://jlptsensei.com/jlpt-n3-grammar-list/');
    const $ = cheerio.load(data);
    const grammarPoints = [];
    $('table.jlpt-list-table tbody tr').each((i, el) => {
      if (i > 5) return;
      const point = $(el).find('td.jl-td-g a').text().trim();
      const meaning = $(el).find('td.jl-td-m').text().trim();
      grammarPoints.push({ point, meaning });
    });
    console.log(grammarPoints);
  } catch (e) {
    console.log('Error', e.message);
  }
}
scrape();
