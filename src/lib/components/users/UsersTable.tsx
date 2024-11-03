"use client";

import { Skeleton } from "@lib/components/ui/skeleton";
import { useGetUsersQuery } from "@/src/lib/services/users";
import { User } from "@/src/lib/types/user";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/lib/components/ui/table";
import { Button } from "@/src/lib/components/ui/button";
import { maskString } from "@/src/lib/utils/string";

export const UsersTable = () => {
  const { data, isLoading, error } = useGetUsersQuery();
  const [maskEmailAddress, setMaskEmailAddress] = useState(true);

  const tableRows = useMemo(
    () => [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Email",
        key: "email",
        render: (value: string) => {
          if (maskEmailAddress) {
            return maskString(value);
          }
          return value;
        },
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
          <img src={value} alt="avatar" style={{ width: 50, height: 50 }} />
        ),
      },
    ],
    [maskEmailAddress]
  );

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
        <div className="flex justify-end w-full">
          <Button
            onClick={() => setMaskEmailAddress(!maskEmailAddress)}
            className="mb-4"
          >
            {maskEmailAddress ? "Show" : "Hide"} Email
          </Button>
        </div>
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
                    {row.render?.(user[row.key as keyof User] as string) ||
                      user[row.key as keyof User]}
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
