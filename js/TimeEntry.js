export class TimeEntry {

    constructor(parameterObject) {

        this._uid = parameterObject._uid ?? this.generateUniqueId()

        const { date, time } = this.convertDateToInputFormatDateAndTime(new Date())
        this._startDate = parameterObject._startDate ?? date
        this._startTime = parameterObject._startTime ?? time
        this._endDate = parameterObject._endDate ?? date
        this._endTime = parameterObject._endTime ?? time
        
        this._nodeGenerated = false

    }

    generateUniqueId() {
        return 'te-' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36)
    }

    convertDateToInputFormatDateAndTime(dateObject) {

        const year = dateObject.getFullYear()
        const month = String(dateObject.getMonth() + 1).padStart(2, '0')
        const day = String(dateObject.getDate()).padStart(2, '0')
        const hours = String(dateObject.getHours()).padStart(2, '0')
        const minutes = String(dateObject.getMinutes()).padStart(2, '0')
        
        const date = year + '-' + month + '-' + day
        const time = hours + ":" + minutes

        return { date, time }

    }




    // Create the HTML to be associated with this element while setting necessary event listeners and attributes. Will only return HTML once. Further attempts will log a warning to the console.
    get node() {

        if (!this._nodeGenerated) {
            
            let html = `
                <div id="${this._uid}" class="time-period block">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Start</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="field has-addons">
                                    <div class="control is-expanded">
                                        <input class="input start-time" type="time" value="${this._startTime}">
                                    </div>
                                    <div class="control is-expanded">
                                        <input class="input start-date" type="date" value="${this._startDate}">
                                    </div>
                                    <div class="control">
                                        <button class="button set-start-to-now" aria-label="Set start time and date to now.">
                                            <span class="icon">
                                                <i class="fa-solid fa-stopwatch"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">End</label>
                        </div>
                        <div class="field-body">
                            <div class="field is-expanded">
                                <div class="field has-addons">
                                    <div class="control is-expanded">
                                        <input class="input end-time" type="time" value="${this._endTime}">
                                    </div>
                                    <div class="control is-expanded">
                                        <input class="input end-date" type="date" value="${this._endDate}">
                                    </div>
                                    <div class="control">
                                        <button class="button set-end-to-now" aria-label="Set end time and date to now.">
                                            <span class="icon">
                                                <i class="fa-solid fa-stopwatch"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- TODO: Implement optional notes field associated with time period. -->
                    <!-- <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Notes</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control is-expanded">
                                    <textarea class="textarea notes"></textarea>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="field is-horizontal">
                        <div class="field-label is-normal"></div>
                        <div class="field-body">
                            <div class="field is-grouped is-grouped-right">
                                <div class="control">
                                    <button class="button is-warning clear-entry" aria-label="Clear time entry.">
                                        <span class="icon">
                                            <i class="fa-solid fa-eraser"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="control">
                                    <button class="button is-danger delete-entry" aria-label="Delete time entry.">
                                        <span class="icon">
                                            <i class="fa-regular fa-trash-can"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `

            const node = new DOMParser().parseFromString(html, 'text/html').body.firstChild

            const timeTypes = ["start", "end"]

            // Attach functionality to buttons that allow setting a date and time to now
            timeTypes.forEach(timeType => {
                
                node.querySelector(`.set-${timeType}-to-now`).addEventListener('click', () => {
                    
                    const { date, time } = this.convertDateToInputFormatDateAndTime(new Date())
                    node.querySelector(`input.${timeType}-date`).value = date
                    node.querySelector(`input.${timeType}-time`).value = time

                })
            
            })

            // Attach functionality to the button that deletes the time entry
            node.querySelector('button.delete-entry').addEventListener('click', () => {

                node.remove()

            })

            // Attach functionality to 
            node.querySelector('button.clear-entry').addEventListener('click', () => {
                
                const classesOfInputsToClear = ["start-time", "start-date", "end-time", "end-date"]

                classesOfInputsToClear.forEach(classOfInputToClear => {
                    
                    node.querySelector(`input.${classOfInputToClear}`).value = ""

                })

            })
            
            this._nodeGenerated = true

            return node
            
        } else {
            
            console.warn(`HTML for TimeEntry with ID ${this._uid} has previously been generated. HTML will not be generated more than once to avoid the possibility of duplicate elements.`)
            
        }
        

    }

}
