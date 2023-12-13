import { styled } from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 8px;
    padding: 1rem;
    background-color: ${(props) => props.theme.card};
    margin: 1rem 1rem 0 1rem;
    overflow: hidden;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
`;
