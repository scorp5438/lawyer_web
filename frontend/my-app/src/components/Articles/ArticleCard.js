import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const ArticleCard = () => {



    return (
        <div className="article-card">
            {/*<img src={image} alt={title} className="article-image" />*/}
            {/*<h3>{title}</h3>*/}
            {/*<p>{description}</p>*/}
            {/*<p className="article-date">Создано: {new Date(created_at).toLocaleDateString()}</p>*/}
            {/*{updated_at && updated_at !== created_at && (*/}
            {/*    <p className="article-updated">Обновлено: {new Date(updated_at).toLocaleDateString()}</p>*/}
            {/*)}*/}
        </div>
    )
};
export default ArticleCard;

// useEffect(() => {
//     axios.defaults.withCredentials = true; // Включаем отправку кук
// }, []);
//
// const axiosUser = useCallback(async () => {
//     try {
//
//         const response = await axios.get(
//
//             "http://127.0.0.1:8000/api/user/", {
//                 headers: {
//                     'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
//                 }
//
//             }
//         );
//
//         setUser(response.data || []);
//         console.log(response.data);
//     } catch (error) {
//         console.error("Ошибка при загрузке данных:", error);
//         setUser([]);
//     }
// }, []);
// useEffect(() => {
//     axiosUser();

// }, []);