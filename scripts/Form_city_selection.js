class Form_city_selection {
    constructor(inputField, dropdown, requestLink) {
        this.inputFieldElement = document.querySelector(inputField)
        this.dropdownElement = document.querySelector(dropdown)
        this.requestLink = requestLink;
        this.bindEvents()
    }

    onInputFieldClick = () => {
        if (this.dropdownElement.classList.contains('visually-hidden')) {
            this.fetchCities()
        } else {
            this.dropdownElement.classList.add('visually-hidden')
        }      
    }

    // Закрыть dropdown при клике вне
    onNotDropdownClick = (e) => {
        if (!e.target.closest('.form__dropdown-container')) {
        this.dropdownElement.classList.add('visually-hidden')
        }
    }

    bindEvents() {
        this.inputFieldElement.addEventListener('click', this.onInputFieldClick)
        document.addEventListener('click', this.onNotDropdownClick)
    }

    // Функция для загрузки городов
    fetchCities = async () => {
        try {
        const response = await fetch(
            this.requestLink
        )
        if (!response.ok) {
            throw new Error('Не удалось загрузить список городов');
        }

        const data = await response.json()
        if (data.success) {
            this.renderDropdown(data.points)
        } else {
            throw new Error(data.reason)
        }
        } catch (err) {
            this.renderError(err.message)
        }
    }

    // Функция для отображения городов
    renderDropdown = (cities) => {
        this.dropdownElement.innerHTML = ''
        this.dropdownElement.classList.remove('visually-hidden')

        cities.forEach((city) => {
            const item = document.createElement('li')
            item.innerText = city.name
            item.className = 'form__dropdown-item'
            item.addEventListener('click', () => this.selectCity(city.name))
            this.dropdownElement.appendChild(item)
        })
    }

    // Функция выбора города
    selectCity = (cityName) => {
        this.inputFieldElement.value = cityName
        this.dropdownElement.classList.add('visually-hidden')
    }

    // Функция отображения ошибки
    renderError = (message) => {
        this.dropdownElement.innerHTML = `<li class="form__dropdown-item">${message}</li>`
        this.dropdownElement.classList.remove('visually-hidden')
    }
}

export default Form_city_selection