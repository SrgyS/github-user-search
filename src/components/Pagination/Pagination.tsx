import * as S from './Pagination.styles';

import {
    selectSearchParams,
    selectTotalCount,
} from '../../store/selectors/selectors';
import { setUserList, updateSearchParams } from '../../store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import nextIcon from '../../assets/icons/next.svg';
import prevIcon from '../../assets/icons/prev.svg';
import { useEffect } from 'react';
import { useGetUserListMutation } from '../../store/services/usersApi';

const Pagination = () => {
    const [getUserList, { data, isLoading, error }] = useGetUserListMutation();
    const searchParams = useAppSelector(selectSearchParams);

    const currentPage = searchParams?.currentPage || 1;

    const dispatch = useAppDispatch();
    const count = useAppSelector(selectTotalCount);

    const totalPages =
        Math.ceil(count / 30) > 100 ? 100 : Math.ceil(count / 30);

    const handleNextClick = () => {
        console.log('queryParams', searchParams);
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

    return (
        totalPages > 1 && (
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
        )
    );
};

export default Pagination;
