import './App.scss';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from "./components/Logo/Logo";
import Main from "./components/Main/Main";
import ArticleCard from './components/Articles/ArticleCard';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';

function App() {
    const [showLogo, setShowLogo] = useState(() => {
        const storedValue = localStorage.getItem('showLogo');
        return storedValue === null ? true : storedValue === 'true';
    });

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
                <div className="logo-wrapper">
                    <Logo />
                </div>
            ) : (
                <div className="form-wrapper">
                    <Router>
                        <Routes>
                            {/* Главная страница — в Main компонент добавляем ArticleCard */}
                            <Route path="/" element={<Main />} />
                            {/* Страница со статьями */}
                            <Route path="/articles" element={<ArticleCard selectedType={null} />} />
                            {/* Страница полной статьи */}
                            <Route path="/article-details" element={<ArticleDetails />} />
                        </Routes>
                    </Router>
                </div>
            )}
        </div>
    );
}

export default App;
