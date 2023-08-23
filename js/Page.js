import { OutputPanel } from "/js/OutputPanel.js";
import { TimeTracker } from "/js/TimeTracker.js";
import { SettingsPanel } from "/js/SettingsPanel.js";

export class Page {

    constructor() {

        this._timeTracker = new TimeTracker();
        this._settingsPanel = new SettingsPanel();
        this._outputPanel = new OutputPanel(this._timeTracker, this._settingsPanel);

    }

}
