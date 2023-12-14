import { IUserStore } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserStore = {
    items: [],
    total_count: 0,
    searchParams: {
        userLogin: '',
        currentPage: 1,
        sort: '',
        order: '',
    },
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserList: (state, action) => {
            state.items = action.payload.items;
            state.total_count = action.payload.total_count;
        },
        resetStore: () => {
            return initialState;
        },
        updateSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
    },
});

export const { setUserList, resetStore, updateSearchParams } =
    usersSlice.actions;

export default usersSlice.reducer;
