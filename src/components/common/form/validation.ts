import * as yup from 'yup';

const phoneRegExp = /^\+\d{1,12}$/;
export const notEmailMatch: yup.TestFunction<string | undefined, Record<string, any>> = (
  value,
  context
) => {
  const emailPart = context?.options?.context?.user?.email?.split('@')[0];
  return !value || value.toLowerCase() !== emailPart?.toLowerCase();
};

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passworsRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,64}/;

export const validation = {
  email: yup.string().lowercase().matches(emailRegex, 'Не вірна email адреса.').required(),
  signUpPassword: yup.string().required('Пароль не може бути порожнім.'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Пароль від 8 до 64 символів, містить латинські літери, принаймні одну велику та маленьку літеру, цифру та спеціальний символ (@#$%^&+=!).'
    )
    .test('notEmailMatch', 'Пароль надто схожий на email', notEmailMatch)
    .required('Пароль не може бути порожнім.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароль не співпадає.')
    .required('Будь ласка, підтвердіть пароль.'),
  rememberMe: yup.boolean().required(),
  acceptedRules: yup
    .boolean()
    .oneOf([true], 'Ви повинні прийняти правила користування сайтом.')
    .required(),
  donate: yup
    .number()
    .typeError('Сума донату повинна бути більша за 0.')
    .positive('Сума донату повинна бути більша за 0.')
    .required(),
  bookInput: yup
    .string()
    .min(2, 'Мінімальна кількість символів 2')
    .required('Будь ласка, заповніть поле'),
  recommended: yup.boolean().required(),
  first_phone: yup
    .string()
    .max(13, 'Введіть коректний номер телефону')
    .test('starts-with-plus', 'Номер телефону має починатися з +', value => {
      if (!value) return false;
      if (!value.startsWith('+38'))
        throw new yup.ValidationError('Номер телефону має починатися з +38');
      return true;
    })
    .test('format-plus380', 'Номер телефону в форматі +380XXXXXXXXX', value => {
      if (!value) return false;
      if (value === '+') return true;
      return phoneRegExp.test(value);
    })
    .required('Введіть номер телефону '),
  second_phone: yup
    .string()
    .max(13, 'Введіть коректний номер телефону')
    .test('starts-with-plus', 'Номер телефону має починатися з +', value => {
      if (!value) return false;
      if (!value.startsWith('+38'))
        throw new yup.ValidationError('Номер телефону має починатися з +38');
      return true;
    })
    .test('format-plus380', 'Номер телефону в форматі +380XXXXXXXXX', value => {
      if (!value) return false;
      if (value === '+') return true;
      return phoneRegExp.test(value);
    }),
  id: yup.string(),
  partnerInput: yup.string().required('Будь ласка, заповніть поле'),
  url: yup
    .string()
    .required()
    .matches(/^https:\/\//, 'URL повинен починатися з https://'),
};
