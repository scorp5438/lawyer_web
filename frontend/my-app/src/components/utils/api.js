import axios from "axios";

// Утилита для получения переменных окружения
const getEnv = (key, defaultValue) => {
    const reactAppKey = `REACT_APP_${key}`
    return process.env[reactAppKey] || defaultValue;
};

// Конфигурационные константы
const BASE_URL = getEnv('BASE_URL', '/api/');
const API_TIMEOUT = parseInt(getEnv('API_TIMEOUT', '5000'));
const SUPERUSER_ACCESS_KEY = getEnv('SUPERUSER_ACCESS_KEY', '');
const CSRF_TOKEN_HEADER_KEY = getEnv('CSRF_TOKEN_HEADER_KEY', '');

const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Superuser-Access': SUPERUSER_ACCESS_KEY,
        'X-Get-Token-Csrf-For-React': CSRF_TOKEN_HEADER_KEY
    }
});

// Базовые методы API
const get = async (url, params = {}) => {
    try {
        const response = await api.get(url, {params});
        return response.data;
    } catch (error) {
        console.error(`GET ${url} error:`, error);
        throw error;
    }
};

// Специфичные методы API
export const fetchUserData = async () => {
    return get('user/');
};

export const fetchTypes = async () => {
    const data = await get('type/');
    return data.types || [];
};

export const fetchCategories = async (type = null) => {
    const params = {};
    if (type) params.type = type;
    return get('category/', params);
};

export const fetchPractices = async () => {
    return get('practice/');
};

export const fetchArticles = async ({category, page, pageSize, selectedType}) => {
    const DEFAULT_PAGE = parseInt(getEnv('DEFAULT_PAGE', '1'));
    const DEFAULT_PAGE_SIZE = parseInt(getEnv('DEFAULT_PAGE_SIZE', '10'));

    const params = {
        page: page || DEFAULT_PAGE,
        page_size: pageSize || DEFAULT_PAGE_SIZE,
        ...(category === 'all' ? {category: 'all'} :
            category ? {category: category.pk} : {}),
        ...(selectedType ? {type: selectedType} : {})
    };

    return get('article/', params);
};

export const fetchArticleById = async (id) => {
    return get(`article/${id}/`);
};

export const fetchSortedCases = async (ordering = null) => {
    const DEFAULT_ORDERING = getEnv('DEFAULT_ORDERING', '-pk');
    return get('case/', {ordering: ordering || DEFAULT_ORDERING});
};

export const fetchAddress = async () => {
    try {
        const response = await get('address/');
        console.log('Ответ от API address:', response);
        return response;
    } catch (error) {
        console.error('Ошибка в fetchAddress:', error);
        throw error;
    }
};

export const fetchToken = async (headers) => {
    try {
        const response = await api.get(
            'get-csrf-token/',
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении CSRF-токена:", error);
        throw error;
    }
};
