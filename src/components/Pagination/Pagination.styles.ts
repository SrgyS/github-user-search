import { styled } from 'styled-components';

export const Pagination = styled.div`
    position: sticky;
    bottom: 0;
    background-color: ${(props) => props.theme.backgroundColor};
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 1rem 2rem;
    border-top: 1px solid #e3e3e3;
    line-height: 1;
`;

export const ArrowBtn = styled.button`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.card};

    &:hover {
        scale: 1.1;
    }

    &:disabled {
        color: grey;
        background-color: ${(props) => props.theme.backgroundColor};
        pointer-events: none;
        box-shadow: none;
    }
`;

export const Count = styled.div`
    min-width: 100px;
    text-align: center;
`;
