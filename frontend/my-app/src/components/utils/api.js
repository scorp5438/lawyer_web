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
        page,
        page_size: pageSize,
        ...(category === 'all' ? {category: 'all'} :
            category ? {category: category.pk} : {}),
        ...(selectedType ? {type: selectedType} : {})
    };

    return get('article/', params);
};
export const fetchArticleById = async (id) => {
    return get(`article/${id}/`);
};
export const fetchSortedCases = async (ordering = '-pk') => {
    return get('case/', {ordering});
};