import * as S from './Header.styles';

import { IFormData, IUserData } from '../../types';
import { Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import Loader from '../Loader/Loader';
import Search from '../Search/Search';
import darkThemeBtn from '../../assets/icons/dark_mode.png';
import lightThemeBtn from '../../assets/icons/light_mode.png';
import { useGetUserListMutation } from '../../store/services/usersApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';

type HeaderProps = {
    setUserData: (data: IUserData | undefined) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const Header = ({ setUserData, currentPage, setCurrentPage }: HeaderProps) => {
    const { toggleTheme, lightMode } = useTheme();
    const [errorMessage, setErrorMessage] = useState('');

    const [queryParams, setQueryParams] = useLocalStorage<IFormData | null>(
        'searchParams',
        null
    );

    const navigate = useNavigate();

    const [getUserList, { data, isLoading, error }] = useGetUserListMutation();

    const handleSubmit = (formData: IFormData) => {
        setCurrentPage(1);
        setQueryParams(formData);
        setErrorMessage('');
    };

    const onClear = () => {
        localStorage.removeItem('searchParams');
        setUserData(undefined);
        navigate('/');
    };

    useEffect(() => {
        if (error) {
            if ('status' in error) {
                error.status === 403
                    ? setErrorMessage(
                          'Sorry, over request limit. Please try again later.'
                      )
                    : setErrorMessage(
                          'Sorry, we are unable to get the response from the server. Please try again later.'
                      );
            }
        }
        if (data) {
            console.log('data', data);
            setUserData(data);
        }
    }, [data, isLoading, error]);

    useEffect(() => {
        if (queryParams.userLogin !== '') {
            getUserList({
                userLogin: queryParams.userLogin,
                currentPage: currentPage,
                sort: queryParams?.sort,
                order: queryParams?.order,
            });
        }
    }, [queryParams, getUserList, currentPage]);

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
                            src={lightMode ? darkThemeBtn : lightThemeBtn}
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
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </S.HeaderContainer>
    );
};

export default Header;
