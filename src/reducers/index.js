import undoRedoReducer from './undo-redo-reducer'; 
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    undoRedo: undoRedoReducer
});

export default allReducers;