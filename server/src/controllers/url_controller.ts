import Axios from 'axios';
import cheerio from 'cheerio';
import ErrorHandler from '../errors/error_handler';

export const FetchData = async (req: any, res: any) => {
    try {
        const response = await Axios.get(req.body.url);
        const data = response.data;
        const cio = cheerio.load(data);
        let favicon = cio('link[rel="icon"]').attr('href') || cio('link[rel="shortcut icon"]').attr('href');
        if (favicon?.charAt(0) == '/') {
            favicon = req.body.url + favicon;
        }
        const title = cio('title').text();

        res.status(200).json({favicon, title});
    } catch (err) {
        ErrorHandler(err, req, res, null);
    }
}