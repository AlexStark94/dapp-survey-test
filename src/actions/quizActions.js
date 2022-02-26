export const UPLOAD_JSON = "@actions/upload-json";
export const DELETE_JSON = "@actions/delete-json";
export const SET_ANSWERS = "@actions/set-answers";
export const SET_CONTRACT = "@actions/set-contract";
export const SET_BALANCE = "@actions/set-balance";

export function uploadJson(fileData) {
  return (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_JSON,
        payload: fileData,
      });
    } catch (error) {
      dispatch({
        type: DELETE_JSON,
      });
      throw error;
    }
  };
}

export function setAnswers(answers) {
  return (dispatch) => {
    dispatch({
      type: SET_ANSWERS,
      payload: answers,
    });
  };
}

export function setContract(contract) {
  return (dispatch) => {
    dispatch({
      type: SET_CONTRACT,
      payload: contract,
    });
  };
}

export function setBalance(balance) {
  return (dispatch) => {
    dispatch({
      type: SET_BALANCE,
      payload: balance,
    });
  };
}
