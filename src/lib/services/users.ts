// Need to use the React-specific entry point to import createApi
import { getUsersResponse } from '@/src/lib/types/api';
import { User } from '@/src/lib/types/user';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000' })
const baseQueryWithRelogin: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    window.location.href = '/api/auth/signin';
  }
  return result
}


// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithRelogin,
  endpoints: (builder) => ({
    getUsers: builder.query<getUsersResponse, void>({
      query: () => {
        return '/api/users';
      }
    }),
  }),
})

export const updateUser = (userId: number, newUserData: User) =>
  usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
    const userIndex = draft.data.findIndex((u) => u.id === userId);
    draft.data[userIndex] = newUserData;
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery } = usersApi