import * as S from './Search.styles';
import * as S2 from '../Header/Header.styles';

import { darkTheme, lightTheme } from '../../Styles/Themes.styles';
import {
    resetStore,
    setUserList,
    updateSearchParams,
} from '../../store/slices/usersSlice';
import { useEffect, useState } from 'react';

import { ErrorMessage } from '../Header/Header.styles';
import { IFormData } from '../../types';
import Loader from '../Loader/Loader';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useGetUserListMutation } from '../../store/services/usersApi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

type FormChangeHandler =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;

const Search = () => {
    const { lightMode } = useTheme();
    const theme = lightMode ? lightTheme : darkTheme;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const initialFormData: IFormData = {
        userLogin: '',
        currentPage: 1,
        sort: '',
        order: '',
    };

    // const selectSubmit = () => {
    //     const btnElement = document.getElementById(
    //         'search-btn'
    //     ) as HTMLButtonElement;

    //     btnElement.click();
    // };

    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const [errorMessage, setErrorMessage] = useState('');
    const [formError, setFormError] = useState('');

    const isButtonDisabled = formData.userLogin === '';

    const handleChange = (e: FormChangeHandler) => {
        setErrorMessage('');
        const { name, value } = e.target;

        const [sortValue, orderValue] = value.endsWith('-asc')
            ? [value.replace('-asc', ''), 'asc']
            : [value, 'desc'];

        const updatedFormData = {
            ...formData,
            [name]: sortValue,
            order: orderValue,
        } as IFormData;

        setFormData(updatedFormData);
        console.log('set formData', updatedFormData);

        if (name === 'userLogin' && value === '') {
            dispatch(resetStore());

            setFormData(initialFormData);
            navigate('/');
        }
    };

    const [getUserList, { data, error, isLoading }] = useGetUserListMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (/\s/.test(formData.userLogin)) {
            setFormError('Username cannot contain spaces');
            return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(formData.userLogin)) {
            setFormError(
                'Please enter a username with Latin characters, numbers, underscores, or hyphens only'
            );
            return;
        }

        if (formData.userLogin !== '') {
            getUserList({
                userLogin: formData.userLogin,
                currentPage: 1,
                sort: formData?.sort,
                order: formData?.order,
            });

            dispatch(updateSearchParams(formData));
        }
        setErrorMessage('');
    };

    useEffect(() => {
        if (data) {
            console.log('userDisp');
            dispatch(setUserList(data));
        }
    }, [data]);

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
    }, [error]);

    return (
        <>
            <S.SearchForm id='search-form' onSubmit={handleSubmit}>
                <S.SearchBar>
                    <S.SearchInput
                        placeholder='Enter user login'
                        type='search'
                        autoComplete='off'
                        name='userLogin'
                        required
                        onChange={handleChange}
                        value={formData?.userLogin}
                    />
                    <S.SearchButton
                        type='submit'
                        id='search-btn'
                        disabled={isButtonDisabled}
                    >
                        Search
                    </S.SearchButton>
                </S.SearchBar>
                {formError && <ErrorMessage>{formError}</ErrorMessage>}
                <S.FilterBar>
                    <S.SelectItem>
                        <svg
                            width='25'
                            height='25'
                            viewBox='0 0 25 25'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M3.13696 18.2023V16.2023H9.13696V18.2023H3.13696ZM3.13696 13.2023V11.2023H15.137V13.2023H3.13696ZM3.13696 8.20227V6.20227H21.137V8.20227H3.13696Z'
                                fill={theme.iconColor}
                            />
                        </svg>
                        <select
                            disabled={isButtonDisabled}
                            name='sort'
                            id='sort'
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        >
                            <option value=''>Sort by</option>
                            <option value='repositories'>
                                Most Repositories
                            </option>
                            <option value='repositories-asc'>
                                Fewest Repositories
                            </option>
                            <option value='followers'>Most Followers</option>
                            <option value='followers-asc'>
                                Fewest Followers
                            </option>
                        </select>
                    </S.SelectItem>
                </S.FilterBar>
            </S.SearchForm>
            {isLoading && <Loader />}
            {data && data.total_count === 0 && (
                <S2.NotFoundMessage>No users found</S2.NotFoundMessage>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>
    );
};

export default Search;
