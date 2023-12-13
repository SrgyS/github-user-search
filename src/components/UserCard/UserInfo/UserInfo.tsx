import * as S from './UserInfo.styles';

type UserInfoProps = {
    username: string;
    avatar: string;
    login: string;
    joined: string;
};

const UserInfo = ({ username, avatar, login, joined }: UserInfoProps) => {
    return (
        <S.Container>
            <S.Avatar>
                <img src={avatar} alt='user avatar' />
            </S.Avatar>
            <S.Data>
                <span>{username}</span>
                <span>@{login}</span>
                <span>Joined {joined}</span>
            </S.Data>
        </S.Container>
    );
};

export default UserInfo;
