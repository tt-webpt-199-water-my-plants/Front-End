import * as Yup from 'yup'

const FormSchemaLogin = Yup.object().shape({
    username: Yup
        .string()
        .trim()
        .required('Please enter your username'),
    password: Yup
        .string()
        .required('Please enter your password')
})

export default FormSchemaLogin