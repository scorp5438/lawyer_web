import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
    jest.useFakeTimers(); // всегда включать фейковые таймеры
    localStorage.clear(); // очищаем хранилище перед каждым тестом
});

afterEach(() => {
    jest.runOnlyPendingTimers(); // чистим таймеры
    jest.useRealTimers();
});

test('renders Logo component initially', () => {
    render(<App />);
    const logoElement = screen.getByAltText(/logo/i); // убедись что в Logo есть alt="logo"
    expect(logoElement).toBeInTheDocument();
});

test('Logo disappears after timeout and Main is rendered', () => {
    render(<App />);
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument();
    jest.advanceTimersByTime(2000);
    expect(screen.getByTestId('form-wrapper')).toBeInTheDocument();
});

test('renders Main page at route /', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );
    // Заменить текст на реальный текст из Main:
    expect(screen.getByText(/главная страница/i)).toBeInTheDocument();
});

test('renders ArticleCard on /articles route', () => {
    render(
        <MemoryRouter initialEntries={['/articles']}>
            <App />
        </MemoryRouter>
    );
    // Заменить на реальный текст из ArticleCard:
    expect(screen.getByText(/список статей/i)).toBeInTheDocument();
});

test('renders ArticleDetails on /article-details route', () => {
    render(
        <MemoryRouter initialEntries={['/article-details']}>
            <App />
        </MemoryRouter>
    );
    // Заменить на реальный текст из ArticleDetails:
    expect(screen.getByText(/детали статьи/i)).toBeInTheDocument();
});

test('Logo is shown when localStorage is empty', () => {
    render(<App />);
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument();
});

test('Logo is not shown if localStorage says to skip', () => {
    localStorage.setItem('showLogo', 'false');
    render(<App />);
    expect(screen.queryByTestId('logo-wrapper')).toBeNull();
});
