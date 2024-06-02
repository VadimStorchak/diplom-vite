import {
    exportSolution,
    getAllTasksRequest, getSolutionsByTaskId, getTaskById, postSaveTask, postSaveTestCases, postSendSolution
} from "../service/service"

export const getAllTasks = () => async (dispatch) => {
    try {
        console.log(`GET ALL TASKS`)
        const response = await getAllTasksRequest();
        console.log(`response - ${response}`)
        if (response.status === 200) {
            const taskList = response.data;
            dispatch({type: 'GET_ALL_TASKS_SUCCESS', taskList});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getTask = (taskId) => async (dispatch) => {
    try {
        console.log(`GET TASK`)
        const response = await getTaskById(taskId);
        console.log(`response - ${response}`)
        if (response.status === 200) {
            const task = response.data;
            dispatch({type: 'GET_TASK', task: task});
        }
    } catch (err) {
        console.log(err);
    }
}

export const saveTask = (task) => async (dispatch) => {
    try {
        console.log(`SAVE TASKS`, task)
        const response = await postSaveTask(task);
        console.log(`response - ${response}`)

        if (response.status === 200) {
            const taskList = response.data;
            dispatch({type: 'GET_ALL_TASKS_SUCCESS', taskList});
        }
    } catch (err) {
        console.log(err);
    }
}

export const saveTestCases = (index, testCases) => async (dispatch) => {
    try {
        console.log(`SAVE TASKS`, testCases)
        const response = await postSaveTestCases(testCases);
        console.log(`response - ${response}`)

        if (response.status === 200) {
            dispatch({type: 'SAVE_ALL_TEST_CASES', testCases: response.data});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getAllSolutions = (taskId) => async (dispatch) => {
    try {
        console.log(`GET ALL SOLUTIONS`)
        const response = await getSolutionsByTaskId(taskId);

        if (response.status === 200) {
            const solutions = response.data;
            console.log(`GET ALL SOLUTIONS`, solutions)
            dispatch({type: 'GET_ALL_SOLUTIONS', solutions});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getSolutionExport = (solutionId) => async (dispatch) => {
    try {
        const response = await exportSolution(solutionId);
        const objectURL = URL.createObjectURL(response.data);
        dispatch({ type: 'DOWNLOAD_INDIVIDUAL_TASKS', url: objectURL });
    } catch (err) {
        console.error(err);
    }
}

export const sendSolution = (solutionForm) => async (dispatch) => {
    try {
        const response = await postSendSolution(solutionForm);
        if (response.status === 200) {
            const solutions = response.data;
            console.log(`SEND_SOLUTION`, solutions)
            dispatch({type: 'SEND_SOLUTION', solutions});
        }
    } catch (err) {
        console.error(err);
    }
}