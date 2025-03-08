// получаем список цен

// Предполагаем, что эти priceMap уже импортированы
import { priceMap_all } from 'https://necakoni.github.io/not-RZD/New/scripts/prices_updated.js';  // Основной priceMap



// Функция для генерации случайного четырехзначного числа
function generateRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Функция для обновления значений на странице
function updateRandomNumbers() {
    // Генерация случайных чисел
    const randomNum1 = generateRandomFourDigitNumber();
    const randomNum2 = generateRandomFourDigitNumber();
    const randomNum3 = generateRandomFourDigitNumber();
    const randomNum4 = generateRandomFourDigitNumber();

    // Обновление элемента с id=random_num
    document.getElementById('random_num').innerText = `${randomNum1} ${randomNum2}`;

    // Обновление элемента с id=electronic_document
    document.getElementById('electronic_document').innerText = `${randomNum3} ${randomNum4}`;
}

// // Функция для генерации случайной даты рождения
// function generateRandomDateOfBirth() {
//     const start = new Date(1990, 0, 1); // 1 января 1990
//     const end = new Date(2005, 11, 31); // 31 декабря 2005
//     const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
//     const day = String(randomDate.getDate()).padStart(2, '0');
//     const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Месяцы в JS начинаются с 0
//     const year = randomDate.getFullYear();
    
//     return `${day}.${month}.${year}`;
// }

// // Функция для обновления даты рождения на странице
// function updateDateOfBirth() {
//     const dateOfBirth = generateRandomDateOfBirth();
//     document.getElementById('date_of_birth').innerText = dateOfBirth;
// }

// Пролистывание страницы от кнопок сверху
document.addEventListener("DOMContentLoaded", function() {
    let qrLink = document.getElementById("li_qr");
    let qrSection = document.getElementById("qr_section");
    let actionsLink = document.getElementById("li_actions");

    qrLink.addEventListener("click", function() {
        qrSection.scrollIntoView({ behavior: 'smooth' });
    });

    actionsLink.addEventListener("click", function() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    })

});

// Отображение и сокрытие screen
let button_fullscreen = document.getElementById("fullscreen");
let screen = document.querySelector(".screen");
let exit = document.getElementById("exit");

function toggleScreenDisplay() {
    if (screen.style.display === "flex") {
        screen.style.display = "none";
    } else {
        screen.style.display = "flex";
    }
}

button_fullscreen.addEventListener("click", toggleScreenDisplay);
exit.addEventListener("click", toggleScreenDisplay);

// РЖД при наведении курсора
document.addEventListener('DOMContentLoaded', function () {
    function applyHoverEffect(imgQrId, hoverCircleId, swapAxes = false, shiftUp = false) {
        const imgQr = document.getElementById(imgQrId);
        const hoverCircle = document.getElementById(hoverCircleId);

        function updateHoverCircle(x, y) {
            const rect = imgQr.getBoundingClientRect();
            const bgPosX = (x / rect.width) * 100;
            const bgPosY = (y / rect.height) * 100;

            let topPos = y - hoverCircle.offsetHeight / 2;
            if (shiftUp) {
                topPos -= rect.height /1.4; // Смещение вверх на 50% высоты
            }

            hoverCircle.style.left = `${x - hoverCircle.offsetWidth / 2}px`;
            hoverCircle.style.top = `${topPos}px`;
            hoverCircle.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
            hoverCircle.style.display = 'block';
        }

        // Check if the element is rotated
        const isRotated = imgQr.style.transform && imgQr.style.transform.includes('rotate');

        function handleMove(x, y) {
            const rect = imgQr.getBoundingClientRect();
            if (swapAxes) {
                updateHoverCircle(y, rect.height - x);
            } else if (isRotated) {
                updateHoverCircle(y, x);
            } else {
                updateHoverCircle(x, y);
            }
        }

        imgQr.addEventListener('mousemove', function (e) {
            const rect = imgQr.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            handleMove(x, y);
        });

        imgQr.addEventListener('mouseleave', function () {
            hoverCircle.style.display = 'none';
        });

        imgQr.addEventListener('touchstart', function (e) {
            const rect = imgQr.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            handleMove(x, y);
        });

        imgQr.addEventListener('touchmove', function (e) {
            const rect = imgQr.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            handleMove(x, y);
        });

        imgQr.addEventListener('touchend', function () {
            hoverCircle.style.display = 'none';
        });
    }

    // Применяем эффект к обоим наборам элементов
    applyHoverEffect('img_qr', 'hover-circle');
    applyHoverEffect('img_qr_2', 'hover-circle_2', true, true); // Добавлен параметр true для смещения вверх
});

