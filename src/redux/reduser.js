const initState = {
    task: {
        taskTitle: "Пробная задача",
        taskText: "Lorem ipsum dolor sit amet, consetetur",
        taskInput: "Параметры ввода"
    },
    taskList: [
        {
            id: 1,
            taskName: "Задача 1",
            taskTheme: "Тема 1"
        },
        {
            id: 2,
            taskName: "Задача 2",
            taskTheme: "Тема 2"
        },
        {
            id: 3,
            taskName: "Задача 3",
            taskTheme: "Тема 3"
        },
        {
            id: 4,
            taskName: "Задача 4",
            taskTheme: "Тема 4"
        }
    ]
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
            return {
                ...state,
                taskList: action.taskList,
            }

        default:
            return state;
    }
}