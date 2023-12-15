import * as S from './UserCard.styles';

import { useEffect, useState } from 'react';

import { ErrorMessage } from '../Error/ErrorMessage.styles';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import UserInfo from './UserInfo/UserInfo';
import UserStats from './UserStats/UserStats';
import { useGetUserQuery } from '../../store/services/usersApi';
import { useParams } from 'react-router-dom';

const UserCard = () => {
    const { userLogin } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const { data: user, isLoading, error } = useGetUserQuery({ userLogin });

    const handleDocumentClick = () => {
        setErrorMessage('');
    };

    useEffect(() => {
        if (error) {
            setErrorMessage(
                'Sorry, we are unable to get the response from the server. Please try again later.'
            );
        }
    }, [error]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <>
            {isLoading && <SkeletonCard />}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {user && (
                <S.Container>
                    <UserInfo
                        login={user.login}
                        avatar={user.avatar_url}
                        username={user.name}
                        location={user.location}
                        joined={user.created_at}
                    />
                    <UserStats
                        repos={user.public_repos}
                        followers={user.followers}
                        following={user.following}
                    />
                </S.Container>
            )}
        </>
    );
};

export default UserCard;