// Функция для получения значения из localStorage
function displayValue() {
    let tg = window.Telegram.WebApp;
    let userId;

    try {
        userId = tg.initDataUnsafe.user.id;
    } catch (error) {
        console.error(error); // Выводим информацию об ошибке
    }

    if (!userId) {
        let value = localStorage.getItem("myValue");
        userId = value; // Присваиваем значение переменной userId
    }

    console.log(userId); // Выводим значение в консоль (для демонстрации)
    
    
  
  const proxyUrl = 'https://super-sup.ru:8443/';
  const passenUrl = 'https://api.puzzlebot.top/api?token=PDl4ZCsK7Aq0YWhaSIgrvzPHtKkQvEh7&method=getVariableValue&variable=passengers&user_id=';
  const fullpassenUrl = (passenUrl + userId);
  const fakeParam = Date.now(); // создание фиктивного параметра с текущим временем в миллисекундах
  const RZD_all = 'https://api.puzzlebot.top/api?token=PDl4ZCsK7Aq0YWhaSIgrvzPHtKkQvEh7&method=getVariableValue&variable=full_RZD&user_id=';
  const fullall_1 = (RZD_all + userId)
  
  fetch(proxyUrl + fullall_1 + '?fakeParam=' + fakeParam)
  .then(response => response.json())
  .then(data => {
    let variables = data.data.split(' ; ');
    let station_1 = variables[0];
    let station_2 = variables[1];
    let full_name = variables[2];
    let dateOfBirth = variables[3];
    let day = variables[4];

    console.log(station_1, station_2, full_name, dateOfBirth);

    //  вставляем первую станцию
    let data_elements = document.querySelectorAll('#station_1, #station_1_duble, #station_1_triple, #station_1_qr');
    data_elements.forEach(element => element.textContent = station_1);

    // вставляем вторую станцию
    let second_data_elements = document.querySelectorAll('#station_2, #station_2_duble, #station_2_qr');
    second_data_elements.forEach(element => element.textContent = station_2);

    // вставляем имя пассажира 
    let full_name_data_elements = document.querySelectorAll('#passanger, #passanger_duble')
    full_name_data_elements.forEach(element =>  element.textContent = full_name);

    // вставляем дату рождения пассажира
    document.getElementById('date_of_birth').innerText = dateOfBirth;
    
  // Обновление даты на странице
    const dateElement = document.getElementById('date');
    const secondDate = document.getElementById("second_date");
    const currentDate = new Date();
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    dateElement.textContent = `${day} ${month}`
    secondDate.textContent = `${day} ${month} ${year}`;
  
  // функция для получения цены
// Функция для получения цены в зависимости от выбранного маршрута
function getPrice(station1, station2) {
    let priceMap = priceMap_all;

    // Определяем нужную карту цен в зависимости от маршрута
    // if (marshrut === "chusovoi") {
    //     priceMap = priceMap_chusovoi;
    // } else if (marshrut === "lysva") {
    //     priceMap = priceMap_lysva;
    // } else if (marshrut === "balesino") {
    //     priceMap = priceMap_balesino;
    // } else {
    //     return 40; // Если маршрут не совпадает, возвращаем дефолтную цену
    // }

    // // Логика для одинаковых станций
    // if (station1 === station2) {
    //     return 0; // Или любая другая логика для одинаковых станций
    // }

    // Получаем цену для выбранных станций

    const priceMapLower = {};
    Object.keys(priceMap).forEach(key => {
    priceMapLower[key.toLowerCase()] = {};
    Object.keys(priceMap[key]).forEach(subKey => {
        priceMapLower[key.toLowerCase()][subKey.toLowerCase()] = priceMap[key][subKey];
    });
    });

    const station1Lower = station1.toLowerCase();
    const station2Lower = station2.toLowerCase();

    const price = priceMapLower[station1Lower] && priceMapLower[station1Lower][station2Lower];

    if (!price) {
    // Если цены нет в одном направлении, проверяем в обратном
    const reversePrice = priceMapLower[station2Lower] && priceMapLower[station2Lower][station1Lower];
    return reversePrice || 40; // Если цены нет в обратном направлении, возвращаем дефолтную цену
    }

    return price;
}

  // вставляем цены в id=price
  const price = getPrice(station_1, station_2);
  document.getElementById('price').innerText = price + ".00";
  
        })
        .catch(error => {
            console.error('Fetch error:', error);
    if (!document.getElementById("inputValue").value) {
        container.classList.replace('hidden', 'block');
        fon.classList.replace('hidden', 'block');
    } else {
        document.getElementById("inputValue").value = "неверный id";
        container.classList.replace('hidden', 'block');
        fon.classList.replace('hidden', 'block');
    }
        })
  }

const container = document.querySelector('.container');
const fon = document.querySelector('.fon');


function saveData() {
    var value = document.getElementById("inputValue").value;
        localStorage.setItem("myValue", value);
        hideContainer();
        displayValue();
}
  function hideContainer() {   
   container.classList.replace('block', 'hidden');
   fon.classList.replace('block', 'hidden');
}


// Вызов функции обновления при загрузке страницы
window.onload = function() {
    updateRandomNumbers();
    // updateDateOfBirth();
    displayValue();
    // Add event listener for save button
    document.getElementById('saveButton').addEventListener('click', saveData);
};
  
