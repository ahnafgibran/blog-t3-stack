import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter()
  const { data, isLoading } = trpc.useQuery([
    'users.verify-otp',
    {
      hash,
    },
  ])

  if (isLoading) {
    return <p>Verifying...</p>
  }

  // router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')
  
  return <p>Redirecting...</p>
}

function LoginPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<any>(null)
  const router = useRouter();


  const { mutate } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true)
    },
    onError(err) {
      setError(err?.data?.code)
      setTimeout(() => {
        setError('')
      }, 5000)
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate({...values, redirect: router.asPath});
  };

  const hash = router.asPath.split('#token=')[1]

  if (hash) {
    return <VerifyToken hash={hash} />
  }

  // console.log('error', error?.message)

  return (
    <div className="w-full h-full min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-3 w-min mx-auto"
      >
        <h1>Login</h1>
        <input
          type="email"
          placeholder="abc@example.com"
          {...register("email")}
          className="border border-black rounded-sm px-2 py-1 outline-none"
        />
        <button type="submit" className="bg-red-200 px-2 py-1 rounded-md ">
          Login
        </button>
        {success && <p>Check your email</p>}
        {error && <p>{error}</p>}
      </form>
      <Link href="/register">
        <a className="bg-blue-300 px-2 py-1 rounded-md mt-10 w-min block mx-auto">
          Register
        </a>
      </Link>
    </div>
  );
}

export default LoginPage;
