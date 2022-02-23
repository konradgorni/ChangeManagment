import * as yup from 'yup';

export const schema = yup.object({
  selectedWorker: yup
    .object()
    .shape({
      value: yup.object().shape({
        userId: yup.string(),
        Name: yup.string(),
        Surname: yup.string(),
      }),
      label: yup.string().required('This field is required.'),
    })
    .required('This field is required.'),
  selectedWorkPlace: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string().required('This field is required.'),
    })
    .required('This field is required.'),
});
