import {
  GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_FAILURE, GET_DEFAULT_DIRECTORIES_SUCCESS,
  SET_DIRECTORY_SORT_OPTION
} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const getDefaultDirectoriesRequest = () => ({
  [CALL_API]: {
    types: [ GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_SUCCESS, GET_DEFAULT_DIRECTORIES_FAILURE ],
    endpoint: `directories`,
    method: 'GET'
  }
});

export const getDefaultDirectories = (values) => (dispatch, getState) =>  {
  return dispatch(getDefaultDirectoriesRequest(values));
};

export const setDirectorySortOption = (sortValue) => (dispatch, getState) =>  {
  return dispatch({
    type: SET_DIRECTORY_SORT_OPTION,
    sortBy: sortValue
  });
};
