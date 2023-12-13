import 'react-lazy-load-image-component/src/effects/blur.css';

import * as S from './UserList.styles';

import { IUser } from '../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Props = {
    users: IUser[];
};

function UserList({ users }: Props) {
    return (
        users.length > 0 && (
            <S.UserListContainer>
                <S.UserList>
                    {users &&
                        users.map((user) => (
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
        )
    );
}

export default UserList;
