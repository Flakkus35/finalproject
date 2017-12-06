import axios from "axios";

// Sends route request to route js files
export default {
	createUser: function(userData) {
		return axios.post("/api/user/create", userData);
	},
	loginUser: function(loginData) {
		return axios.put("/api/user/login", {
			username: loginData.username,
			password: loginData.password
		});
	},
	addUrl: function(urlData) {
		return axios.put("/api/user/addurl", urlData);
	},
	findUrls: function(urlData) {
		return axios.put("/api/user/find", urlData);
	},
	removeUrl: function(urlKey) {
		return axios.put("/api/user/delete", urlKey);
	},
	addCat: function(catData) {
		return axios.post("/api/user/addcat", catData);
	},
	removeCat: function(catData) {
		return axios.put("/api/user/remcat", catData);
	},
	changeCat: function(urlData) {
		return axios.put("/api/user/chgcat", urlData);
	},
	defaultCat: function(urlData) {
		return axios.put("/api/user/defcat", urlData);
	}
}