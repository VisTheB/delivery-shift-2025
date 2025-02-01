import Form_city_selection from './Form_city_selection.js'

class Form_destination_city {
    selectors = {
        inputField: '[data-js-dest-city-input]',
        dropdown: '[data-js-dest-city-dropdown]'
    }

    constructor() {
       this.LoadCities()
    }

    LoadCities() {
        new Form_city_selection(
            this.selectors.inputField, 
            this.selectors.dropdown, 
            'https://shift-intensive.ru/api/delivery/points'
            )
    }
}

export default Form_destination_city