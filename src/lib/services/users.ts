// Need to use the React-specific entry point to import createApi
import { getUsersResponse } from '@/src/lib/types/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: window.origin }),
  endpoints: (builder) => ({
    getUsers: builder.query<getUsersResponse, void>({
      query: () => {
        return '/api/users';
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery } = usersApi