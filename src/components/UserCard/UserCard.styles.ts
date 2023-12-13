import { styled } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 8px;
    padding: 0.5rem;
    background-color: ${(props) => props.theme.card};
    margin: 1rem 1rem 0 1rem;
    overflow: hidden;
`;
