export class TimePeriod {

    _startTime = undefined;
    _endTime = undefined;
    _totalTime = undefined;

    get startTime() {
        return this._startTime;
    }

    set startTime(value) {
        this._startTime = value;
        this.calculateTotalTime();
    }

    get endTime() {
        return this._endTime;
    }

    set endTime(value) {
        this._endTime = value;
        this.calculateTotalTime();
    }

    get totalTime() {
        return this._totalTime;
    }

    calculateTotalTime() {
        this._totalTime = this._endTime - this._startTime;
    }

}
