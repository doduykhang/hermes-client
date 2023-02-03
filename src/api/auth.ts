import client from "@/util/axios"
import { useMutation} from "react-query";

const login = ({email, password}: {email: string, password:string}) =>
  client
    .post<{email:string, password:string}>("/api/auth/login", { email, password })

interface useLoginProps {
	onSuccessCallback: (data: any) => void
	onErrorCallback: (error: unknown) => void
}

export const useLogin = (props: useLoginProps) => {
	 return useMutation(login, {
		 onSuccess(data) {
			props.onSuccessCallback(data.data)	
		 },

		 onError(error) {
			props.onErrorCallback(error)
		 }
	 });
}

export interface registerData {
	email: string
	password:string 
	firstName: string
	lastName: string 
}

const register = ({email, password, firstName, lastName}: registerData) =>
  client
    .post("/api/auth/register", { email, password, userInfo: { firstName, lastName } })

interface useRegisterProps {
	onSuccessCallback: (data: void) => void
	onErrorCallback: (error: unknown) => void
}

export const useRegister = (props: useRegisterProps) => {
	 return useMutation(register, {
		 onSuccess(data) {
			props.onSuccessCallback(data.data)	
		 },
		 onError(error) {
			props.onErrorCallback(error)
		 }
	 });
}
