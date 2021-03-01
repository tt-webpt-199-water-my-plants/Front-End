import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key));
		}
		localStorage.setItem(key, initialValue);
		return initialValue;
	});

	const setValue = (value) => {
		setStoredValue(value);
		localStorage.setItem(key, value);
	};
	return [storedValue, setValue];
};

export default useLocalStorage;
