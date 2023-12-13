import { Container } from './MainPage.styles';
import { GlobalStyle } from '../../components/Styles/Global.styles';
import Header from '../../components/Header/Header';
import { IUserData } from '../../types';
import Pagination from '../../components/Pagination/Pagination';
import UserList from '../../components/UserList/UserList';
import { useState } from 'react';

// import UserList from '../../components/UserList/UserList';

const MainPage = () => {
    const [userData, setUserData] = useState<IUserData | undefined>();
    const [currentPage, setCurrentPage] = useState(1);

    const setUserListData = (data: IUserData) => {
        setUserData(data);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header
                    setUserData={setUserListData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                {userData && <UserList users={userData.userList} />}

                <Pagination
                    count={userData?.totalCount || 0}
                    onPageChange={handlePageChange}
                    pageNumber={currentPage}
                />
            </Container>
        </>
    );
};

export default MainPage;
