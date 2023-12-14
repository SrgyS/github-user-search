import { RootState } from '../store';

export const selectUserList = (state: RootState) => state.users.items;
export const selectTotalCount = (state: RootState) => state.users.total_count;
export const selectSearchParams = (state: RootState) =>
    state.users.searchParams;
