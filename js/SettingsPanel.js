export class SettingsPanel {

    get yearlySalary() {
        return document.getElementById('yearly_salary').value;
    }

    get hoursPerWeek() {
        return document.getElementById('hours_per_week').value;
    }

}