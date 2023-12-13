import { styled } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;
export const Avatar = styled.div`
    width: 100px;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

export const Data = styled.div`
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.textNorm};
`;
