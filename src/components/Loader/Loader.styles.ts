import { keyframes, styled } from 'styled-components';
export const Container = styled.div`
    margin-left: 48%;
    margin-top: 30%;
`;

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    `;

export const LoaderSpinner = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid #4f54dc;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
`;
