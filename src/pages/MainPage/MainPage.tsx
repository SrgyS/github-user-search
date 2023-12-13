import * as S from './MainPage.styles';

import { darkTheme, lightTheme } from '../../Styles/Themes.styles';
import { useEffect, useState } from 'react';

import { GlobalStyle } from '../../Styles/Global.styles';
import Header from '../../components/Header/Header';
import { IUserData } from '../../types';
import Pagination from '../../components/Pagination/Pagination';
import { SkeletonTheme } from 'react-loading-skeleton';
import UserList from '../../components/UserList/UserList';
import { useTheme } from '../../hooks/useTheme';

const MainPage = () => {
    const [userData, setUserData] = useState<IUserData | undefined>();
    const [currentPage, setCurrentPage] = useState(1);

    const setUserListData = (data: IUserData | undefined) => {
        setUserData(data);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        console.log('userData', userData);
    }, [userData]);
    const { lightMode } = useTheme();
    const theme = lightMode ? lightTheme : darkTheme;
    return (
        <SkeletonTheme
            baseColor={theme.backgroundColor}
            highlightColor={theme.card}
        >
            <GlobalStyle />
            <S.Container>
                <Header
                    setUserData={setUserListData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                {userData ? (
                    <UserList users={userData.items} />
                ) : (
                    <S.Empty></S.Empty>
                )}

                <Pagination
                    count={userData?.total_count || 0}
                    onPageChange={handlePageChange}
                    pageNumber={currentPage}
                />
            </S.Container>
        </SkeletonTheme>
    );
};

export default MainPage;
