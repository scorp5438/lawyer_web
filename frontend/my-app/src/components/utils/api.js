import axios from "axios";

export const fetchData = async (url, headers = {}, setData, defaultValue = []) => {
    try {
        const response = await axios.get(url, { headers });
        setData(response.data || defaultValue);
        console.log("Ответ сервера:", response.data);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setData(defaultValue);
    }
};
