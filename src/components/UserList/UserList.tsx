import * as S from './UserList.styles';

import { IUser } from '../../types';
import { useState } from 'react';

type Props = {
    users: IUser[];
};

function UserList({ users }: Props) {
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(
        undefined
    );

    return (
        users.length > 0 && (
            <S.UserListContainer>
                <S.UserList>
                    {users &&
                        users.map((user) => (
                            <S.ListItem
                                key={user.id}
                                onClick={() => {
                                    setSelectedUser(user);
                                }}
                            >
                                <S.StyledLink
                                    to={`user/${user.login}`}
                                    className={
                                        selectedUser?.id === user.id
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    <S.UserAvatar>
                                        <img
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
