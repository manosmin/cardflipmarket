import cron from 'node-cron';
import processOracleCards from './fetch.js';

const runScheduledTask = async () => {
    // run the processOracleCards once initially
    processOracleCards();

    // schedule processOracleCards to run at 9:10 and 21:10 UTC every day
    cron.schedule('10 0,12 * * *', () => {
        console.log('Running scheduled task: processOracleCards');
        processOracleCards();
    });
}

export default runScheduledTask