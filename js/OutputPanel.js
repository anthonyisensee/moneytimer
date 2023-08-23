export class OutputPanel {
    
    constructor(timeTracker, settingsPanel) {

        this._totalTimeElement = document.getElementById('total_time');
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
        
        this._totalTimeElement.innerHTML = Math.floor(this._timeTracker.totalTrackedTime / 1000);

    }

    updateTotalMoney(totalMoney) {
        
        const total_time = this._timeTracker.totalTrackedTime;
        const time_in_hours = total_time / 1000 / 60 / 60;
        const money_made_in_time = time_in_hours * this._settingsPanel.hourlyRate;

        this._totalMoneyElement.innerHTML = money_made_in_time.toFixed(2);

    }
}
