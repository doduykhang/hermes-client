import { room } from "@/api/room"
import { user } from "@/context/user"

interface props {
	room: room
	user: user
	onRoomClick: (room: room) => void
}

const RoomItem = ({ room, user, onRoomClick }:props) => {
	
	const handleRoomClick = () => {
		onRoomClick(room)		
	}

	const getRoomName = (room: room) => {
		if (room.type === "GROUP")
			return room.name
		else {
			const member = room.members.find(member => member.id !== user.id)
			return member?.firstName + " " + member?.lastName
		}
	}
		
	return (
		<div onClick={handleRoomClick}>
			<p>
				{ room.type }
			</p>
			<p>
				{ getRoomName(room) }
			</p>
		</div>
	)
}

export default RoomItem
