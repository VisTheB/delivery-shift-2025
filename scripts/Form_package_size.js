class Form_package_size {
    constructor() {
        this.inputSizeField = document.getElementById('package-size');
        this.sizeDropdown = document.getElementById('size-dropdown');
        this.buttonApproxSize = document.getElementById('button__approx');
        this.buttonExactSize = document.getElementById('button__exact');
        this.dimensionsContainer = document.getElementById('dimensions-container');
        this.measurements = document.getElementById('measurements');
        this.bindEvents()
    }

    onInputSizeFieldClick = () => this.dimensionsContainer.classList.toggle('visually-hidden')

    onButtonApproxSizeClick = () => {
        if (this.sizeDropdown.classList.contains('visually-hidden')) {
            this.buttonApproxSize.classList.add('active')
            this.buttonExactSize.classList.remove('active')
            this.measurements.classList.add('visually-hidden')

            this.fetchApproxSizes()
        } else {
            this.buttonExactSize.classList.remove('active')
            this.buttonApproxSize.classList.remove('active')
            this.sizeDropdown.classList.add('visually-hidden')
        }        
    }

    onButtonExactSizeClick = () => {
        if (this.measurements.classList.contains('visually-hidden')) {
            this.buttonExactSize.classList.add('active')
            this.buttonApproxSize.classList.remove('active')
            this.sizeDropdown.classList.add('visually-hidden')

            this.renderMeasurementFields()
        } else {
            this.buttonExactSize.classList.remove('active')
            this.buttonApproxSize.classList.remove('active')
            this.measurements.classList.add('visually-hidden')
        }
    }

    // Закрыть dropdown при клике вне
    onNotDropdownClick = (e) => {
        if (!e.target.closest('.form__dropdown-container')) {
            this.sizeDropdown.classList.add('visually-hidden')
            this.dimensionsContainer.classList.add('visually-hidden')
            this.measurements.classList.add('visually-hidden')

            this.buttonExactSize.classList.remove('active')
            this.buttonApproxSize.classList.remove('active')
        }
    }

    bindEvents() {
        this.inputSizeField.addEventListener('click', this.onInputSizeFieldClick)
        this.buttonApproxSize.addEventListener('click', this.onButtonApproxSizeClick)
        this.buttonExactSize.addEventListener('click', this.onButtonExactSizeClick)
        document.addEventListener('click', this.onNotDropdownClick)
    }

    // Функция для загрузки примерных размеров
    fetchApproxSizes = async () => {
        try {
        const response = await fetch(
            'https://shift-intensive.ru/api/delivery/package/types'
        )
        if (!response.ok) {
            throw new Error('Не удалось загрузить примерные размеры')
        }

        const data = await response.json()
        if (data.success) {
            this.renderSizeDropdown(data.packages)
        } else {
            throw new Error(data.reason)
        }
        } catch (err) {
            this.renderError(err.message)
        }
    }

    // Функция для отображения списка размеров
    renderSizeDropdown = (sizes) => {
        this.inputSizeField.value = ''
        this.sizeDropdown.innerHTML = ''

        sizes.forEach(size => {
            const item = document.createElement('li')
            item.innerHTML = `
                <img 
                    src="./images/logo-main.svg" 
                    alt="Логотип" 
                    class=""
                    width="48" height="48">
                <div>
                    <h3>${size.name}</h3>
                    <span>${size.length}x${size.width}x${size.height} см</span>
                </div>
            `
            item.className = 'form__dropdown-item-size'
            item.addEventListener('click', () => this.selectSize(size))
            this.sizeDropdown.appendChild(item)
        })
        this.sizeDropdown.classList.remove('visually-hidden')
    }

    // Функция выбора размера посылки
    selectSize = (size) => {
        this.inputSizeField.value = size.name
        this.sizeDropdown.classList.add('visually-hidden')
    }

    // Функция для отображения полей для точных размеров
    renderMeasurementFields = () => {
        this.inputSizeField.value = ''
        this.measurements.innerHTML = `
            <label>
                Длина
                <input type="text" placeholder="см" required/>
            </label>
            <label>
                Ширина
                <input type="text" placeholder="см" required/>
            </label>
            <label>
                Высота
                <input type="text" placeholder="см" required/>
            </label>
            <label>
                Вес
                <input type="text" placeholder="кг" required/>
            </label>
        `
        this.measurements.classList.remove('visually-hidden')
    }

    // Функция отображения ошибки
    renderError = (message) => {
        this.sizeDropdown.innerHTML = `<li class="form__dropdown-item">${message}</li>`
        this.sizeDropdown.classList.remove('visually-hidden')
    }
}

export default Form_package_size