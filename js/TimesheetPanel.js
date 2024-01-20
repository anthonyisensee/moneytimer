import { TimeEntry } from "./TimeEntry.js";

export class TimesheetPanel {

    constructor() {

        this._timesheetPanel = document.getElementById('timesheet_panel')
        this._timePeriodContainer = document.getElementById('time_period_cntr')
        this._newTimeEntryButton = document.getElementById('add_time_period_button')

        this._newTimeEntryButton.addEventListener('click', () => this.createNewTimeEntry())
        
        this.timePeriods = []

 
    }

    createNewTimeEntry() {

        const timeEntry = new TimeEntry({})

        this._timePeriodContainer.appendChild(timeEntry.node)

    }

}