import { TimePeriod } from "./TimePeriod.js";

export class TimeTracker {

    timePeriods = [];
    currentlyTrackedTimePeriod = undefined;

    constructor() {

        // get references to buttons
        this._startButton = document.getElementById('start_button');
        this._pauseButton = document.getElementById('pause_button');
        this._resetButton = document.getElementById('reset_button');

        // add event listeners to buttons
        this._startButton.addEventListener('click', () => this.start());
        this._pauseButton.addEventListener('click', () => this.pause());
        this._resetButton.addEventListener('click', () => this.reset());

    }

    get totalTrackedTime() {

        let total_time = 0;
        this.timePeriods.forEach(timePeriod => {
            total_time += timePeriod.totalTime;
        });

        // include the time from the currently tracked time period if it exists
        if (this.currentlyTrackedTimePeriod !== undefined) {
            let currently_tracked_period = this.currentlyTrackedTimePeriod;
            currently_tracked_period.endTime = Date.now();
            total_time += currently_tracked_period.totalTime;
        }

        return total_time;

    }

    start() {

        console.log("start button clicked");

        // handle button states
        this._startButton.setAttribute('disabled', true);
        this._pauseButton.removeAttribute('disabled');

        // keep track of the current time period
        this.currentlyTrackedTimePeriod = new TimePeriod();
        this.currentlyTrackedTimePeriod.startTime = Date.now();

    }

    pause() {

        console.log("pause button clicked");

        // handle button states
        this._pauseButton.setAttribute('disabled', true);
        this._startButton.removeAttribute('disabled');

        // add an end time to the currently tracked time period, store it, and remove it from currently tracked
        this.currentlyTrackedTimePeriod.endTime = Date.now();
        this.timePeriods.push(this.currentlyTrackedTimePeriod);
        this.currentlyTrackedTimePeriod = undefined;

        console.log(this.timePeriods);

    }

    reset() {

        console.log("reset button clicked");

        // handle button states
        this._pauseButton.setAttribute('disabled', true);
        this._startButton.removeAttribute('disabled');

        // reset the currently tracked time period
        this.currentlyTrackedTimePeriod = undefined;

        // stop the ui update ticker
        clearInterval(this._ticker);

    }

}
