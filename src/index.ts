import axios from 'axios';
import * as cheerio from 'cheerio';

async function extractSpotifyLinks(url: string): Promise<string[]> {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const links: string[] = [];

        $('a').each((_, element) => {
            const href = $(element).attr('href');
            if (href && href.includes('spotify.com')) {
                links.push(href);
            }
        });

        return links;
    } catch (error) {
        console.error('Error fetching the webpage:', error);
        return [];
    }
}

// Example usage:
const url = 'https://www.abc.net.au/listen/programs/the-j-files/gillian-welch-dave-rawlings-soul-journey-time-the-revelator/14049450';
extractSpotifyLinks(url).then((links) => {
    console.log('Spotify links found:', links);
});