import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || '/api/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
//        'X-Superuser-Access': process.env.REACT_APP_SUPERUSER_KEY
        'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
    }
});
// Базовые методы API
export const get = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
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

export const fetchCategories = async (params = {}) => {
    return get('category/', params);
};

export const fetchPractices = async () => {
    return get('practice/');
};

export const fetchArticles = async ({ category, page, pageSize, selectedType }) => {
    const params = {
        page,
        page_size: pageSize,
        ...(category === 'all' ? { category: 'all' } :
            category ? { category: category.pk } : {}),
        ...(selectedType ? { type: selectedType } : {})
    };

    return get('article/', params);
};