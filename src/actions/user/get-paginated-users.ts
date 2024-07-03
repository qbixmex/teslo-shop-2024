"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib";

type PaginationOptions = {
  page?: number;
  limit?: number;
};

const getPaginatedUsers = async (paginatedOptions?: PaginationOptions) => {

  let { page = 1, limit = 10 } = paginatedOptions || {};

  // In case for example: page=abc or similar, it will be converted to 1
  if (isNaN(Number(page)) || page < 1) page = 1;

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You are not authorized to perform this action 🚫 !"
    };
  }

  try {
    const users = await prisma.user.findMany({
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        role: true,
        image: true
      },
      orderBy: { name: "desc" }
    });

    if (!users) {
      return {
        ok: true,
        message: "No users found !",
        users: [],
      };
    }

    return {
      ok: true,
      message: "Users fetched successfully !",
      users
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred while fetching users !",
      users: []
    };
  }
};

export default getPaginatedUsers;
