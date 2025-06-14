import './App.scss';
import { useEffect, useState } from "react";
import Logo from "./components/Logo/Logo";
import Main from "./components/Main/Main";

function App() {
    const [showLogo, setShowLogo] = useState(true); // Состояние для показа Logo

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLogo(false); // Через 3 секунды Logo исчезает
        }, 2000);

        return () => clearTimeout(timer); // Очистка таймера на размонтирование
    }, []);

    return (
        <div className="App">
            {showLogo ? (
                <div className="logo-wrapper">
                    <Logo />
                </div>
            ) : (
                <div className="form-wrapper">
                    <Main />
                </div>
            )}
        </div>
    );
}

export default App;
