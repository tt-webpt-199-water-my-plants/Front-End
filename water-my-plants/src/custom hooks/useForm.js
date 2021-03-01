import useLocalStorage from './sessionStorage';

const useForm = (initialValue) => {
	const [values, setValues] = useLocalStorage('form', initialValue);

	const handleChanges = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const clearForm = (e) => {
		e.preventDefault();
		setValues(initialValue);
	};

	return [values, handleChanges, clearForm];
};

export default useForm;
