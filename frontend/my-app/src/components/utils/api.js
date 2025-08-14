import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || '/api/',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 5000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Superuser-Access': process.env.REACT_APP_SUPERUSER_KEY || '',
        'X-Api-Version': process.env.REACT_APP_API_VERSION || '1.0'
    }
});

// Проверка обязательных переменных окружения
if (!process.env.REACT_APP_API_BASE_URL) {
    console.warn('Warning: REACT_APP_API_BASE_URL is not set - using fallback /api/');
}

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
    const params = {
        page: page || process.env.REACT_APP_DEFAULT_PAGE || 1,
        page_size: pageSize || process.env.REACT_APP_DEFAULT_PAGE_SIZE || 10,
        ...(category === 'all' ? {category: 'all'} :
            category ? {category: category.pk} : {}),
        ...(selectedType ? {type: selectedType} : {})
    };

    return get('article/', params);
};

export const fetchArticleById = async (id) => {
    return get(`article/${id}/`);
};

export const fetchSortedCases = async (ordering = process.env.REACT_APP_DEFAULT_ORDERING || '-pk') => {
    return get('case/', {ordering});
};

export const fetchToken = async (headers, setToken) => {
    try {
        const response = await api.get(
            process.env.REACT_APP_CSRF_TOKEN_ENDPOINT || 'get-csrf-token/',
            { headers }
        );
        setToken(response.data);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении CSRF-токена:", error);
        throw error;
    }
};