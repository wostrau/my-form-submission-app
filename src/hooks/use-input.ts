import React from 'react';

const initialInputState = { value: '', isTouched: false };
type InputStateType = typeof initialInputState;

const inputStateReducer = (
  state: InputStateType,
  action: any
): InputStateType => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  return initialInputState;
};

interface useInputInterface {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}

const useInput = (
  validateValue: (arg: string) => boolean
): useInputInterface => {
  const [inputState, dispatch] = React.useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid: boolean = validateValue(inputState.value);
  const hasError: boolean = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (): void => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
