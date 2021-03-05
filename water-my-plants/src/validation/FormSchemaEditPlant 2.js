import * as Yup from 'yup';

const FormSchemaEditPlant = Yup.object().shape({
	nickname: Yup.string().required('Please enter a plant nickname').trim(),
	h20Frequency: Yup.number().typeError(
		'Please enter a valid number in days'
	),
	speciesName: Yup.string().required('Please enter a species name').trim(),
	image: Yup.string().trim(),
});

export default FormSchemaEditPlant;
