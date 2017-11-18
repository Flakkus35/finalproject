import axios from "axios";

export default {
	createUser: function(userData) {
		console.log('before signup axios');
		return axios.post("/api/user/create", userData);
	},
	loginUser: function(loginData) {
		console.log('before login axios');
		console.log(loginData);
		return axios.put("/api/user/login", {
			username: loginData.username,
			password: loginData.password
		});
	}
}