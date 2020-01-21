export const actionTypes = {
  CHANGE_INPUT_VALUE: "CHANGE_INPUT_VALUE",
  IS_LOADING: "IS_LOADING",
  SUMBIT_FORM: "SUMBIT_FORM"
};

export const changeInputValue = event => {
  event.persist();
  return {
    event: event,
    type: actionTypes.CHANGE_INPUT_VALUE
  };
};

export const isLoading = () => ({
  type: actionTypes.IS_LOADING
});

export const submitForm = files => ({
  files: files,
  type: actionTypes.SUMBIT_FORM
});

export default {
  changeInputValue: changeInputValue,
  submitForm: submitForm
};
