import * as S from './Header.styles';

import Loader from '../Loader/Loader';
import { Outlet } from 'react-router-dom';
import Search from '../Search/Search';
import { Suspense } from 'react';
import darkThemeBtn from '../../assets/icons/dark_mode.png';
import lightThemeBtn from '../../assets/icons/light_mode.png';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
    const { toggleTheme, lightMode } = useTheme();

    return (
        <S.HeaderContainer>
            <S.Header>
                <S.ThemeRow>
                    <h1>GitHub Users Search</h1>
                    <S.ThemeBtn onClick={toggleTheme}>
                        <img
                            src={lightMode ? darkThemeBtn : lightThemeBtn}
                            alt=''
                        />
                    </S.ThemeBtn>
                </S.ThemeRow>
                <Search />
            </S.Header>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </S.HeaderContainer>
    );
};

export default Header;
