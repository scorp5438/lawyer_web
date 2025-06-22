import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

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

export const fetchUserData = async (setUser, setError) => {
    try {
        axios.defaults.withCredentials = true;
        const url = `${API_BASE_URL}user/`;
        const headers = {
            'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
        };
        const response = await axios.get(url, { headers });
        setUser(response.data);
    } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки пользователя:', err);
    }
};

export const fetchTypes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}type/`);
        return response.data.types;
    } catch (error) {
        console.error('Ошибка при загрузке типов:', error);
        throw error;
    }
};

export const fetchCategoriesData = async (setCategories, setError, setLoading) => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_BASE_URL}category/`);
        setCategories(response.data);
        setError(null);
    } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки категорий:', err);
    } finally {
        setLoading(false);
    }
};

export const fetchPractices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}practice/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchArticlesAPI = async ({ category, page, pageSize, selectedType }) => {
    const params = {
        page,
        page_size: pageSize
    };

    if (category === 'all') {
        params.category = 'all';
    } else if (category) {
        params.category = category.pk;
    }

    if (selectedType) {
        params.type = selectedType;
    }

    const response = await axios.get(`${API_BASE_URL}article/`, {
        params,
        headers: {'Accept': 'application/json'}
    });

    return response.data; // { results, count }
};

export const fetchCategoriesAPI = async (selectedType) => {
    const response = await axios.get(`${API_BASE_URL}category/`, {
        params: { type: selectedType }
    });
    return response.data;
};