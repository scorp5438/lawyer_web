import './App.scss';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from "./components/Logo/Logo";
import Main from "./components/Main/Main";
import ArticleCard from './components/Articles/ArticleCard';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';
import Head from "./components/Head/Head";
import Footer from "./components/Footer/Footer";

//Импорт шрифтов
import '@fontsource/lora';
import '@fontsource/lora/700.css';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';




function App() {
    const [showLogo, setShowLogo] = useState(() => {
        const storedValue = localStorage.getItem('showLogo');
        return storedValue === null ? true : storedValue === 'true';
    });

    const [user, setUser] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [activeSection, setActiveSection] = useState('main');

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
        setActiveSection('main'); // вот этого не хватало
    };

    useEffect(() => {
        if (showLogo) {
            const timer = setTimeout(() => {
                setShowLogo(false);
                localStorage.setItem('showLogo', 'false'); // сохраняем состояние
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showLogo]);

    return (
        <div className="App">
            {showLogo ? (
                <div data-testid="logo-wrapper" className="logo-wrapper">
                    <Logo />
                </div>
            ) : (
                <div data-testid="form-wrapper" className="form-wrapper">
                    <Router>
                        <Head
                            user={user}
                            onBlogClick={handleBlogClick}
                            onMainClick={handleMainClick}
                        />
                        <Routes>
                            {/* Главная страница — в Main компонент добавляем ArticleCard */}
                            <Route path="/" element={
                                <Main
                                    activeSection={activeSection}
                                    selectedType={selectedType}
                                />
                            } />
                            {/* Страница со статьями */}
                            <Route path="/articles" element={<ArticleCard selectedType={null} />} />
                            {/* Страница полной статьи */}
                            <Route path="/article/:id" element={<ArticleDetails />} />
                        </Routes>
                        <Footer />
                    </Router>
                </div>
            )}
        </div>
    );
}

export default App;
