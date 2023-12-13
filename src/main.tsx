import './index.css';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import ErrorBlock from './components/Error/ErrorBlock';
import MainPage from './pages/MainPage/MainPage';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeContextProvider } from './contexts/ThemeContext';
import UserCard from './components/UserCard/UserCard';
import { store } from './store/store';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainPage />} errorElement={<ErrorBlock />}>
            <Route path='user/:userLogin' element={<UserCard />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <SkeletonTheme baseColor='#f0f0f0' highlightColor='#e3e3e3'>
                <ThemeContextProvider>
                    <RouterProvider router={router} />
                </ThemeContextProvider>
            </SkeletonTheme>
        </Provider>
    </React.StrictMode>
);
