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
                        "show_fields": ["yearly_salary", "hours_per_week"],
                        "hide_fields": ["hourly_wage"],
                    },
                    {
                        "text_content": "Hourly",
                        "show_fields": ["hourly_wage"],
                        "hide_fields": ["yearly_salary", "hours_per_week"],
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
                "id": "hourly_wage",
                "type": "input",
                "default": 28.57,
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

    // TODO: Refactor getters and setters to be dynamic based on settings_panel_fields
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

                console.error('Invalid earning method selected.');

        }

    }

    getSettingsPanelValueByID(id) {
        return document.getElementById(id).value;
    }

}
