import { useForm } from "react-hook-form"

interface props {
	onSubmit: (query: string) => void
}

const SearchForm = ({ onSubmit }:props) => {
	const { register, handleSubmit } = useForm<{query: string}>();
  	const onSubmitData = (data: {query: string})  => onSubmit(data.query);
   
  	return (
    		<form className="flex" onSubmit={handleSubmit(onSubmitData)}>
			<p>Query</p>
      			<input className="border-2" {...register("query")} />
      			<button type="submit">Search</button>
    		</form>
  	)
}

export default SearchForm
