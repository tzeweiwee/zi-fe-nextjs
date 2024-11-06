// export const dynamic = 'force-static'

import { User } from "@/src/lib/types/user";
import { maskString } from "@/src/lib/utils/string";

export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const getFirstStringCharacter = (str: string) => {
  return str.charAt(0)
}

export async function GET() {
  const users: User[] = [];

  const fetchUsers = async (page: number = 1) => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: UsersResponse = await res.json()
    users.push(...data.data)

    if (data.page < data.total_pages) {
      await fetchUsers(data.page + 1)
    }

    return users
  }

  await fetchUsers();


  const filteredUsers = users.filter((user) => {
    if (getFirstStringCharacter(user.first_name) === 'G' || getFirstStringCharacter(user.last_name) === 'W') {
      return user
    }
    return false;
  })

  const usersWithMaskedEmail = filteredUsers.map((user) => {
    return {
      ...user,
      email: maskString(user.email),
      isEmailMasked: true
    }
  });


  return Response.json({ data: usersWithMaskedEmail })
}