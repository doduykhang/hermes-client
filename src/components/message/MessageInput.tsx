import { useForm } from "react-hook-form";

export interface sendMessageData {
	content: string	
}

interface props { 
	disabled?: boolean
	onSendMessage: (data: sendMessageData) => void
}

const MessageInput = ({ disabled = false, onSendMessage }: props) => {
	const { register, handleSubmit } = useForm<sendMessageData>();
  	const onSubmit = (data: sendMessageData)  => onSendMessage(data);
   
  	return (
    		<form className="flex" onSubmit={handleSubmit(onSubmit)}>
      			<input className="border-2" {...register("content")} />
      			<button disabled={disabled} type="submit">Send</button>
    		</form>
  	)

}

export default MessageInput
