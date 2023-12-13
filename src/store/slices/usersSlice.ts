import { IUserData } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserData = {
    items: [],
    total_count: 0,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
});

export default usersSlice.reducer;
