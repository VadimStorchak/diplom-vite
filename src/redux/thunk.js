import {
    getAllTasksRequest
} from "../service/service"

export const getAllTasks = () => async (dispatch) => {
    try {
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