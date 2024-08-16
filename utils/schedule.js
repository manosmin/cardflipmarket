import cron from 'node-cron';
import processOracleCards from './fetch.js';

const runScheduledTask = async () => {
    // run the processOracleCards once initially
    processOracleCards();

    // schedule processOracleCards to run at 00:30 UTC every day
    cron.schedule('30 0 * * *', () => {
        console.log('Running scheduled task: processOracleCards');
        processOracleCards();
    });
}

export default runScheduledTask