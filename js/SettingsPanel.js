import { LocalStorageInterface } from './LocalStorageInterface.js';

export class SettingsPanel {

    constructor() {

        const settings_panel_fields = [
            {
                "id": "earning_method",
                "type": "select",
                "default": "Salary",
                "options": [
                    {
                        "text_content": "Salary",
                        "show_fields": ["yearly_salary", "hours_per_week", "days_pto", "paid_holidays"],
                        "hide_fields": ["hourly_wage"],
                    },
                    {
                        "text_content": "Hourly",
                        "show_fields": ["hourly_wage"],
                        "hide_fields": ["yearly_salary", "hours_per_week", "days_pto", "paid_holidays"],
                    },
                ],
            },
            {
                "id": "yearly_salary",
                "type": "input",
                "default": 59428,
            },
            {
                "id": "hours_per_week",
                "type": "input",
                "default": 40,
            },
            {
                "id": "days_pto",
                "type": "input",
                "default": 0,
            },
            {
                "id": "paid_holidays",
                "type": "input",
                "default": 0,
            },
            {
                "id": "hourly_wage",
                "type": "input",
                "default": 28.57,
            },
            {
                "id": "federal_tax",
                "type": "input",
                "default": 0,
            },
            {
                "id": "state_tax",
                "type": "input",
                "default": 0,
            },
        ];
        
        const input_fields = settings_panel_fields.filter(field => field.type === 'input');
        const select_fields = settings_panel_fields.filter(field => field.type === 'select');

        // A generic function adding an input listener to an input field with a given ID. When the value in the input field is updated the value is saved to local storage with a key corresponding to the field's ID.
        function addInputFieldChangeListener(id) {

            const input_field = document.getElementById(id);
            input_field.addEventListener('input', () => {
                
                // Store the value to local storage
                const localStorageInterface = new LocalStorageInterface();
                localStorageInterface.set(id, input_field.value);
                
            });

        }

        // A generic function adding a change listener to an select field with a given ID.When an option is selected the value associated with the field is saved to local storage with a key corresponding to the field's ID.
        function addSelectFieldChangeListener(id) {
            
            const select_field = document.getElementById(id);
            select_field.addEventListener('change', () => {

                // Store the value to local storage
                const localStorageInterface = new LocalStorageInterface();
                localStorageInterface.set(id, select_field.value);

                // Get the associated fields to show and hide based on the value selected
                const this_field_model = (settings_panel_fields.filter(field => field.id === id))[0];
                const current_option = (
                    this_field_model.options.filter(
                        option => option.text_content === select_field.value
                    )
                )[0];

                // Actually do the showing and hiding of fields
                current_option.hide_fields.forEach(id => {
                    document.getElementById(id).closest('.field').classList.add('is-hidden')
                });
                current_option.show_fields.forEach(id => {
                    document.getElementById(id).closest('.field').classList.remove('is-hidden')
                });

            });

        }
        
        // Add change listeners to all settings panel input fields.
        input_fields.forEach(field => addInputFieldChangeListener(field.id));
        select_fields.forEach(field => addSelectFieldChangeListener(field.id));
        
        // Create an interface to local storage
        const _localStorageInterface = new LocalStorageInterface();
        
        // On page load, if values for fields exist in local storage load them into the HTML of the page. Otherwise, load in defaults specified in the model.
        input_fields.forEach(field => {
            document.getElementById(field.id).value = _localStorageInterface.get(field.id) ?? field.default;
        });

        select_fields.forEach(field => {
            const select_field = document.getElementById(field.id);
            select_field.value = _localStorageInterface.get(field.id) ?? field.default;
            select_field.dispatchEvent(new Event('change'));
        });

    }

    // Get a value in the settings panel by ID.
    getSettingsValueByID(id) {
        return document.getElementById(id).value;
    }

    get hourlyRate() {

        const tax_multiplier = (100 - this.getSettingsValueByID('federal_tax') - this.getSettingsValueByID('state_tax')) / 100;
        
        switch (this.getSettingsValueByID('earning_method')) {
            
            case 'Salary':
                
                const gross_salary = this.getSettingsValueByID('yearly_salary');
                const net_salary = gross_salary * tax_multiplier;
                const days_off = Number(this.getSettingsValueByID('days_pto')) + Number(this.getSettingsValueByID('paid_holidays'));
                const weeks_off = days_off / 5;
                const weeks_worked_per_year = 52 - weeks_off;
                const hours_per_week = this.getSettingsValueByID('hours_per_week');
                
                return net_salary / weeks_worked_per_year / hours_per_week;

            case 'Hourly':

                return this.getSettingsValueByID('hourly_wage') * tax_multiplier;

            default:

                console.error('Invalid earning method selected.');

        }

    }

}
