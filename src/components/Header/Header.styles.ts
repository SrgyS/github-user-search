import { styled } from 'styled-components';

export const Header = styled.div`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
`;

export const ThemeBtn = styled.div`
    width: 30px;
    height: auto;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
    }
`;

export const HeaderContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    position: sticky;
    top: 0;
`;
export const ThemeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
`;
