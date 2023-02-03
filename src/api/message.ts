import client from "@/util/axios"
import { useQuery } from "react-query"

//get group room
interface sender {
	id: string
	firstName: string,
	lastName: string,
	avatar: string
}

export interface message {
	id: string
	content: string
	createdAt: Date
	sender: sender
}

export const getRoomMessage = (roomID: string) =>
  client
    .get<message[]>(`/api/conversation/message/group/${roomID}`)

export const useGetRoomMessage = (roomID: string) => {
	 return useQuery(
		["getRoomMessage", roomID], 
		() => getRoomMessage(roomID),
		{
			enabled: !!roomID,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false
		}
	 );
}
