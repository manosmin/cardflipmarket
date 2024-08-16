import fs from 'fs';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
import { updateOrInsertCards, updateOrInsertPrices } from './upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DIR = path.join(__dirname, '../json');

// function to fetch and process the JSON file
const processOracleCards = async () => {
    try {
        console.log(`Fetching new data from Scryfall API at ${new Date().toLocaleString("en-US", { timeZone: "UTC" })}`)

        // fetch the bulk data list from the API
        const bulkDataResponse = await axios.get('https://api.scryfall.com/bulk-data');
        const bulkData = bulkDataResponse.data.data;

        // find the oracle_cards object
        const oracleCardsData = bulkData.find(item => item.type === 'oracle_cards');

        if (!oracleCardsData) {
            console.error('Oracle Cards data not found in the API response');
            return;
        }

        const { download_uri, updated_at } = oracleCardsData;

        // determine the file name and path
        const jsonFileName = path.basename(download_uri);
        const jsonFilePath = path.join(JSON_DIR, jsonFileName);

        // check if the file already exists
        if (fs.existsSync(jsonFilePath)) {
            console.log(`File ${jsonFileName} already exists. Skipping download.`);
            return;
        } else {
            // download the JSON file from the download_uri
            console.log(`Downloading new JSON file from ${download_uri}`);
            const jsonResponse = await axios.get(download_uri, { responseType: 'stream' });

            // ensure the JSON directory exists
            if (!fs.existsSync(JSON_DIR)) {
                fs.mkdirSync(JSON_DIR, { recursive: true });
            }

            // save the file to the JSON folder
            const writer = fs.createWriteStream(jsonFilePath);
            jsonResponse.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`JSON file saved to ${jsonFilePath}`);
        }

        // read the JSON file and process the data
        const fileData = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(fileData).filter(item => item.mtgo_id);

        // update or insert data into the collections
        await updateOrInsertCards(jsonData);
        await updateOrInsertPrices(jsonData, updated_at);
        console.log(`New data inserted at ${new Date().toLocaleString("en-US", { timeZone: "UTC" })}`);

    } catch (error) {
        console.error('Error processing Oracle Cards:', error);
    }
};

export default processOracleCards;