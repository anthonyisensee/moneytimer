import { OutputPanel } from "./OutputPanel.js";
import { TimeTracker } from "./TimeTracker.js";
import { SettingsPanel } from "./SettingsPanel.js";

export class Page {

    constructor() {

        this._timeTracker = new TimeTracker();
        this._settingsPanel = new SettingsPanel();
        this._outputPanel = new OutputPanel(this._timeTracker, this._settingsPanel);

    }

}
