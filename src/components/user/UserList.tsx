import { user } from "@/context/user"
import UserItem from "./UserItem"

interface props {
	users: user[]
	actionLabel: string
	onUserClick: (user: user) => void
}

const UserList = ({ users, actionLabel, onUserClick }: props) => {
	return (
		<div>
			{
				users.map(user => <UserItem key={user.id} user={user} actionLabel={actionLabel} onUserClick={onUserClick}/>)
			}
			
		</div>
	)
}

export default UserList
