const initState = {
    task: {
        taskTitle: "Пробная задача",
        taskText: "Lorem ipsum dolor sit amet, consetetur",
        taskInput: "Параметры ввода"
    },
    taskList: [],
    solutions: [],
    testCases: [],
    individualTasksURL: '',
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPLOAD_FILE_SUCCESS':
            return {
                ...state,
                subject: {
                    ...state.subject,
                    isLoaded: true,
                    name: action.name
                }
            }

        case "GET_ALL_TASKS_SUCCESS" :
            console.log("action", action)
            return {
                ...state,
                taskList: action.taskList.tasks,
            }
        case "GET_TASK" :
            console.log("action", action)
            return {
                ...state,
                task: action.task,
            }
        case "SAVE_ALL_TEST_CASES" :
            console.log("action", action)
            return {
                ...state,
                testCases: action.testCases,
            }
        case "SAVE_TASKS_SUCCESS" :
            return {
                ...state,
                task: action.task,
            }

        case "GET_ALL_SOLUTIONS" :
            console.log("action", action)
            return {
                ...state,
                task: action.solutions,
            }

        case 'DOWNLOAD_INDIVIDUAL_TASKS': {
            return {
                ...state,
                individualTasksURL: action.url
            }
        }

        case 'SEND_SOLUTION': {
            return {
                ...state,
                individualTasksURL: action.url
            }
        }

        default:
            return state;
    }
}