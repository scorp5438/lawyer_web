import './App.scss';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Logo from "./components/Logo/Logo";
import Main from "./components/Main/Main";
import ArticleCard from './components/Articles/ArticleCard';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';
import Head from "./components/Head/Head";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from './components/NotFound/NotFound';
//Импорт шрифтов
import '@fontsource/lora';
import '@fontsource/lora/700.css';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

function App({user}) {
    const [showLogo, setShowLogo] = useState(() => {
        const storedValue = localStorage.getItem('showLogo');
        return storedValue === null ? true : storedValue === 'true';
    });

    const [selectedType, setSelectedType] = useState(null);
    const [activeSection, setActiveSection] = useState('main');
    const [showOnlyProfile, setShowOnlyProfile] = useState(false);

    useEffect(() => {
        if (showLogo) {
            const timer = setTimeout(() => {
                setShowLogo(false);
                localStorage.setItem('showLogo', 'false');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showLogo]);

    useEffect(() => {
        localStorage.removeItem('showLogo');
    }, []);

    const handleBlogClick = (type) => {
        if (selectedType === type) {
            setSelectedType(null);
            setTimeout(() => setSelectedType(type), 0);
        } else {
            setSelectedType(type);
        }
        setActiveSection('blog');
    };

    const handleMainClick = () => {
        setSelectedType(null);
        setActiveSection('main');
    };


    const RedirectToNotFound = () => {
        const navigate = useNavigate();

        useEffect(() => {
            navigate('/404', { replace: true });
        }, [navigate]);

        return null;
    };



    return (
        <div className="App">
            {showLogo ? (
                <div data-testid="logo-wrapper" className="logo-wrapper">
                    <Logo/>
                </div>
            ) : (
                <div data-testid="form-wrapper" className="form-wrapper">
                    <Router>
                        <div className="layout">
                            <Head
                                user={user}
                                onBlogClick={handleBlogClick}
                                onMainClick={handleMainClick}
                                setShowOnlyProfile={setShowOnlyProfile}
                            />

                            <main className="content">
                                <div className="content-wrapper">
                                    <Routes>
                                        <Route path="/" element={
                                            <Main
                                                activeSection={activeSection}
                                                selectedType={selectedType}
                                                setSelectedType={setSelectedType}
                                                showOnlyProfile={showOnlyProfile}
                                            />
                                        }/>
                                        <Route
                                            path="/articles"
                                            element={
                                                <ArticleCard
                                                    selectedType={selectedType}
                                                    setSelectedType={setSelectedType}
                                                />
                                            }
                                        />
                                        <Route path="/article/:id" element={<ArticleDetails/>}/>
                                        <Route path="*" element={<NotFound />} />
                                        <Route path="*" element={<RedirectToNotFound />} />
                                    </Routes>

                                    <div className="button-scroll">
                                        <ScrollToTop/>
                                    </div>
                                </div>
                            </main>

                            <div className="App-footer">
                                <Footer/>
                            </div>
                        </div>
                    </Router>
                </div>
            )}
        </div>
    );
}

export default App;