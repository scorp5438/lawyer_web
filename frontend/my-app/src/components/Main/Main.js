import React, {useEffect} from "react";
import ArticleCard from "../Articles/ArticleCard";
import './main.scss';
import ContentMain from "../ContentMain/ContentMain";
import Profile from "../Profile/Profile";
import CaseList from "../CaseList/CaseList";
import {useLocation} from "react-router-dom";
import YandexMap from "../Contact/YandexMap";

const Main = ({activeSection, selectedType, setSelectedType, showOnlyProfile}) => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.forceShowProfileOnly) {
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Добавьте проверку
    if (!activeSection) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="main-section">
            {showOnlyProfile ? (
                <div id="profile-section"><Profile/></div>
            ) : (
                <>
                    <div>
                        {activeSection === 'blog' ? (
                            <ArticleCard selectedType={selectedType} setSelectedType={setSelectedType}/>
                        ) : (
                            <ContentMain/>
                        )}
                    </div>

                    <div className="profile">
                        {activeSection !== 'blog' && (
                            <div id="profile-section"><Profile/></div>
                        )}
                    </div>

                    {activeSection !== 'blog' && (
                        <div className="case">
                            <CaseList />
                        </div>
                    )}
                    <div className='map'>
                        <YandexMap/></div>
                </>
            )}
        </div>
    );
};

export default Main;