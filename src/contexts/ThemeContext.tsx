import { createContext, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../components/Styles/Themes.styles';

import { ThemeProvider } from 'styled-components';

type Theme = typeof lightTheme;

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === lightTheme ? darkTheme : lightTheme
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider
                theme={theme === lightTheme ? lightTheme : darkTheme}
            >
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export { ThemeContextProvider, useTheme };
