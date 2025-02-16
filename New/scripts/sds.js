const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Список направлений
const routes = [
    { from: "permII", to: "permI" },
    { from: "permII", to: "lyubimovka" },
    { from: "permII", to: "zaostrovka" },
    { from: "permI", to: "lyubimovka" }
];

// Функция для получения завтрашней даты в формате YYYY.MM.DD
const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0].replace(/-/g, ".");
};

// Функция парсинга цены билета
const parsePrice = async (from, to) => {
    const date = getTomorrowDate();
    const url = `https://ppk59.ru/raspisaniye_elektrichek/${from}_${to}/?data=${date}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const priceElement = $(".abonBlock.abonBlock__cost li")
            .filter((_, el) => $(el).text().includes("полный тариф"))
            .first()
            .text()
            .trim();

        return priceElement || "Не найдено";
    } catch (error) {
        console.error(`Ошибка парсинга для ${from} -> ${to}:`, error.message);
        return "Ошибка";
    }
};

// Основная функция для сбора данных и записи в файл
const main = async () => {
    let ticketData = {};

    for (const { from, to } of routes) {
        const price = await parsePrice(from, to);

        if (!ticketData[from]) {
            ticketData[from] = {};
        }

        ticketData[from][to] = price;
    }

    fs.writeFileSync("prices.js", `module.exports = ${JSON.stringify(ticketData, null, 4)};`);
    console.log("Цены билетов сохранены в файл prices.js");
};

// Запуск скрипта
main();
