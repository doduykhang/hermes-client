import { useGetProfile } from '@/api/user';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

export interface user {
	id: string
	email: string	
	firstName: string
	lastName: string
	avatar: string
}

interface userContext {
	user: user | undefined
	setUser: (user: user | undefined) => void
	removeUser: () => void
	isLoading: boolean
}

const defaultUserContext: userContext = {
	user: undefined,
	setUser: () => {},
	removeUser: () => {},
	isLoading: true
}

export const UserContext = createContext<userContext>(defaultUserContext);

interface props {
	children: React.ReactNode
}

export function UserContextWrapper({ children }: props) {
	const { data, isLoading } = useGetProfile(true)
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			setUserState(data?.data)
			if (!data?.data && (router.pathname !== "/login" && router.pathname !== "/register")) {
				router.push("/login")
			}
			if (data?.data && (router.pathname === "/login" || router.pathname === "/register")) {
				router.push("/")
			}
		}
	}, [data, router, isLoading])

	const [user, setUserState] = useState<user | undefined>(undefined) 

	const setUser = (user: user | undefined) => {
		setUserState(user)
	}

	const removeUser = () => {
		setUserState(undefined)
	}

	if (isLoading) 
		return (
			<div>Loading...</div>
		)
		

  	return (
    		<UserContext.Provider value={{user, setUser, removeUser, isLoading}}>
      			{children}
    		</UserContext.Provider>
  	);
}

export function useUserContext() {
  return useContext(UserContext);
}
