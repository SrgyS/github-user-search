import * as S from './UserStats.styles';

type UserStatsProps = {
    repos: number;
    followers: number;
    following: number;
};

const UserStats = ({ repos, followers, following }: UserStatsProps) => {
    return (
        <S.Container>
            <li>
                <span>Repositories</span>
                <strong>{repos}</strong>
            </li>
            <li>
                <span>Followers</span>
                <strong>{followers}</strong>
            </li>
            <li>
                <span>Following</span>
                <strong>{following}</strong>
            </li>
        </S.Container>
    );
};

export default UserStats;
