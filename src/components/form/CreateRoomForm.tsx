import { useForm } from "react-hook-form"

interface props {
	onCreateRoom: (data: { name: string }) => void	
}

const CreateRoomForm = ({ onCreateRoom }:props) => {
	const { register, handleSubmit } = useForm<{name: string}>();
  	const onSubmit = (data: {name: string})  => onCreateRoom(data);
   
  	return (
    		<form className="flex flex-col max-w-fit" onSubmit={handleSubmit(onSubmit)}>
			<p>Name</p>
      			<input className="border-2" {...register("name")} />
      			<button type="submit">Create room</button>
    		</form>
  	)
}

export default CreateRoomForm
