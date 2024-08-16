import cron from 'node-cron';
import processOracleCards from './fetch.js';

const getLocalCronExpression = (targetHourUTC, targetMinuteUTC) => {
    // get the current date/time
    const now = new Date();

    // get the local time zone offset in minutes
    const localOffsetMinutes = now.getTimezoneOffset();

    // calculate the target time in the server's local time zone
    let targetHourLocal = targetHourUTC - localOffsetMinutes / 60;
    let targetMinuteLocal = targetMinuteUTC;

    // adjust for overflow in hours (e.g., negative or greater than 23)
    if (targetHourLocal < 0) {
        targetHourLocal = 24 + targetHourLocal;
    } else if (targetHourLocal >= 24) {
        targetHourLocal = targetHourLocal % 24;
    }

    // return the cron expression for the local time
    return `${targetMinuteLocal} ${targetHourLocal} * * *`;
};

const runScheduledTask = async () => {
    // run processOracleCards once initially
    await processOracleCards();

    // calculate the cron expression based on the local time equivalent of 9:30 AM UTC
    const cronExpression = getLocalCronExpression(9, 30);

    // schedule processOracleCards to run at the calculated local time every day
    cron.schedule(cronExpression, async () => {
        console.log('Running scheduled task: processOracleCards');
        await processOracleCards();
    });

};

export default runScheduledTask;
