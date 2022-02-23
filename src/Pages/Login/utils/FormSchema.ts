import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup.string().email('Invalid email format').required(),
    password: yup.string().required(),
  })
  .required();
