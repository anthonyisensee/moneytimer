import { TimePeriod } from "./TimePeriod.js";
import { LocalStorageInterface } from "./LocalStorageInterface.js";

export class TimeTracker {

    currentlyTrackedTimePeriod = undefined;
    timePeriods = [];

    constructor() {

        // Load any previously tracked time periods in from local storage
        this._storageInterface = new LocalStorageInterface();

        // Locally stored time periods lose their class. Thus, we must recast them to TimePeriod objects.
        const stored_data = this._storageInterface.get('time_periods') ?? [];
        const stored_time_periods = [];
        stored_data.forEach(stored_object => {
            stored_time_periods.push(new TimePeriod(stored_object._startTime, stored_object._endTime, stored_object._totalTime));
        });
        this.timePeriods = stored_time_periods;

        // Get references to buttons
        this._startButton = document.getElementById('start_button');
        this._pauseButton = document.getElementById('pause_button');
        this._resetAllButton = document.getElementById('reset_button');

        // Add event listeners to buttons
        this._startButton.addEventListener('click', () => this.start());
        this._pauseButton.addEventListener('click', () => this.pause());
        this._resetAllButton.addEventListener('click', () => this.reset());

    }

    get totalTrackedTime() {

        let total_time_ms = 0;
        this.timePeriods.forEach(timePeriod => {
            total_time_ms += timePeriod.totalTime;
        });

        // Include the time from the currently tracked time period if it exists.
        if (this.currentlyTrackedTimePeriod !== undefined) {
            
            const currently_tracked_period = this.currentlyTrackedTimePeriod;
            currently_tracked_period.endTime = Date.now();
            total_time_ms += currently_tracked_period.totalTime;

        }

        return total_time_ms;

    }

    start() {

        // Handle button states
        this._startButton.setAttribute('disabled', true);
        this._pauseButton.removeAttribute('disabled');

        // Keep track of the current time period
        this.currentlyTrackedTimePeriod = new TimePeriod();
        this.currentlyTrackedTimePeriod.startTime = Date.now();

        // Update time periods in local storage
        this.updateLocalStorageTimePeriods();

    }

    pause() {

        // Handle button states
        this._pauseButton.setAttribute('disabled', true);
        this._startButton.removeAttribute('disabled');

        // Add an end time to the currently tracked time period, store it, and remove it from currently tracked
        this.currentlyTrackedTimePeriod.endTime = Date.now();
        this.timePeriods.push(this.currentlyTrackedTimePeriod);
        this.currentlyTrackedTimePeriod = undefined;

        // Update time periods in local storage
        this.updateLocalStorageTimePeriods();

    }

    reset() {

        // Handle button states
        this._pauseButton.setAttribute('disabled', true);
        this._startButton.removeAttribute('disabled');

        // Reset the currently tracked time period
        this.currentlyTrackedTimePeriod = undefined;

        // Reset all tracked time periods
        this.timePeriods = [];

        // Stop the ui update ticker
        clearInterval(this._ticker);

        // Update time periods in local storage
        this.updateLocalStorageTimePeriods();
        
    }

    updateLocalStorageTimePeriods() {
        this._storageInterface.add('time_periods', this.timePeriods);
    }

}
