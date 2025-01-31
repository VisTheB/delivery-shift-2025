import Form_city_selection from './Form_city_selection.js'

class Form_departure_city {
    selectors = {
        inputField: '[data-js-dep-city-input]',
        dropdown: '[data-js-dep-city-dropdown]'
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

export default Form_departure_city