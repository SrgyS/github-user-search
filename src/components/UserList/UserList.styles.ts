import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
export const UserListContainer = styled.div`
    flex: 1;
    overflow: auto;
    padding: 1rem;
    background: ${(props) => props.theme.backgroundColor};
    &::-webkit-scrollbar {
        width: 8px;
        background: ${(props) => props.theme.backgroundColor};
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: ${(props) => props.theme.card};
    }
`;

export const UserList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`;

export const ListItem = styled.li`
    margin: 0.25rem 0;
    gap: 1rem;
`;
export const StyledLink = styled(NavLink)`
    display: flex;
    align-items: center;
    overflow: hidden;

    white-space: pre;
    padding: 0.5rem;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
    gap: 1rem;

    &:hover {
        background: ${(props) => props.theme.card};
    }
    &:active {
        background: hsl(224, 98%, 58%);
        color: white;
    }
    &.active {
        background: #4f54dc;
        color: white;
    }
    &.selected {
        display: none;
    }
`;

export const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
    }
    &.selected {
        width: 150px;
        height: 150px;
    }
`;
export const Empty = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.backgroundColor};
`;
