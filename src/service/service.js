import axios from "axios";

const baseUrl = 'http://localhost:8077';

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const getAllTasksRequest = async () => {
    return await axios.get(`${baseUrl}/api/task/all`);
}
// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ

export const getTaskById = async (taskId) => {
    return await axios.get(`${baseUrl}/api/task/` + taskId);
}

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const postSaveTask = async (task) => {
    return await axios.post(`${baseUrl}/api/task/save`, task);
}

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const postSaveTestCases = async (task) => {
    return await axios.post(`${baseUrl}/api/test-case/saveAll`, task);
}

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const getSolutionsByTaskId = async (taskId) => {
    return await axios.get(`${baseUrl}/api/solution/` + taskId);
}

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const exportSolution = async (solutionId) => {
    return await axios.post(`${baseUrl}/api/solution/export/` + solutionId, {fio: "Тестовый студент"}, {
        responseType: 'blob'
    });
}

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const postSendSolution = async (solutionForm) => {
    return await axios.post(`${baseUrl}/api/solution/task/send`, solutionForm);
}
