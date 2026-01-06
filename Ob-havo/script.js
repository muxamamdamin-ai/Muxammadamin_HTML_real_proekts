const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert("Shahar nomini kiriting!");

    try {
        // 1. Shahar koordinatalarini olish (Open-Meteo uchun)
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();
        if (!geoData.results) throw new Error("Shahar topilmadi!");

        const { latitude, longitude, name } = geoData.results[0];

        // 2. Ob-havo ma'lumotlarini olish
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();

        const temp = weatherData.current_weather.temperature;
        const weatherCode = weatherData.current_weather.weathercode;

        // Weathercode’ni oddiy matnga aylantirish
        const weatherDescriptions = {
            0: "Yorug‘ quyosh",
            1: "Bulutli",
            2: "Bulutli",
            3: "Bulutli",
            45: "Tuman",
            48: "Yumshoq tuman",
            51: "Engil yomg‘ir tomchilari",
            53: "O‘rta yomg‘ir tomchilari",
            55: "Kuchli yomg‘ir tomchilari",
            61: "Yomg‘ir",
            63: "O‘rta yomg‘ir",
            65: "Kuchli yomg‘ir",
            71: "Qor yog‘ishi",
            73: "O‘rta qor yog‘ishi",
            75: "Kuchli qor",
            80: "Yomg‘ir bilan qisqa muddatli yog‘ingarchilik",
            81: "O‘rta yog‘ingarchilik",
            82: "Kuchli yog‘ingarchilik",
            95: "Momaqaldiroq",
            96: "Momaqaldiroq bilan kuchli yomg‘ir",
            99: "Momaqaldiroq bilan kuchli qor"
        };

        cityName.textContent = name;
        temperature.textContent = `Havo harorati: ${temp}°C`;
        description.textContent = weatherDescriptions[weatherCode] || "Ma'lumot yo‘q";

    } catch (err) {
        alert(err.message);
    }
});
