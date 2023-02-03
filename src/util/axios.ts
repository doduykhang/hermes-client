import axios from "axios";

const host = process.env.NEXT_PUBLIC_API_URL
console.log("host", host)

const instance = axios.create({
  	baseURL: host,
	withCredentials: true
});


export default instance;
