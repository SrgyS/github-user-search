import { createContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../Styles/Themes.styles';

import { ThemeProvider } from 'styled-components';

interface ThemeContextProps {
    lightMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [lightMode, setLightMode] = useState<boolean>(false);

    const toggleTheme = () => {
        setLightMode((prev) => !prev);
    };

    useEffect(() => {
        localStorage.getItem('theme') === 'light' && setLightMode(true);
    }, []);

    useEffect(() => {
        const mode = lightMode ? 'light' : 'dark';
        localStorage.setItem('theme', mode);
    });

    return (
        <ThemeContext.Provider value={{ lightMode, toggleTheme }}>
            <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
