/*
 *state = { 
 *    action: 'default',
 *    history: {
 *        undo: [],
 *        redo: []
 *    },
 *    expectedState: undefined // the undo/ redo state that will be deleted from the array and stored in 
 *};
 */
const undoRedoReducer = (state = {undo:[], redo: [], currentAction: undefined}, action) => { 
    switch(action.type) {
        case "ADD":  
            state.action = action.type;
            state.history.redo = [];
            state.history.undo = addUndo(state, {id: action.data.id, action: action.type, data: action.data});
            return state; 
        case "TOGGLE":  
            state.action = action.type;
            state.history.redo = [];
            state.history.undo = addUndo(state, {id: action.data, action: action.type, data: undefined});
            return state;  
        case "UNDO": 
            const redoAction = state.history.undo.pop(); 
            if(state.history.redo.length > 7 ){
                state.history.redo.pop();
            }
            if(redoAction) {
                state.history.redo = [redoAction, ...state.history.redo ];
            }
            state.action = 'undo'; 
            state.expectedState = redoAction;
            return state;
        case "REDO": { 
            const undoAction = state.history.redo.shift(); 
            if(state.history.undo.length > 7 ){
                state.history.undo.pop();
            }
            if(undoAction) {
                state.history.undo = [...state.history.undo, undoAction ];
            }
            state.action = 'redo'; 
            state.expectedState = undoAction;
            return state;
        }
        default: { 
            state = { 
                action: 'default',
                history: {
                    undo: [],
                    redo: []
                },
                expectedState: undefined
            };
            return state;   
        }
    }
};

function addUndo(state, data) {
    var history = state.history.undo;
    if(history.length > 7) {
        history.shift();
    } 
    return [...history, data];
}
 

export default undoRedoReducer;