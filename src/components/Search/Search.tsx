import * as S from './Search.styles';

import { darkTheme, lightTheme } from '../../Styles/Themes.styles';
import { useEffect, useState } from 'react';

import { ErrorMessage } from '../Header/Header.styles';
import { IFormData } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';

type SearchProps = {
    onSubmit: (formData: IFormData) => void;
    onClear: () => void;
};

type FormChangeHandler =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;

const Search = ({ onSubmit, onClear }: SearchProps) => {
    const { lightMode } = useTheme();
    const theme = lightMode ? lightTheme : darkTheme;
    const initialFormData: IFormData = {
        userLogin: '',
        currentPage: 1,
        sort: '',
        order: '',
    };

    const [formData, setFormData] = useLocalStorage<IFormData>(
        'searchParams',
        initialFormData
    );
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (/\s/.test(formData.userLogin)) {
            setErrorMessage('Username cannot contain spaces');
            return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(formData.userLogin)) {
            setErrorMessage(
                'Please enter a username with Latin characters, numbers, underscores, or hyphens only'
            );
            return;
        }

        onSubmit(formData);
        localStorage.setItem('searchParams', JSON.stringify(formData));
    };

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
        };

        setFormData(updatedFormData);
        console.log('set formData', updatedFormData);

        if (name === 'userLogin' && value === '') {
            onClear();
            setFormData(initialFormData);
        }
    };

    // const selectSubmit = () => {
    //     const btnElement = document.getElementById(
    //         'search-btn'
    //     ) as HTMLButtonElement;

    //     btnElement.click();
    // };

    useEffect(() => {
        console.log('formData', formData);
    }, [formData]);

    useEffect(() => {
        const storedParams = localStorage.getItem('searchParams');
        if (storedParams) {
            setFormData(JSON.parse(storedParams));
            console.log('stored params', JSON.parse(storedParams));
        }
    }, []);

    return (
        <div>
            <S.SearchForm id='search-form' onSubmit={handleSubmit}>
                <S.SearchBar>
                    <S.SearchInput
                        placeholder='Enter user login'
                        type='search'
                        autoComplete='off'
                        name='userLogin'
                        required
                        onChange={handleChange}
                        value={formData.userLogin}
                    />
                    <S.SearchButton
                        type='submit'
                        id='search-btn'
                        disabled={isButtonDisabled}
                    >
                        Search
                    </S.SearchButton>
                </S.SearchBar>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
                                // selectSubmit();
                            }}
                            value={formData.sort}
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
        </div>
    );
};

export default Search;
