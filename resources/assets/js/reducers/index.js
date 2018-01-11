import {combineReducers} from 'redux';
import codeReducer from './code-reducer';
import taskReducer from './task-reducer';
import logReducer from './log-reducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    pseudoCode: codeReducer,
    tasks: taskReducer,
    log: logReducer
});

export default allReducers