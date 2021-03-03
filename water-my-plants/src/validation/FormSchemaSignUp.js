import * as Yup from 'yup'

const phoneRegExp = /^(?:(?:(\s*\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\)?\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})?$/

const FormSchemaSignUp = Yup.object().shape({
    username: Yup
        .string()
        .trim()
        .required('Please enter your username'),
    password: Yup
        .string()
        .min(8, 'Please enter your password')
        .required('Please enter your password'),
    phoneNumber: Yup.string()
    .required('Please enter a valid phone number')
    .matches(phoneRegExp, 'Phone number is not valid'),
    // phoneNumber: Yup
    //     .number()
    //     .typeError('Must be a valid phone number')
    //     .required('Please enter your phone number')
})

export default FormSchemaSignUp