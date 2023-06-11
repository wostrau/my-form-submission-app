import React from 'react';

interface useInputInterface {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}

type validateValueFn = (arg: string) => boolean;

const useInput = (validateValue: validateValueFn): useInputInterface => {
  const [enteredValue, setEnteredValue] = React.useState<string>('');
  const [isTouched, setIsTouched] = React.useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (): void => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
