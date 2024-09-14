import cron from 'node-cron';
import processOracleCards from './fetch.js';

const getLocalCronExpression = (targetHourUTC, targetMinuteUTC) => {
    const now = new Date();

    const localOffsetMinutes = now.getTimezoneOffset();

    let targetHourLocal = targetHourUTC - localOffsetMinutes / 60;
    let targetMinuteLocal = targetMinuteUTC;

    if (targetHourLocal < 0) {
        targetHourLocal = 24 + targetHourLocal;
    } else if (targetHourLocal >= 24) {
        targetHourLocal = targetHourLocal % 24;
    }

    return `${targetMinuteLocal} ${targetHourLocal} * * *`;
};

const runScheduledTask = async () => {
    await processOracleCards();

    const cronExpression = getLocalCronExpression(9, 30);

    cron.schedule(cronExpression, async () => {
        console.log('Running scheduled task: processOracleCards');
        await processOracleCards();
    });

};

export default runScheduledTask;
