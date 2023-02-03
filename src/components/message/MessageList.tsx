import { message } from "@/api/message"
import { user } from "@/context/user"
import MessageItem from "./MessageItem"

interface props{
	messages: message[]
	user?: user
}

const MessageList = ({ messages, user }: props) => {

	return (
		<div className="flex flex-col ">
			{
				messages.map((message) => {
					return (
						<MessageItem user={user} key={message.id} message={message}/>
					)
				})
			}
		</div>
	)
}

export default MessageList
