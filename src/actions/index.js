export const undo = (data = undefined) => {
    return {
        type: "UNDO",
        data: data
    }
};

export const redo = (data = undefined) => {
    return {
        type: "REDO",
        data: data
    }
};

export const add = (data = undefined) => {
    return {
        type: "ADD",
        data: data
    }
};

export const toggle = (data = undefined) => {
    return {
        type: "TOGGLE",
        data: data
    }
};
