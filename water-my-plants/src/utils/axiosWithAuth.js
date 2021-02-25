import axios from 'axios';

// ?? axiosWithAuth will get token upon correct login info
const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		headers: {
			authorization: token,
		},
		// ?? placeholder address
		baseURL: 'http://localhost:5000/api',
	});
};

export default axiosWithAuth;
