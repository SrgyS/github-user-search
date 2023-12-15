import './index.css';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorBlock from './components/Error/ErrorBlock';
import MainPage from './pages/MainPage/MainPage';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { UserCardLazy } from './components/UserCard/UserCard.lazy';
import { store } from './store/store';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorBlock />,
        children: [
            {
                path: 'user/:userLogin',
                element: <UserCardLazy />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeContextProvider>
                <RouterProvider router={router} />
            </ThemeContextProvider>
        </Provider>
    </React.StrictMode>
);
