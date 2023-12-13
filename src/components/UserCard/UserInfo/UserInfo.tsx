import * as S from './UserInfo.styles';

import { darkTheme, lightTheme } from '../../../Styles/Themes.styles';

import { formatDate } from '../../../utils/formatDate';
import { useTheme } from '../../../hooks/useTheme';

type UserInfoProps = {
    username: string;
    avatar: string;
    login: string;
    joined: string;
    location: string;
};

const UserInfo = ({
    username,
    avatar,
    login,
    joined,
    location,
}: UserInfoProps) => {
    const joinedDate = formatDate(joined);
    const { lightMode } = useTheme();

    const theme = lightMode ? lightTheme : darkTheme;

    return (
        <S.Container>
            <S.Avatar>
                <img src={avatar} alt='user avatar' />
            </S.Avatar>
            <S.Data>
                <a href={`https://github.com/${login}`}>
                    {username && <strong>{username}</strong>}
                    <span>@{login}</span>
                </a>
                <S.Location>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='18'
                        viewBox='0 -960 960 960'
                        width='18'
                    >
                        <path
                            d='M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z'
                            fill={theme.iconColor}
                        />
                    </svg>
                    {location && <span>{location}</span>}
                </S.Location>

                <span>Joined {joinedDate}</span>
            </S.Data>
        </S.Container>
    );
};

export default UserInfo;
