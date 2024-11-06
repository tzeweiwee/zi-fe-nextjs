"use client";

import { getUser } from "@/src/lib/actions/users";
import { Icons } from "@/src/lib/components/ui/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table";
import { updateUser, useGetUsersQuery } from "@/src/lib/services/users";
import { useAppDispatch } from "@/src/lib/store";
import { User } from "@/src/lib/types/user";
import { maskString } from "@/src/lib/utils/string";
import { Skeleton } from "@lib/components/ui/skeleton";
import { useCallback, useMemo } from "react";

export const UsersTable = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetUsersQuery();

  const renderEmail = useCallback(
    (value: string, user: User) => {
      return user.isEmailMasked ? (
        <span
          onClick={async () => {
            // fetches user data from API
            const newUser = await getUser(user.id);
            // replaces user data in the store
            dispatch(updateUser(user.id, newUser.data));
          }}
          className="cursor-pointer"
        >
          {value}
          <Icons.EyeOpen className="w-4 h-4 ml-1" />
        </span>
      ) : (
        <span
          onClick={() => {
            dispatch(
              updateUser(user.id, {
                ...user,
                email: maskString(user.email),
                isEmailMasked: true,
              })
            );
          }}
          className="cursor-pointer"
        >
          {value}
          <Icons.EyeNone className="w-4 h-4 ml-1" />
        </span>
      );
    },
    [dispatch]
  );

  const tableRows = useMemo(() => {
    return [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Email",
        key: "email",
        render: renderEmail,
      },
      {
        title: "First Name",
        key: "first_name",
      },
      {
        title: "Last Name",
        key: "last_name",
      },
      {
        title: "Avatar",
        key: "avatar",
        render: (value: string) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="avatar" style={{ width: 50, height: 50 }} />
        ),
      },
    ];
  }, [renderEmail]);

  if (isLoading) {
    return (
      <div className="min-h-full flex justify-center mt-10 p-6">
        <div className="space-y-2">
          {[...Array(10)].map((_, index) => (
            <Skeleton className="h-10 w-[500px]" key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching users.</div>;
  }

  const users = (data?.data as User[]) || [];

  return (
    <div className="w-full overflow-x-auto flex justify-center items-center">
      <div className="flex flex-col p-6 items-center justify-center min-w-[600px] max-w-[800px]">
        <Table>
          <TableCaption>Showing {users.length} users</TableCaption>
          <TableHeader>
            <TableRow>
              {tableRows.map((row) => (
                <TableHead key={row.key}>{row.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="h-10">
                {tableRows.map((row) => (
                  <TableCell key={row.key}>
                    {row.render?.(
                      user[row.key as keyof User] as string,
                      user
                    ) || user[row.key as keyof User]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
