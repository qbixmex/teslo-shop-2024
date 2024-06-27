"use server";

import { prisma } from "@/lib";
import bcrypt from 'bcryptjs';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const registerUser = async (formData: FormData) => {
  const newUser = await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: bcrypt.hashSync(formData.password, 10),
    },
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  try {
    return {
      ok: true,
      user: newUser,
      message: 'User registered successfully !'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Could not register user !, Check logs for more information.'
    }
  }
};

export default registerUser;
