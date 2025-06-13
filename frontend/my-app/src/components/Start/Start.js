import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ArticleCard from "../Articles/ArticleCard";
import Head from "../Head/Head";
import Footer from "../Footer/Footer";
import {fetchData} from "../utils/api";

const Start = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        const url = "http://127.0.0.1:8000/api/user/";
        const headers = {
            'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
        };

        fetchData(url, headers, setUser, []);
    }, []);

    return (
        <div>
            <div>
                <Head
                    user={user}
                />
            </div>
            <div>
                <ArticleCard />
            </div>
            <div>
                <Footer
                user={user}
                />
            </div>
        </div>
    )
};
export default Start;

