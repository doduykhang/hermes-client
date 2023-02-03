import { message, useGetRoomMessage } from "@/api/message"
import {  room, useCreatePrivateRoom, useCreateRoom, useGetGroupRoom, useGetGroupRoomDetail, useGetPrivateRoom } from "@/api/room"
import { useAddUserToRoom, useRemoveUserFromRoom, useSearchUser, useSearchUserNotInRoom } from "@/api/user"
import CreateRoomForm from "@/components/form/CreateRoomForm"
import SearchForm from "@/components/form/SearchForm"
import { sendMessageData } from "@/components/message/MessageInput"
import RoomBoard from "@/components/room/RoomBoard"
import RoomList from "@/components/room/RoomList"
import UserList from "@/components/user/UserList"
import { user, useUserContext } from "@/context/user"
import { useEffect, useState } from "react"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"


export default function Home() {
	const { user } = useUserContext()

	const rooms = useGetGroupRoom()

	const [selectedRoom, setSelectedRoom] = useState("")
	const roomDetail = useGetGroupRoomDetail(selectedRoom) 

	const message = useGetRoomMessage(selectedRoom) 
	const [roomMessages, setRoomMessages] = useState<message[]>([])

	const [socketUrl, setSocketUrl] = useState("");
	const [shouldConnect, setShouldConnect] = useState(false)
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<any>(socketUrl, {}, shouldConnect);

	const [searchQuery, setSearchQuery] = useState("")
	const searchUserNotInRoom = useSearchUserNotInRoom(selectedRoom, searchQuery) 

	const [searchUserQuery, setSearchUserQuery] = useState("")
	const searchUser = useSearchUser(searchUserQuery)

	const getPrivateRoom = useGetPrivateRoom()

	const createPrivateRoom = useCreatePrivateRoom({
		onSuccessCallback: () => { getPrivateRoom.refetch() },
		onErrorCallback: () => {}
	})

	const handleAddUserSuccess = () => {
		roomDetail.refetch()
		searchUserNotInRoom.refetch()
	}

	const addUser = useAddUserToRoom({onSuccessCallback: handleAddUserSuccess})
	const removeUser = useRemoveUserFromRoom({onSuccessCallback: handleAddUserSuccess})

	useEffect(() => {
		if (lastJsonMessage) {
			setRoomMessages((prev) => [...prev, lastJsonMessage])
		}
	}, [lastJsonMessage])

	useEffect(() => {
		if(message.data?.data) {
			setRoomMessages(message.data.data.slice().reverse())
		} 
	}, [message.data?.data])

	const handleRoomCreateSuccess = () => {
		rooms.refetch()
	}

	const handleSearchUserNotInRoom = (query: string) => {
		setSearchQuery(query)
	}

	const handleSearchUser = (query: string) => {
		setSearchUserQuery(query)
	}

	const handleRemoveUser = (user: user) => {	
		removeUser.mutate({userID: user.id, roomID: selectedRoom})
	}

	const handleAddUser = (user: user) => {	
		addUser.mutate({userID: user.id, roomID: selectedRoom})
	}

	const handleCreatePrivateRoom = (user: user) => {
		createPrivateRoom.mutate(user.id)
	}

	const handleRoomClick = (room: room) => {
		setShouldConnect(true)
		const baseURL = process.env.NEXT_PUBLIC_WS_URL
		console.log("baseUrl", baseURL)
		setSocketUrl(`${baseURL}/api/chat/connect/${room.id}`)
		setSelectedRoom(room.id)	
	}

	const handleSendMessage = (data: sendMessageData) => {
		sendJsonMessage({
			content: data.content,
			sender: {
				id: user?.id,
				firstName: user?.firstName,
				lastName: user?.lastName,
				avatar: user?.avatar
			}
		})
	}

	const { mutate } = useCreateRoom({
		onSuccessCallback: handleRoomCreateSuccess,
		onErrorCallback: () => {}
	})
	
	if (!user) 
		return (
			<div>
				Error
			</div>
		)

  	return (
    		<div className="flex flex-col h-screen">
			<div>
				<SearchForm onSubmit={handleSearchUser} />
				<UserList users={searchUser.data?.data || []} actionLabel="Add" onUserClick={handleCreatePrivateRoom}/>
			</div>
			<div className="flex h-full">
				<div className="ring">
					<p> Welcome {user.email} </p>
					<CreateRoomForm onCreateRoom={mutate}/>
					Rooms
					<RoomList
						user={user}
						rooms={[...(rooms.data?.data || []), ...(getPrivateRoom.data?.data || [])]}  
						onRoomClick={handleRoomClick}
					/>
				</div>
				<div className="w-full h-full ring overflow-auto">
					<RoomBoard 
						room={roomDetail.data?.data} 
						messages={roomMessages}
						onSendMessage={handleSendMessage}
						sendDisabled={!readyState}
						user={user}
					/>
				</div>
				{roomDetail.data?.data.type === "GROUP" && 
					<div>
						<SearchForm onSubmit={handleSearchUserNotInRoom} />
						<UserList users={searchUserNotInRoom.data?.data || []} actionLabel="Add" onUserClick={handleAddUser}/>
						Members
						<UserList users={roomDetail.data?.data.members || []} actionLabel="Remove" onUserClick={handleRemoveUser}/>
					</div>
				}
			</div>
    		</div>
  	)
}
