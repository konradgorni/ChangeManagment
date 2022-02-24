import * as yup from 'yup';

export const schema = yup
  .object({
    workPlaceName: yup.string().required().min(4),
  })
  .required();
