import produce from 'immer';
import types from './types';

const INITIAL_STATE = {
    customer: {},
    session: {
        userID: null,
        isAuthenticated: false
    }
};

function user(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.SET_CUSTOMER: 
            return produce(state, (draft) => {
                draft.customer = action.customer;
            });
        case types.SET_LOGGED_ID:
            return produce(state, (draft) => {
                draft.session = action.session;
            });
        case types.RESET_SESSION:
            return INITIAL_STATE;
        default: 
            return state;
        
    }
}

export default user;