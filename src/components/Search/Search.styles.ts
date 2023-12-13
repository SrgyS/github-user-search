import { styled } from 'styled-components';

export const SearchForm = styled.form`
    position: relative;
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 10px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e3e3e3;
`;

export const SearchBar = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: ${(props) => props.theme.card};
    border-radius: 8px;
    padding: 0.5rem;
`;

export const FilterBar = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;
export const SearchInput = styled.input`
    width: 100%;
    padding-left: 2rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 0.1rem 0.6rem;
    background-size: 1.5rem;
    position: relative;
    box-shadow: none;
`;

export const FilterBtn = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
    }
`;

export const SelectItem = styled.div`
    display: flex;
    align-items: center;
    select {
        width: 100%;
    }
`;

export const SearchButton = styled.button`
    background-color: #4f54dc;
    color: white;
`;
