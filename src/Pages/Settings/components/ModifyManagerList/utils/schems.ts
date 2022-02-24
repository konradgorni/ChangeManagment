import * as yup from 'yup';

export const schemaAddManager = yup.object().shape({
  userData: yup
    .object()
    .shape({
      value: yup.string().required('select options'),
      label: yup.string(),
    })
    .required('This field is required.'),
});
export const schemaDeleteManager = yup.object().shape({
  managerName: yup
    .object()
    .shape({
      value: yup.string().required('select options'),
      label: yup.string(),
    })
    .required('This field is required.'),
});
