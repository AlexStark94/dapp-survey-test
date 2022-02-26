export const UPLOAD_JSON = "@actions/upload-json";
export const DELETE_JSON = "@actions/delete-json";
export const SET_ANSWERS = "@actions/set-answers";
export const SET_CONTRACT = "@actions/set-contract";

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
    try {
      dispatch({
        type: SET_ANSWERS,
        payload: answers,
      });
    } catch (error) {
      throw error;
    }
  };
}

export function setContract(contract) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_CONTRACT,
        payload: contract,
      });
    } catch (error) {
      throw error;
    }
  };
}
