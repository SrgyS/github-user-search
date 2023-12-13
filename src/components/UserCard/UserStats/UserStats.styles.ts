import { styled } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 8px;
    li {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
