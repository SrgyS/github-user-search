import { IFormData, IUserData } from '../../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com',
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/vnd.github+json');
            return headers;
        },
    }),
    endpoints: (build) => ({
        getUserList: build.mutation<IUserData, IFormData>({
            query: ({ userLogin, currentPage, sort, order }) => {
                if (!userLogin) {
                    return {
                        url: `search/users`,
                    };
                }
                return {
                    url: `search/users?q=${userLogin}`,
                    params: {
                        page: currentPage,
                        sort,
                        order,
                    },
                };
            },
        }),
        getUser: build.query({
            query: ({ userLogin }) => `users/${userLogin}`,
        }),
    }),
});

export const { useGetUserListMutation, useGetUserQuery } = usersApi;
