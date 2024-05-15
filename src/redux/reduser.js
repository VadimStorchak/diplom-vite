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
            taskTheme: "Тема 1",
            taskText: 'Текст ебаной задачи',
            taskInput: [
                {
                    name: 'rrrrr',
                    type: 'type_r'
                },
                {
                    name: '',
                    type: ''
                },
                {
                    name: '',
                    type: ''
                }
            ],
            codeExample: 'import react from "react";',
        },
        {
            id: 2,
            taskName: "Задача 2",
            taskTheme: "Тема 2",
            taskText: 'Текст ебаной задачи',
            taskInput: [
                {
                    name: 'rrrrr',
                    type: 'type_r'
                },
                {
                    name: '',
                    type: ''
                },
                {
                    name: '',
                    type: ''
                }
            ],
            codeExample: 'import react from "react";',
        },
        {
            id: 3,
            taskName: "Задача 3",
            taskTheme: "Тема 3",
            taskText: 'Текст ебаной задачи',
            taskInput: [
                {
                    name: 'rrrrr',
                    type: 'type_r'
                },
                {
                    name: '',
                    type: ''
                },
                {
                    name: '',
                    type: ''
                }
            ],
            codeExample: 'import react from "react";',
        },
        {
            id: 4,
            taskName: "Задача 4",
            taskTheme: "Тема 4",
            taskText: 'Текст ебаной задачи',
            taskInput: [
                {
                    name: 'rrrrr',
                    type: 'type_r'
                },
                {
                    name: '',
                    type: ''
                },
                {
                    name: '',
                    type: ''
                }
            ],
            codeExample: 'import react from "react";',
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