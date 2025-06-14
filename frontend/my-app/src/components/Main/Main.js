import React, { useState, useEffect } from "react";
import Head from "../Head/Head";
import Footer from "../Footer/Footer";

import {fetchData} from "../utils/api";
import ArticleCard from "../Articles/ArticleCard";
import axios from "axios";
import './main.scss'
import Logo from "../Logo/Logo";




const Main = () => {
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
            <div className="main__content">
                <div className="main__content_logo">
                    <div className="main__content_logo_h1">
                        <h1>SAProLex</h1>
                    </div>
                    <div className="main__content_logo">
                        <p className="main__content_logo_p">
                            ADVICE THAT MATTERS
                        </p>
                    </div>
                </div>
                <ArticleCard />
            </div>
            <div>
                <Footer
                    user={user}
                />
            </div>
        </div>
    );
};

export default Main;
