"use server";

import { signOut } from "@/auth.config";

const logout = async () => await signOut();

export default logout;
