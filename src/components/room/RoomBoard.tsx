import { message } from "@/api/message"
import { room } from "@/api/room"
import { user } from "@/context/user"
import { useEffect, useRef } from "react"
import MessageInput, { sendMessageData } from "../message/MessageInput"
import MessageList from "../message/MessageList"

interface props{
	room?: room	
	messages: message[]
	sendDisabled: boolean
	onSendMessage: (data: sendMessageData) => void
	user?: user
}

const RoomBoard = ({ user, room, messages, sendDisabled, onSendMessage }:props) => {
	const bottomRef = useRef<any>(null);

	useEffect(() => {
    		bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  	}, [messages]);

	const getRoomName = (room?: room) => {
		if (!room) {
			return ""
		}
		if (room.type === "GROUP")
			return room.name
		else {
			const member = room.members.find(member => member.id !== user?.id)
			return member?.firstName + " " + member?.lastName
		}
	}

	return (
		<div className="flex flex-col h-full">
			<p>{getRoomName(room)}</p>
			<div className="h-full overflow-auto">
				<div className="h-full overflow-auto">
					<MessageList user={user} messages={messages} />
				</div>
				<div ref={bottomRef} />
			</div>
			<MessageInput disabled={sendDisabled} onSendMessage={onSendMessage} />
		</div>
	)
}

export default RoomBoard
