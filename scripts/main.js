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

// Функция для генерации случайной даты рождения
function generateRandomDateOfBirth() {
    const start = new Date(1990, 0, 1); // 1 января 1990
    const end = new Date(2005, 11, 31); // 31 декабря 2005
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Месяцы в JS начинаются с 0
    const year = randomDate.getFullYear();
    
    return `${day}.${month}.${year}`;
}

// Функция для обновления даты рождения на странице
function updateDateOfBirth() {
    const dateOfBirth = generateRandomDateOfBirth();
    document.getElementById('date_of_birth').innerText = dateOfBirth;
}

// Обновление даты на странице
function nowdate() {
  const dateElement = document.getElementById('date');
  const secondDate = document.getElementById("second_date");
  const currentDate = new Date();
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  
  dateElement.textContent = `${day} ${month}`
  secondDate.textContent = `${day} ${month} ${year}`;
}

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
  const passenUrl = 'https://api.puzzlebot.top/api?token=2s1OVLz5iHnPeU7dp8ZGAUrFww8cQ4p9&method=getVariableValue&variable=passengers&user_id=';
  const fullpassenUrl = (passenUrl + userId);
  const fakeParam = Date.now(); // создание фиктивного параметра с текущим временем в миллисекундах
  const RZD_all = 'https://api.puzzlebot.top/api?token=2s1OVLz5iHnPeU7dp8ZGAUrFww8cQ4p9&method=getVariableValue&variable=full_RZD&user_id=';
  const fullall_1 = (RZD_all + userId)
  
  fetch(proxyUrl + fullall_1 + '?fakeParam=' + fakeParam)
  .then(response => response.json())
  .then(data => {
    let variables = data.data.split(' ; ');
    let station_1 = variables[0];
    let station_2 = variables[1];
    let full_name = variables[2];

    console.log(station_1, station_2, full_name);

    let data_elements = document.querySelectorAll('#station_1, #station_1_duble, #station_1_triple, #station_1_qr');
    data_elements.forEach(element => element.textContent = station_1);

    let second_data_elements = document.querySelectorAll('#station_2, #station_2_duble, #station_2_qr');
    second_data_elements.forEach(element => element.textContent = station_2);

    let full_name_data_elements = document.querySelectorAll('#passanger, #passanger_duble')
    full_name_data_elements.forEach(element =>  element.textContent = full_name);
      
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
    updateDateOfBirth();
    nowdate();
    displayValue();
};
