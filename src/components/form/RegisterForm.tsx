import { registerData, useRegister } from "@/api/auth"
import { useGetProfile } from "@/api/user"
import { useUserContext } from "@/context/user"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function RegisterForm() {
	const { setUser } = useUserContext()
	const { refetch } = useGetProfile()
	const [error, setError] = useState("")

	const handleRegisterSuccess = async (_: void) => {
		const result = await refetch()
		setUser(result.data?.data)	
	}

	const handleRegisterError = (error: any) => {
		if (error.response.status === 409) {
			setError("Email used")
		}
	}

	const { mutate } = useRegister({
		onSuccessCallback: handleRegisterSuccess,
		onErrorCallback: handleRegisterError 
	})

	const { register, handleSubmit } = useForm<registerData>();
  	const onSubmit = (data: registerData)  => mutate(data);
   
  	return (
    		<form className="flex flex-col max-w-fit" onSubmit={handleSubmit(onSubmit)}>
			<p>Email</p>
      			<input className="border-2" {...register("email")} />
			<p>Password</p>
      			<input className="border-2" type="password" {...register("password")} />
			<p>First name</p>
      			<input className="border-2" {...register("firstName")} />
			<p>Last name</p>
      			<input className="border-2" {...register("lastName")} />
      			<button type="submit">Register</button>
			<Link href="/login">To login</Link>
			{error && <p className="text-red-500">{error}</p>}
    		</form>
  	)
}
