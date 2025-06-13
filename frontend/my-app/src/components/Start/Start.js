import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ArticleCard from "../Articles/ArticleCard";

const Start = () => {

    const [user, setUser] = useState([]);



    useEffect(() => {
        axios.defaults.withCredentials = true; // Включаем отправку кук
    }, []);

    const axiosUser = useCallback(async () => {
        try {

            const response = await axios.get(

                "http://127.0.0.1:8000/api/user/", {
                    headers: {
                        'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
                }

            }
            );

            setUser(response.data || []);
            console.log(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            setUser([]);
        }
    }, []);
    useEffect(() => {
        axiosUser();

    }, []);
    return (
        <div>
            <ArticleCard />
        </div>
    )
};
export default Start;

