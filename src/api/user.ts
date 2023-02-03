import { user } from "@/context/user";
import client from "@/util/axios"
import { useMutation, useQuery} from "react-query";

export const getProfile = () =>
  client
    .get<user>("/api/conversation/user/profile")

export const useGetProfile = (enabled: boolean = false) => {
	 return useQuery("getProfile", getProfile, {
  		refetchOnWindowFocus: false,
  		enabled,
		retry: false
	 });
}

interface searchUserNotInRoomParam {
	roomID: string
	email: string
}

export const searchUserNotInRoom = ({ roomID, email }:searchUserNotInRoomParam) =>
  client
    .get<user[]>(`/api/conversation/user/${roomID}/${email}`)

export const useSearchUserNotInRoom = (roomID: string, email: string) => {
	 return useQuery(["searchUserNotInRoom", roomID, email], () => searchUserNotInRoom({ roomID, email }), {
		enabled: !!roomID && !!email,
	 });
}

interface useAddUserToRoomProps {
	onSuccessCallback?: (data: string) => void
	onErrorCallback?: (error: unknown) => void
}

export const addUserToRoom = (data: {userID: string, roomID:string}) =>
  client
    .post<string>(`/api/conversation/room/group/add-user`, data)

export const useAddUserToRoom = (props?: useAddUserToRoomProps) => {
	 return useMutation(addUserToRoom, {
		onSuccess: (data) => {
			props?.onSuccessCallback && props.onSuccessCallback(data.data)
		}
	 });
}

export const removeUserFromRoom = (data: {userID: string, roomID:string}) =>
  client
    .delete<string>(`/api/conversation/room/group/remove-user`, { data })

export const useRemoveUserFromRoom = (props?: useAddUserToRoomProps) => {
	 return useMutation(removeUserFromRoom, {
		onSuccess: (data) => {
			props?.onSuccessCallback && props.onSuccessCallback(data.data)
		}
	 });
}


export const searchUsers = (email: string) =>
  client
    .get<user[]>(`/api/conversation/user/search/${email}`)

export const useSearchUser = (email: string) => {
	 return useQuery(["searchUser", email], () => searchUsers(email), {
		enabled: !!email,
	 });
}
