import * as S from './Header.styles';

import { IFormData, IUserData } from '../../types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Search from '../Search/Search';
import darkThemeBtn from '../../assets/icons/dark_mode.png';
import { lightTheme } from '../Styles/Themes.styles';
import lightThemeBtn from '../../assets/icons/light_mode.png';
import { useGetUserListQuery } from '../../store/services/usersApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../contexts/ThemeContext';

type HeaderProps = {
    setUserData: (data: IUserData) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const Header = ({ setUserData, currentPage, setCurrentPage }: HeaderProps) => {
    const { toggleTheme, theme } = useTheme();
    const [errorMessage, setErrorMessage] = useState('');
    const isLightTheme = theme === lightTheme;

    const [queryParams, setQueryParams] = useLocalStorage<IFormData | null>(
        'searchParams',
        null
    );

    const navigate = useNavigate();

    const { data, isLoading, error } = useGetUserListQuery({
        userName: queryParams?.userLogin,
        page: currentPage,
        sort: queryParams?.sort,
        order: queryParams?.order,
    });

    const handleSubmit = (data: IFormData) => {
        setQueryParams(data);
        setErrorMessage('');
    };

    const onClear = () => {
        localStorage.removeItem('searchParams');
        setUserData({ userList: [], totalCount: 0 });
        navigate('/');
    };

    useEffect(() => {
        if (error) {
            setErrorMessage(
                'Sorry, we are unable to get the response from the server. Please try again later.'
            );
        }
        if (data) {
            console.log('data', data);
            setUserData({
                totalCount: data.total_count,
                userList: data.items,
            });
        }
    }, [data, isLoading, error]);

    useEffect(() => {
        setCurrentPage(1);
    }, [queryParams?.userLogin]);

    return (
        <S.HeaderContainer>
            <S.Header>
                <S.ThemeRow>
                    <h1>GitHub Users Search</h1>
                    <S.ThemeBtn onClick={toggleTheme}>
                        <img
                            src={isLightTheme ? darkThemeBtn : lightThemeBtn}
                            alt=''
                        />
                    </S.ThemeBtn>
                </S.ThemeRow>
                <Search onSubmit={handleSubmit} onClear={onClear} />
            </S.Header>
            {data && data.total_count === 0 && (
                <S.NotFoundMessage>No users found</S.NotFoundMessage>
            )}
            {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
            <Outlet />
        </S.HeaderContainer>
    );
};

export default Header;
