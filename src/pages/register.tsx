import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };
  return (
    <div className="w-full h-full min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-3 w-min mx-auto"
      >
        <h1>Register</h1>
        <input
          type="email"
          placeholder="abc@example.com"
          {...register("email")}
          className="border border-black rounded-sm px-2 py-1 outline-none"
        />
        <input
          className="border border-black rounded-sm px-2 py-1 outline-none"
          type="text"
          placeholder="abc"
          {...register("name")}
        />
        <button type="submit" className="bg-red-200 px-2 py-1 rounded-md ">
          Register
        </button>
        {error && error.message}
      </form>
      <Link href="/login">
        <a className="bg-blue-300 px-2 py-1 rounded-md mt-10 w-min block mx-auto">
          Login
        </a>
      </Link>
    </div>
  );
}

export default RegisterPage;
