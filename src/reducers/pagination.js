//Derived from: https://github.com/reactjs/redux/blob/master/examples/real-world/src/reducers/paginate.js
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  canFetchMore: true,
  pageCount: 1,
  ids: []
};

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  const [ requestType, successType, failureType, refreshType ] = types;

  const updatePagination = (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        const result = typeof action.response.result === "object" ? action.response.result : [action.response.result];

        let newIds;
        if(typeof action.response.result === "object"){
          newIds = union(state.ids, result);
        }else{
          newIds = union(result, state.ids);
        }

        return {
          ...state,
          isFetching: false,
          canFetchMore: result.length > 0,
          ids: newIds,
          pageCount: state.pageCount + 1
        }
      case failureType:
        return {
          ...state,
          canFetchMore: false,
          isFetching: false
        }
      case refreshType:
        return {
          ...state,
          canFetchMore: true,
          ids: [],
          pageCount: 1
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
      case refreshType:
        const key = mapActionToKey(action) + '';
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return { ...state,
          [key]: updatePagination(state[key], action)
        }
      default:
        return state
    }
  }
}

export default paginate
