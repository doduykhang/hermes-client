import { room } from "@/api/room"
import { user } from "@/context/user"
import RoomItem from "./RoomItem"

interface props {
	rooms: room[]
	user: user
	onRoomClick: (room: room) => void
}

const RoomList = ({ rooms, onRoomClick, user }:props) => {
	return (
		<div>
			{rooms.map(room => {
				return (
					<RoomItem 
						key={room.id} 
						room={room} 
						user={user}
						onRoomClick={onRoomClick}
					/>
				)
			})}
		</div>
	)
}

export default RoomList
