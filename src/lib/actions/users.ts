'use server'

import { User } from "@/src/lib/types/user"

export type GetSingleUserResponse = {
  data: User;
}
 
// Although getUser is ideally a GET request so we can cache, we are using POST here to demonstrate how to use the server action
export async function getUser(userId: number) {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const res = await fetch(`https://reqres.in/api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: GetSingleUserResponse = await res.json()

    return data;

}