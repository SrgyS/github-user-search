import * as S from './MainPage.styles';

import { darkTheme, lightTheme } from '../../Styles/Themes.styles';

import { GlobalStyle } from '../../Styles/Global.styles';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import { SkeletonTheme } from 'react-loading-skeleton';
import { UserList } from '../../components/UserList/UserList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const MainPage = () => {
    const { lightMode } = useTheme();
    const theme = lightMode ? lightTheme : darkTheme;
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, []);

    return (
        <SkeletonTheme
            baseColor={theme.backgroundColor}
            highlightColor={theme.card}
        >
            <GlobalStyle />
            <S.Container>
                <Header />
                <UserList />
                <Pagination />
            </S.Container>
        </SkeletonTheme>
    );
};

export default MainPage;
