import axios from 'axios';

// ?? axiosWithAuth will get token upon correct login info
const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	console.log('axios token =====> ', token);

	return axios.create({
		headers: {
			authorization: token,
		},
		// ?? placeholder address
		baseURL: 'https://water-my-plants-api-t199.herokuapp.com/api',
	});
};

export default axiosWithAuth;
