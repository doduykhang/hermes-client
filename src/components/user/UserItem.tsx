import { user } from "@/context/user"

interface props {
	user: user
	actionLabel: string
	onUserClick: (user: user) => void
}

const UserItem = ({ user, actionLabel, onUserClick }: props) => {

	const handleUserClick = () => {
		onUserClick(user)
	}
	
	return (
		<div className="flex gap-1">
			<div>
				<p>{user.email}</p>
				<p>{user.firstName} {user.lastName}</p>
			</div>
			<button onClick={handleUserClick}>
				{actionLabel}
			</button>
		</div>
	)
}

export default UserItem 
