import * as S from './Search.styles';

import { useEffect, useState } from 'react';

import { ErrorMessage } from '../Header/Header.styles';
import { IFormData } from '../../types';
import filterIcon from '../../assets/icons/page_info.svg';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../contexts/ThemeContext';

type SearchProps = {
    onSubmit: (formData: IFormData) => void;
    onClear: () => void;
};

type FormChangeHandler =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;

const Search = ({ onSubmit, onClear }: SearchProps) => {
    const { theme } = useTheme();
    console.log('theme', theme);
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

        if (!/^[a-zA-Z]+$/.test(formData.userLogin)) {
            setErrorMessage(
                'Please enter a username with Latin characters only'
            );
            return;
        }
        onSubmit(formData);
        localStorage.setItem('searchParams', JSON.stringify(formData));
    };

    const isSearchButtonDisabled = formData.userLogin === '';

    const handleChange = (e: FormChangeHandler) => {
        setErrorMessage('');
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'userLogin' && value === '') {
            onClear();
            setFormData(initialFormData);
        }
    };

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
                        disabled={isSearchButtonDisabled}
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
                                d='M17.887 20.4523C16.837 20.4523 15.9495 20.0898 15.2245 19.3648C14.4995 18.6398 14.137 17.7523 14.137 16.7023C14.137 15.6523 14.4995 14.7648 15.2245 14.0398C15.9495 13.3148 16.837 12.9523 17.887 12.9523C18.937 12.9523 19.8245 13.3148 20.5495 14.0398C21.2745 14.7648 21.637 15.6523 21.637 16.7023C21.637 17.7523 21.2745 18.6398 20.5495 19.3648C19.8245 20.0898 18.937 20.4523 17.887 20.4523ZM17.887 18.4523C18.3703 18.4523 18.7828 18.2814 19.1245 17.9398C19.4661 17.5981 19.637 17.1856 19.637 16.7023C19.637 16.2189 19.4661 15.8064 19.1245 15.4648C18.7828 15.1231 18.3703 14.9523 17.887 14.9523C17.4036 14.9523 16.9911 15.1231 16.6495 15.4648C16.3078 15.8064 16.137 16.2189 16.137 16.7023C16.137 17.1856 16.3078 17.5981 16.6495 17.9398C16.9911 18.2814 17.4036 18.4523 17.887 18.4523ZM4.13696 17.7023V15.7023H12.137V17.7023H4.13696ZM6.38696 11.4523C5.33696 11.4523 4.44946 11.0898 3.72446 10.3648C2.99946 9.63977 2.63696 8.75227 2.63696 7.70227C2.63696 6.65227 2.99946 5.76477 3.72446 5.03977C4.44946 4.31477 5.33696 3.95227 6.38696 3.95227C7.43696 3.95227 8.32446 4.31477 9.04946 5.03977C9.77446 5.76477 10.137 6.65227 10.137 7.70227C10.137 8.75227 9.77446 9.63977 9.04946 10.3648C8.32446 11.0898 7.43696 11.4523 6.38696 11.4523ZM6.38696 9.45227C6.8703 9.45227 7.2828 9.28144 7.62446 8.93977C7.96613 8.5981 8.13696 8.1856 8.13696 7.70227C8.13696 7.21894 7.96613 6.80644 7.62446 6.46477C7.2828 6.1231 6.8703 5.95227 6.38696 5.95227C5.90363 5.95227 5.49113 6.1231 5.14946 6.46477C4.8078 6.80644 4.63696 7.21894 4.63696 7.70227C4.63696 8.1856 4.8078 8.5981 5.14946 8.93977C5.49113 9.28144 5.90363 9.45227 6.38696 9.45227ZM12.137 8.70227V6.70227H20.137V8.70227H12.137Z'
                                fill={theme.iconColor}
                            />
                        </svg>
                        <select
                            onChange={handleChange}
                            name='sort'
                            id='sort'
                            // onChange={(event) => {
                            //     submit(event.currentTarget.form);
                            // }}
                            value={formData.sort}
                        >
                            <option value='' data-content={filterIcon}>
                                Filter
                            </option>
                            <option value='repositories'>Repositories</option>
                            <option value='followers'>Followers</option>
                        </select>
                    </S.SelectItem>
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
                            name='order'
                            id='order'
                            onChange={handleChange}
                            value={formData.order}
                            // onChange={(event) => {
                            //     submit(event.currentTarget.form);
                            // }}
                        >
                            <option value=''>Sort</option>
                            <option value='desc'>Descending</option>
                            <option value='asc'>Ascending</option>
                        </select>
                    </S.SelectItem>
                </S.FilterBar>
            </S.SearchForm>
        </div>
    );
};

export default Search;
