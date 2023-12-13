import * as S from './UserCard.styles';

import SkeletonCard from '../SkeletonCard/SkeletonCard';
import UserInfo from './UserInfo/UserInfo';
import UserLinks from './UserLinks/UserLinks';
import UserStats from './UserStats/UserStats';
import { useEffect } from 'react';
import { useGetUserQuery } from '../../store/services/usersApi';
import { useParams } from 'react-router-dom';

const UserCard = () => {
    const { userLogin } = useParams();
    console.log('userLogin', userLogin);
    const { data: user, isLoading } = useGetUserQuery({ userLogin });

    useEffect(() => {
        if (user) {
            console.log('userData', user);
        }
    }, [user]);

    return (
        <>
            {isLoading && <SkeletonCard />}
            {user && (
                <S.Container>
                    <UserInfo
                        login={user.login}
                        avatar={user.avatar_url}
                        username={user.name}
                        joined={user.created_at}
                    />
                    <UserStats
                        repos={user.public_repos}
                        followers={user.followers}
                        following={user.following}
                    />
                    <UserLinks
                        location={user.location}
                        email={user.email}
                        github={user.html_url}
                    />
                </S.Container>
            )}
        </>
    );
};

export default UserCard;
