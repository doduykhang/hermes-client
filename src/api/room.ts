import { user } from "@/context/user";
import client from "@/util/axios"
import { useMutation, useQuery} from "react-query";

//get group room
export interface room {
	id: string
	name: string,
	type: "PRIVATE" | "GROUP"
	members: user[]
}

export const getGroupRoom = () =>
  client
    .get<room[]>("/api/conversation/room/group")

export const useGetGroupRoom = () => {
	 return useQuery("getGroupRoom", getGroupRoom);
}

//create room
const createRoom = (data: {name: string}) =>
  client
    .post("/api/conversation/room/group", data)

interface useCreateRoomProps {
	onSuccessCallback: (data: any) => void
	onErrorCallback: (error: unknown) => void
}

export const useCreateRoom = (props: useCreateRoomProps) => {
	 return useMutation(createRoom, {
		 onSuccess(data) {
			props.onSuccessCallback(data.data)	
		 },
		 onError(error) {
			props.onErrorCallback(error)
		 }
	 });
}

//get group room detail
export const getGroupRoomDetail = (id:string) =>
  client
    .get<room>(`/api/conversation/room/group/${id}`)

export const useGetGroupRoomDetail = (id: string) => {
	 return useQuery(
		["getGroupRoomDetail", id], 
		() => getGroupRoomDetail(id), 
		{
			enabled: !!id
		}
	 );
}

//get prive room
export const getPrivateRoom = () =>
  client
    .get<room[]>("/api/conversation/room/private")

export const useGetPrivateRoom = () => {
	 return useQuery("getPrivateRoom", getPrivateRoom);
}

//create private room
export const createPrivateRoom = (receiverID: string) =>
  client
    .post<room>("/api/conversation/room/private", {receiverID})

export const useCreatePrivateRoom = ({ onErrorCallback, onSuccessCallback }:useCreateRoomProps) => {
	 return useMutation("createPrivateRoom", createPrivateRoom, {
		onSuccess(data) {
			onSuccessCallback(data.data)	
		},
		onError(error) {
			onErrorCallback(error)
		}
	 });
}
