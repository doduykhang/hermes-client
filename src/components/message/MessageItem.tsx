import { message } from "@/api/message"
import { user } from "@/context/user"

interface props{
	message: message
	user?: user
}

const MessageItem = ({ message, user }: props) => {
	return (
		<div className={`${user?.id === message.sender.id ? "place-self-end" : ""}`}>
			<p>{ message.sender.lastName } { message.sender.firstName }</p>
			<p>{ message.content }</p>
			<p>{ message.createdAt.toString() }</p>
		</div>
	)
}

export default MessageItem
