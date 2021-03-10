import { Alert } from 'react-native';
import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
export default function getValidationError(error: ValidationError): Errors {
  const validationErrors: Errors = {};
  error.inner.forEach(err => {
    validationErrors[err.path] = err.message;
    console.log(validationErrors);
    Alert.alert(err.message);
  });

  return validationErrors;
}
