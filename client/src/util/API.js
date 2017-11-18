import axios from "axios";

export default {
	createUser: function(userData) {
		console.log('before axios');
		return axios.post("/api/user/create", userData);
	}
}