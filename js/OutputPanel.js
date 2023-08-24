export class OutputPanel {
    
    constructor(timeTracker, settingsPanel) {

        this._totalTimeElement = document.getElementById('total_time');
        this._totalTimeHoursElement = document.getElementById('total_time_hours');
        this._totalTimeMinutesElement = document.getElementById('total_time_minutes');
        this._totalTimeSecondsElement = document.getElementById('total_time_seconds');
        this._totalMoneyElement = document.getElementById('total_money');
        this._timeTracker = timeTracker;
        this._settingsPanel = settingsPanel;
        this._totalTime = undefined;
        this._totalMoney = undefined;
        this._tickerInterval = 100;  // in milliseconds
        
        this._ticker = setInterval(() => {
            this.updateTotalTime();
            this.updateTotalMoney();
        }, this._tickerInterval);

    }

    updateTotalTime(totalTime) {
        
        const total_time_ms = this._timeTracker.totalTrackedTime;
        const total_time_seconds = total_time_ms / 1000;
        const total_time_minutes = total_time_seconds / 60;
        const total_time_hours = total_time_minutes / 60;

        this._totalTimeHoursElement.innerHTML = Math.floor(total_time_hours);
        this._totalTimeMinutesElement.innerHTML = Math.floor(total_time_minutes % 60);
        this._totalTimeSecondsElement.innerHTML = Math.floor(total_time_seconds % 60);

    }

    updateTotalMoney(totalMoney) {
        
        const total_time = this._timeTracker.totalTrackedTime;
        const time_in_hours = total_time / 1000 / 60 / 60;
        const money_made_in_time = time_in_hours * this._settingsPanel.hourlyRate;

        this._totalMoneyElement.innerHTML = money_made_in_time.toFixed(2);

    }
}
