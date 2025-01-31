class Form_package_size {
    constructor() {
        this.inputSizeField = document.getElementById('package-size');
        this.sizeDropdown = document.getElementById('size-dropdown');
        this.sizeTypeSelect = document.getElementById('size-type');
        this.dimensionsContainer = document.getElementById('dimensions-container');
        this.measurements = document.getElementById('measurements');
        this.bindEvents()
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
        this.sizeDropdown.innerHTML = ''

        sizes.forEach(size => {
            const item = document.createElement('li')
            item.innerText = `${size.name} (${size.length}x${size.width}x${size.height} см)`
            item.className = 'form__dropdown-item'
            item.addEventListener('click', () => this.selectSize(size))
            this.sizeDropdown.appendChild(item)
        })
    }

    // Функция выбора размера посылки
    selectSize = (size) => {
        this.inputSizeField.value = size.name
        this.sizeDropdown.classList.add('visually-hidden')
        this.dimensionsContainer.classList.remove('visually-hidden')
        this.renderMeasurementFields()
    }

    // Функция для отображения полей для точных размеров
    renderMeasurementFields = () => {
        const selectedType = this.sizeTypeSelect.value
        this.measurements.innerHTML = ''

        if (this.selectedType === 'approx') {
            this.measurements.innerHTML = `
                <p>Размеры:</p>
                <input type="text" placeholder="Длина (см)" />
                <input type="text" placeholder="Ширина (см)" />
                <input type="text" placeholder="Высота (см)" />
            `
        } else if (selectedType === 'exact') {
            this.measurements.innerHTML = `
                <p>Размеры:</p>
                <input type="text" placeholder="Длина (см)" />
                <input type="text" placeholder="Ширина (см)" />
                <input type="text" placeholder="Высота (см)" />
                <input type="text" placeholder="Вес (кг)" />
            `
        }
    }

    // Функция отображения ошибки
    renderError = (message) => {
        this.sizeDropdown.innerHTML = `<li class="form__dropdown-item">${message}</li>`
        this.sizeDropdown.classList.remove('visually-hidden')
    }
}

export default Form_package_size



// Обработчик клика по полю размера
inputSizeField.addEventListener('click', () => {
    if (sizeDropdown.classList.contains('hidden')) {
    sizeDropdown.classList.remove('hidden');
    } else {
    sizeDropdown.classList.add('hidden');
    }
});

// Обработчик изменения типа размера
sizeTypeSelect.addEventListener('change', () => {
    if (sizeTypeSelect.value === 'approx') {
    fetchApproxSizes(); // Загружаем примерные размеры
    } else {
    // Для точных размеров можно определить логику
    measurements.innerHTML = ''; // Очистить, если выбраны точные
    }
});

// Закрытие dropdown при клике вне области
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
    sizeDropdown.classList.add('hidden');
    }
});