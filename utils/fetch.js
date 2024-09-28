import fs from 'fs';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
import { updateOrInsertCards, updateOrInsertPrices } from './upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_DIR = path.join(__dirname, '../json');
const DOWNLOAD_HISTORY_FILE = path.join(JSON_DIR, 'downloaded_files.txt');

const processOracleCards = async () => {
    try {
        console.log(`Fetching new data from Scryfall API at ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC`)

        const bulkDataResponse = await axios.get('https://api.scryfall.com/bulk-data');
        const bulkData = bulkDataResponse.data.data;

        const oracleCardsData = bulkData.find(item => item.type === 'default_cards');

        if (!oracleCardsData) {
            console.error('Oracle Cards data not found in the API response');
            return;
        }

        const { download_uri, updated_at } = oracleCardsData;

        const updatedAtDate = new Date(updated_at);
        const updatedHourUTC = updatedAtDate.getUTCHours();

        if (updatedHourUTC < 21 || updatedHourUTC >= 22) {
            console.error(`File update time: ${updatedAtDate.toLocaleString("en-US", { timeZone: "UTC" })}. Skipping processing.`);
            return;
        }

        const jsonFileName = path.basename(download_uri);
        const jsonFilePath = path.join(JSON_DIR, jsonFileName);

        if (!fs.existsSync(JSON_DIR)) {
            fs.mkdirSync(JSON_DIR, { recursive: true });
        }

        let downloadedFiles = [];
        if (fs.existsSync(DOWNLOAD_HISTORY_FILE)) {
            downloadedFiles = fs.readFileSync(DOWNLOAD_HISTORY_FILE, 'utf8').split('\n').filter(Boolean);
        }

        if (downloadedFiles.includes(jsonFileName)) {
            console.log(`File ${jsonFileName} has already been processed. Skipping download.`);
            return;
        }

        console.log(`Downloading new JSON file from ${download_uri}`);
        const jsonResponse = await axios.get(download_uri, { responseType: 'stream' });

        const writer = fs.createWriteStream(jsonFilePath);
        jsonResponse.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`JSON file saved to ${jsonFilePath}`);

        const fileData = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(fileData).filter(item => item.mtgo_id);

        await updateOrInsertCards(jsonData);
        await updateOrInsertPrices(jsonData, updated_at);
        console.log(`New data inserted at ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC`);

        fs.unlinkSync(jsonFilePath);
        console.log(`JSON file ${jsonFileName} deleted after processing.`);

        fs.appendFileSync(DOWNLOAD_HISTORY_FILE, jsonFileName + '\n');

    } catch (error) {
        console.error('Error processing Oracle Cards:', error);
    }
};

export default processOracleCards;
