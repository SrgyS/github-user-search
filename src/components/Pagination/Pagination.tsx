import * as S from './Pagination.styles';

import {
    selectSearchParams,
    selectTotalCount,
} from '../../store/selectors/selectors';
import { setUserList, updateSearchParams } from '../../store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';

import { ErrorMessage } from '../Error/ErrorMessage.styles';
import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';
import { useGetUserListMutation } from '../../store/services/usersApi';

const Pagination = () => {
    const [getUserList, { data, error }] = useGetUserListMutation();
    const searchParams = useAppSelector(selectSearchParams);
    const [errorMessage, setErrorMessage] = useState('');
    const currentPage = searchParams?.currentPage || 1;

    const dispatch = useAppDispatch();
    const count = useAppSelector(selectTotalCount);

    const handleDocumentClick = () => {
        setErrorMessage('');
    };

    const totalPages =
        Math.ceil(count / 30) > 100 ? 100 : Math.ceil(count / 30);

    const handleNextClick = () => {
        setErrorMessage('');
        getUserList({
            ...searchParams,
            currentPage: currentPage + 1,
        });
        dispatch(
            updateSearchParams({
                ...searchParams,
                currentPage: currentPage + 1,
            })
        );
    };

    const handlePrevClick = () => {
        setErrorMessage('');
        getUserList({
            ...searchParams,
            currentPage: currentPage - 1,
        });
        dispatch(
            updateSearchParams({
                ...searchParams,
                currentPage: currentPage - 1,
            })
        );
    };

    useEffect(() => {
        if (count && data) {
            dispatch(setUserList(data));
        }
    }, [data, count]);

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

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        totalPages > 1 && (
            <>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <S.Pagination>
                    <S.ArrowBtn
                        onClick={handlePrevClick}
                        disabled={currentPage === 1}
                    >
                        <img src={prevIcon} />
                    </S.ArrowBtn>
                    <S.Count>
                        {currentPage}/{totalPages}
                    </S.Count>

                    <S.ArrowBtn
                        onClick={handleNextClick}
                        disabled={currentPage === totalPages}
                    >
                        <img src={nextIcon} />
                    </S.ArrowBtn>
                </S.Pagination>
            </>
        )
    );
};

export default Pagination;
