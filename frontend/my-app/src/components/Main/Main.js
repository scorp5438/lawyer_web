import React, {useEffect} from "react";
import ArticleCard from "../Articles/ArticleCard";
import './main.scss';
import ContentMain from "../ContentMain/ContentMain";
import Profile from "../Profile/Profile";
import CaseList from "../CaseList/CaseList";
import {useLocation} from "react-router-dom";

const Main = ({activeSection, selectedType, setSelectedType, showOnlyProfile}) => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.forceShowProfileOnly) {
            window.history.replaceState({}, document.title); // убираем флаг из URL
        }
    }, [location]);



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

                    <div>
                        {activeSection !== 'blog' && (
                            <div id="profile-section"><Profile/></div>
                        )}
                    </div>

                    {activeSection !== 'blog' && (
                        <div className="case">
                            <CaseList />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Main;