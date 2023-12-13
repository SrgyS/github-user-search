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
        getUserList: build.query({
            query: ({ userName, page, sort, order }) => {
                if (!userName) {
                    return {
                        url: `search/users`,
                    };
                }

                return {
                    url: `search/users?q=${userName}`,
                    params: {
                        page,
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

export const { useGetUserListQuery, useGetUserQuery } = usersApi;
