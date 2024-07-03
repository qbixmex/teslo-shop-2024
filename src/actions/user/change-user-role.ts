'use server';

import { auth } from "@/auth.config";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

const changeUserRole = async (
  userId: string,
  role: 'admin' | 'user'
) => {

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You are not authorized to perform this action 🚫 !"
    };
  }

  try {

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath('admin/users');

    return {
      ok: true,
      message: "User Role Updated successfully !",
      user: updatedUser,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred while fetching users !",
    }; 
  }
};

export default changeUserRole;
