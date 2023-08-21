document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('start_button').addEventListener('click', function() {

        // create a new time period and store it in the globally available variable
        current_time_period = new time_period;
        current_time_period.start_time = Date.now();

    });

    document.getElementById('stop_button').addEventListener('click', function () {

        // update the end time of the current time period and add it to time periods we're tracking
        current_time_period.end_time = Date.now();
        time_periods.push(current_time_period);
        updateTotalTime();

    });

    document.getElementById('reset_button').addEventListener('click', function () {
        time_periods = [];
        current_time_period = new time_period();
    });

    // instantiates a ticker to continuously update times
    const ms_time_interval = 100;
    setInterval(function() {
        updateTotalTime();
        updateTotalMoney();
        console.log("tick");
    }, ms_time_interval);
    
});

class time_period {
    
    constructor(start_time, end_time) {
        this.start_time = start_time;
        this.end_time = end_time;
    }

    get total_time() {
        return this.end_time - this.start_time;
    }
}

// instantiate some default variables
let time_periods = [];
let current_time_period = new time_period();
let total_time_seconds = 0;
let money_made = 0;

function timerIsRunning() {
    const no_start = current_time_period.start_time === undefined;
    const no_end = current_time_period.end_time === undefined;
    return !no_start && no_end;
}

function updateTotalTime() {

    let total_time = 0;

    // get time from each time period already tracked
    time_periods.forEach(function (time_period) {
        total_time += time_period.total_time;
    });

    // also count time that is currently being tracked
    if (timerIsRunning()) {
        total_time += Date.now() - current_time_period.start_time;
    }

    // convert milliseconds to seconds
    total_time_seconds = Math.floor(total_time / 1000);

    // get seconds, minutes, and hours
    const seconds = total_time_seconds % 60;
    const minutes = Math.floor(total_time_seconds / 60) % 60;
    const hours = Math.floor(total_time_seconds / 3600);

    document.getElementById('total_time').innerHTML = `${hours}:${minutes}:${seconds}`;

}

function updateTotalMoney() {

    const yearly_salary = document.getElementById('yearly_salary').value;
    const hours_per_week = document.getElementById('hours_per_week').value;

    money_made = yearly_salary / 52 / hours_per_week / 60 / 60 * total_time_seconds;

    // turn money into a string with two decimal places
    money_made = money_made.toFixed(2);

    document.getElementById('total_money').innerHTML = money_made;
}
