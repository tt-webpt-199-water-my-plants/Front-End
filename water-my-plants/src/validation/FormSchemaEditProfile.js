import * as Yup from 'yup'

const phoneRegExp = /^(?:(?:(\s*\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\)?\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})?$/

const FormSchemaEditProfile = Yup.object().shape({
    username: Yup
        .string()
        .trim()
        .required('Please enter your username'),
    password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Please enter your new password'),
    phoneNumber: Yup.string()
    .required('Please enter a valid 10 digit phone number')
    .matches(phoneRegExp, 'Phone number is not valid')
})

export default FormSchemaEditProfile