import axios from "axios";

const baseUrl = 'http://localhost:8077';

// ПОЛУЧЕНИЕ ВСЕХ ЗАДАЧ
export const getAllTasksRequest = async () => {
    return await axios.get(`${baseUrl}/api/task/all`);
}