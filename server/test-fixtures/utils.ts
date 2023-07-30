import supabase from "./../src/utils/supabase";
import prisma from "./../src/utils/prisma";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function createUser() {
  const { data, error } = await supabase.auth.signUp({
    email: `example.${Math.random()}@email.com`,
    password: "example-password",
  });

  if (error) throw error;
  return {
    accessToken: data?.session?.access_token,
    userId: data?.user?.id,
  };
}
