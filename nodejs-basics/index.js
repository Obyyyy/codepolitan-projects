const notifier = require('node-notifier');
const moment = require('moment');
const argTime = process.argv.slice(2);

const POMORODO_DURATION = argTime[0] || 25;
const BREAK_DURATION = argTime[1] || 5;

let isWorking = false;
let remainingTime = 0;

function formatingTime(totalSeconds) {
    const duration = moment.duration(totalSeconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function startTimer(duration) {
    isWorking = !isWorking;
    remainingTime = duration * 60;

    const timer = setInterval(() => {
        remainingTime--;

        const formatedTime = formatingTime(remainingTime);
        console.log(`${isWorking ? 'Work' : 'Break'}: ${formatedTime}`);

        if (remainingTime === 0) {
            clearInterval(timer);
            notifier.notify({
                title: isWorking ? 'Break Time!' : 'Working Time!',
                message: isWorking ? 'Good Work!' : 'Lets Work again!',
                sound: true,
                wait: true
            });
            startTimer(isWorking ? BREAK_DURATION : POMORODO_DURATION);
        }
    }, 1000);
}

startTimer(POMORODO_DURATION);