import React from "react";
import ArticleCard from "../Articles/ArticleCard";
import './main.scss';
import ContentMain from "../ContentMain/ContentMain";
import Profile from "../Profile/Profile";
import CaseList from "../CaseList/CaseList";


const Main = ({ activeSection, selectedType }) => {


    return (
        <div>

            <div>
                {activeSection === 'blog' ? (
                    <ArticleCard selectedType={selectedType} />
                ) : (
                    <ContentMain />
                )}
            </div>
            <div>{activeSection === 'blog' ||
                <div id="profile-section"><Profile /></div>
            }
            </div>
            <div>
                {activeSection === 'blog' &&
                    <div></div>
                }
            </div>
            <div>
                {activeSection === 'blog' ||
                    <CaseList />
                }
            </div>
        </div>
    );
};

export default Main;