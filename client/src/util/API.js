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
	},
	addUrl: function(urlData) {
		console.log('before axios add url');
		console.log(urlData)
		return axios.put("/api/user/addurl", urlData);
	},
	findUrls: function(urlData) {
		console.log('before axios find urls');
		console.log(urlData);
		return axios.put("/api/user/find", urlData);
	},
	removeUrl: function(urlKey) {
		console.log('before axios remove url');
		console.log(urlKey);
		return axios.put("/api/user/delete", urlKey);
	}
}