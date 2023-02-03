import { useLogin } from "@/api/auth"
import { useGetProfile } from "@/api/user"
import { user, useUserContext } from "@/context/user"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function LoginForm() {
	const { setUser } = useUserContext()
	const { refetch } = useGetProfile()
	const [error, setError] = useState("")

	const handleLoginSuccess = async (_: user) => {
		const result = await refetch()
		setUser(result.data?.data)	
	}

	const handleLoginError = (error: any) => {
		if (error.response.status === 401) {
			setError("Wrong user name or password")
		}
	}

	const { mutate } = useLogin({
		onSuccessCallback: handleLoginSuccess,
		onErrorCallback: handleLoginError
	})

	const { register, handleSubmit } = useForm<{email: string, password: string}>();
  	const onSubmit = (data: {email: string, password: string})  => mutate(data);
   
  	return (
    		<form className="flex flex-col max-w-fit" onSubmit={handleSubmit(onSubmit)}>
			<p>Email</p>
      			<input className="border-2" {...register("email")} />
			<p>Password</p>
      			<input className="border-2" type="password" {...register("password")} />
      			<button type="submit">Login</button>
			<Link href="/register">Register new account</Link>
			{error && <p className="text-red-500">{error}</p>}
    		</form>
  	)
}
