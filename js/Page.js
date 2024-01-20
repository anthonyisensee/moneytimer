import { TimesheetPanel } from "./TimesheetPanel.js";
import { TimeTracker } from "./TimeTracker.js";
import { SettingsPanel } from "./SettingsPanel.js";
import { OutputPanel } from "./OutputPanel.js";

export class Page {

    constructor() {

        this._timesheetPanel = new TimesheetPanel();
        this._timeTracker = new TimeTracker();
        this._settingsPanel = new SettingsPanel();
        this._outputPanel = new OutputPanel(this._timeTracker, this._settingsPanel);

    }

}
