import { LocalStorageInterface } from './LocalStorageInterface.js';

export class SettingsPanel {

    constructor() {

        // TODO: move settings panel creation to this constructor

        this._earningMethodSelector = document.getElementById('earning_method');
        this._earningMethodSelector.addEventListener('change', () => this.handleEarningMethodChange());

        // load values from local storage
        this._localStorage = new LocalStorageInterface();
        this._earningMethodSelector.value = this._localStorage.get('earning_method') ?? 'Salary';
        this.handleEarningMethodChange();
        


    }

    get earningMethod() {
        return document.getElementById('earning_method').value;
    }

    get yearlySalary() {
        return document.getElementById('yearly_salary').value;
    }

    get hoursPerWeek() {
        return document.getElementById('hours_per_week').value;
    }

    get hourlyWage() {
        return document.getElementById('hourly_wage').value;
    }

    get hourlyRate() {

        switch (this.earningMethod) {

            case 'Salary':
            
                return this.yearlySalary / 52 / this.hoursPerWeek;

            case 'Hourly':

                return this.hourlyWage;

            default:

                console.error('Invalid earning method');

        }

    }

    /**
     * Shows/hides relevant/irrelevant fields when a different earning method is selected in the dropdown. 
     */
    handleEarningMethodChange() {
    
        const earning_method = this.earningMethod;

        // get all the fields whose data-select-id attribute contains the id of the referenced select element
        const impacted_fields = document.querySelectorAll(`[data-select-id="earning_method"]`);
        
        // from impacted fields filter into this variable any that match the newly selected earning method
        const fields_to_show = [...impacted_fields].filter(field => { return field.matches(`[data-select-option="${earning_method}"]`); });
        
        // from impacted fields filter into this variable any fields that weren't selected to be shown
        const fields_to_hide = [...impacted_fields].filter(field => !fields_to_show.includes(field));
        
        fields_to_show.forEach(field => field.classList.remove('is-hidden'));
        fields_to_hide.forEach(field => field.classList.add('is-hidden'));

        // save the selected earning method to local storage
        this._localStorage.set('earning_method', earning_method);
    
    }

}