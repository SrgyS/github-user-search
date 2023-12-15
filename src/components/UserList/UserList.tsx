import 'react-lazy-load-image-component/src/effects/blur.css';

import * as S from './UserList.styles';

import { IUser } from '../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { selectUserList } from '../../store/selectors/selectors';
import { useAppSelector } from '../../hooks/reduxHooks';

export const UserList = () => {
    const users: IUser[] = useAppSelector(selectUserList);

    return users?.length > 0 ? (
        <S.UserListContainer>
            <S.UserList>
                {users.map((user) => (
                    <S.ListItem key={user.id}>
                        <S.StyledLink to={`user/${user.login}`}>
                            <S.UserAvatar>
                                <LazyLoadImage
                                    effect='blur'
                                    src={user.avatar_url}
                                    alt='user avatar'
                                />
                            </S.UserAvatar>
                            <span>{user.login}</span>
                        </S.StyledLink>
                    </S.ListItem>
                ))}
            </S.UserList>
        </S.UserListContainer>
    ) : (
        <S.Empty />
    );
};
