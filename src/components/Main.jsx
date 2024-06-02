import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TaskTable from "./TaskTable/index.jsx";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import {Button, Divider, Fab, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {java} from "@codemirror/lang-java";
import {
    getAllTasks,
    getSolutionExport,
    getTask,
    saveTask,
    saveTestCases,
    sendSolution
} from "../redux/thunk.js";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

const EXTENSIONS = {
    javascript: [javascript()],
    python: [python()]
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const modalEditStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Main = () => {
    const dispatch = useDispatch();

    const [currentTab, setCurrentTab] = React.useState('Список задач');
    const [currentTask, setCurrentTask] = React.useState({});
    const [language, setLanguage] = React.useState("python");

    const [inputTypes, setInputTypes] = React.useState([]);
    const [outputTypes, setOutputTypes] = React.useState([]);
    const [testCases, setTestCases] = React.useState([]);

    const [openCheckModal, setOpenCheckModal] = React.useState(false);
    const [isEditTypeParams, setIsEditTypeParams] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openSendSolutionModal, setOpenSendSolutionModal] = React.useState(false);

    const handleOpenCheckModal = () => setOpenCheckModal(true);
    const handleCloseCheckModal = () => setOpenCheckModal(false);
    const handleOpenSendSolutionModal = () => setOpenSendSolutionModal(true);
    const handleCloseSendSolutionModal = () => setOpenSendSolutionModal(false);
    const handleOpenEditModal = () => {
        setTestCases(currentTask.testCases)
        setOpenEditModal(true);
    }
    const handleCloseEditModal = () => {

        currentTask.taskInput = inputTypes;
        currentTask.taskOutput = outputTypes;
        currentTask.testCases = testCases;
        dispatch(saveTask(currentTask));
        dispatch(saveTestCases(currentTask.id, testCases));
        // currentTask.testCases = stateTestCases
        setOpenEditModal(false);
    }
    const individualTasksURL = useSelector(state => state.individualTasksURL);
    const task = useSelector(state => state.task);
    const [sendSolutionForm, setSendSolutionForm] = React.useState({taskId: '', solution: '', language: 'python'});


    const taskList = useSelector(state => state.taskList)
    // const solutions = useSelector(state => state.solutions)

    useEffect(() => {
        dispatch(getAllTasks())
        if (individualTasksURL) {
            const link = document.createElement('a');
            link.href = individualTasksURL;
            link.setAttribute('download', 'Отчёт о решении.docx'); //or any other extension
            document.body.appendChild(link);
            link.click();
            dispatch({type: 'DOWNLOAD_INDIVIDUAL_TASKS', url: ''});
        }
    }, [individualTasksURL])

    const handleTableRowClick = (task) => () => {
        console.log('clicked task', task)
        setCurrentTask(task)

        setInputTypes(task.taskInput)
        setOutputTypes(task.taskOutput)
        setTestCases(task.testCases)


        setSendSolutionForm(prevState => ({...prevState, taskId: task.id}));
        setCurrentTab('Текущая задача')
    }

    const onChangeTab = (_, value) => {
        setCurrentTab(value)
    }

    const onChange = (action, data) => {
        setSendSolutionForm(prevState => ({...prevState, solution: action}));
    };

    const handleChangeSelectLang = (event) => {
        setLanguage(event.target.value)
        setSendSolutionForm(prevState => ({...prevState, language: event.target.value}));
    };

    const handleAddInputRow = () => {
        setInputTypes([...inputTypes, {name: 'newParam', type: 'String'}]);
        setIsEditTypeParams(true)
    };

    const handleAddOutputRow = () => {
        setOutputTypes([...outputTypes, {name: 'newParam', type: 'String'}]);
        setIsEditTypeParams(true)
    };

    const handleAddTestCaseRow = (taskId, inputTemplate, outputTemplate) => {
        setTestCases([...testCases, {taskId:taskId, jsonInput: inputTemplate, jsonOutput: outputTemplate}]);
    };

    const deleteInputTypeByIndex = (index) => {
        setInputTypes(prevState => prevState.filter((_, i) => i !== index));
        setIsEditTypeParams(true)
    };

    const deleteOutputTypeByIndex = (index) => {
        setInputTypes(prevState => prevState.filter((_, i) => i !== index));
        setIsEditTypeParams(true)
    };

    const deleteTestCaseByIndex = (index) => {
        setTestCases(prevState => prevState.filter((_, i) => i !== index));
    };

    console.log("currentTab", currentTab)
    console.log("taskList", taskList)
    console.log("Object.entries(EXTENSIONS)", Object.entries(EXTENSIONS))

    const handleTableRowClickSolution = (solution) => () => {
        console.log('clicked solution', solution)
        dispatch(getSolutionExport(solution.id))
    }


    const sendSolutionOnClick = (e, solutionForm) => {
        solutionForm.studentFio = 'Студент из интерфейса'
        console.log("sendSolutionOnClick", solutionForm);
        dispatch(sendSolution(solutionForm))
        dispatch(getTask(currentTask.id));

        setCurrentTask(task)
        handleOpenSendSolutionModal()
    }

    return (
        <>
            <Box sx={{position: 'absolute', top: 15, right: 0, left: 0}}>
                <TabContext value={currentTab}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList
                            onChange={onChangeTab}
                            aria-label="basic tabs example"
                        >
                            <Tab label="Список задач" value={"Список задач"}/>
                            <Tab label="Текущая задача" value={"Текущая задача"}/>
                        </TabList>
                    </Box>
                    <TabPanel value={"Список задач"}>
                        <TaskTable taskList={taskList} handleTableRowClick={handleTableRowClick}/>
                    </TabPanel>

                    <TabPanel value={"Текущая задача"}>
                        <Typography fontWeight={"bold"} fontSize={25}> Номер
                            задачи #{currentTask.id ?? 'Не удалось открыть задачу'}</Typography>
                        <Typography
                            fontWeight={"bold"}> Название: {currentTask.name ?? 'Не удалось открыть задачу'}</Typography>
                        <p>{currentTask.description ?? 'Не удалось открыть задачу'}</p>

                        {/*Иконка редактировани*/}
                        <Fab color="secondary" aria-label="add" style={{backgroundColor: "lightcoral"}}
                             sx={{position: 'absolute', top: 60, right: 10}} onClick={(e) => handleOpenEditModal()}>
                            <svg style={{fontSize: '1.5rem', width: '1em', height: '1em'}}
                                 className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                                 aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon">
                                <path
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
                            </svg>
                        </Fab>


                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            label="Язык программирования"
                            onChange={handleChangeSelectLang}
                            style={{marginBottom: 10}}
                        >
                            {Object.entries(EXTENSIONS).map(([lang, _]) => (
                                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                            ))}
                        </Select>

                        <CodeMirror
                            className={"codemirror-editor"}
                            height="400px"
                            width="100%"
                            extensions={[EXTENSIONS[language]]}
                            theme={"dark"}
                            onChange={onChange}
                            basicSetup={{autocompletion: true}}
                            value={currentTask.codeExample?.[language]}
                        />
                        <Button variant="contained" style={{marginTop: 10}}
                                onClick={(e) => sendSolutionOnClick(e, sendSolutionForm)}>Отправить</Button>
                        <Divider sx={{padding: '10px 0'}}/>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Студент</TableCell>
                                    <TableCell>Результат</TableCell>
                                    <TableCell>Статус обработки</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                currentTask?.solutions?.map((solution, index) => (
                                    <TableRow
                                        key={solution.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                        onClick={handleTableRowClickSolution(solution)}
                                    >
                                        <TableCell component="th" scope="row">
                                            {solution.userFio}
                                        </TableCell>
                                        <TableCell>
                                            {(solution.isSuccessfully === true) ? "Сдал" : "Провален"}
                                        </TableCell>
                                        <TableCell>
                                            {solution.status}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </Table>
                    </TabPanel>
                </TabContext>
                <Fab variant="extended" color="primary" aria-label="add" sx={{position: 'absolute', top: -5, right: 10}}
                     onClick={handleOpenCheckModal}>
                    Проверить отчёт
                </Fab>

                <Modal open={openSendSolutionModal}
                       onClose={handleCloseSendSolutionModal}

                       aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Задача Успешно отправлена на проверку, перезагрузите страницу
                        </Typography>
                    </Box>
                </Modal>

                <Modal
                    open={openCheckModal}
                    onClose={handleCloseCheckModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Задача #63
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Работу выполнил студент с секретом - <div
                            style={{fontWeight: 'bold'}}>9498d8e8-1d54-44f3-be3d-2198c89acced</div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Затрачено попыток - 3
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Пройдено - 12/12 тестов
                        </Typography>
                    </Box>
                </Modal>

                <Modal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalEditStyle}
                    >
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Задача #{currentTask.id}
                        </Typography>
                        <TextField
                            id="standard-textarea"
                            label="Название задачи"
                            fullWidth={true}
                            placeholder={currentTask.name}
                            variant="standard"
                            defaultValue={currentTask.name}
                            margin={"normal"}
                            onChange={(event) => {
                                currentTask.name = event.target.value;
                            }}
                        />
                        <TextField
                            id="standard-textarea"
                            label="Описание"
                            fullWidth={true}

                            placeholder={currentTask.description}
                            defaultValue={currentTask.description}
                            margin={"normal"}

                            multiline
                            variant="standard"
                            onChange={(event) => {
                                currentTask.description = event.target.value;
                            }}
                        />
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: 4}}>
                            Тип входящих параметров
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Тип</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                inputTypes?.map((inputType, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                            onDoubleClick={(e) => deleteInputTypeByIndex(index)}
                                        >
                                            <TableCell>
                                                <TextField
                                                    label="Multiline Placeholder"
                                                    placeholder="Имя параметра"
                                                    variant="standard"
                                                    defaultValue={inputType.name}
                                                    onChange={(event) => {
                                                        inputType.name = event.target.value;
                                                        setIsEditTypeParams(true)
                                                    }}
                                                    scope="row">
                                                    {inputType.name}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={inputType.type ?? "String"}
                                                    label="Тип"
                                                    defaultValue={inputType.type}
                                                    onChange={(event) => {
                                                        inputType.type = event.target.value;
                                                        setIsEditTypeParams(true)
                                                    }}
                                                >
                                                    <MenuItem value='String'>String</MenuItem>
                                                    <MenuItem value='Number'>Number</MenuItem>
                                                    <MenuItem value='Float'>Float</MenuItem>
                                                    <MenuItem value='Array'>Array</MenuItem>
                                                    <MenuItem value='Boolean'>Boolean</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                            <Button variant="contained" color="primary" onClick={handleAddInputRow} sx={{marginTop: 2}}>Добавить
                                строку</Button>
                        </Table>

                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: 4}}>
                            Тип исходящих параметров
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Тип</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                outputTypes?.map((outputType, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                            onDoubleClick={(e) => deleteOutputTypeByIndex(index)}

                                        >
                                            <TableCell>
                                                <TextField
                                                    label="Multiline Placeholder"
                                                    placeholder="Имя параметра"
                                                    variant="standard"
                                                    defaultValue={outputType.name}
                                                    onChange={(event) => {
                                                        outputType.name = event.target.value;
                                                        setIsEditTypeParams(true)
                                                    }}
                                                    scope="row">
                                                    {outputType.name}
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={outputType.type ?? "String"}
                                                    label="Тип"
                                                    defaultValue={outputType.type}
                                                    onChange={(event) => {
                                                        outputType.type = event.target.value;
                                                        setIsEditTypeParams(true)
                                                    }}
                                                >
                                                    <MenuItem value='String'>String</MenuItem>
                                                    <MenuItem value='Number'>Number</MenuItem>
                                                    <MenuItem value='Float'>Float</MenuItem>
                                                    <MenuItem value='Array'>Array</MenuItem>
                                                    <MenuItem value='Boolean'>Boolean</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                            <Button variant="contained" color="primary" onClick={handleAddOutputRow}
                                    sx={{marginTop: 2}}>Добавить
                                строку</Button>
                        </Table>

                        {!isEditTypeParams ? <Box sx={{flexGrow: 1}}>


                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: 4}}>
                                    Тестовые данные
                                </Typography>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Входные</TableCell>
                                            <TableCell>Выходные</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        testCases?.map((testCase, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                                    onDoubleClick={(e) => deleteTestCaseByIndex(index)}
                                                >
                                                    <TableCell>
                                                        <TextField
                                                            label="Входные данные"
                                                            placeholder="Имя параметра"
                                                            variant="standard"
                                                            fullWidth={true}
                                                            multiline
                                                            defaultValue={testCase.jsonInput}
                                                            onChange={(event) => {
                                                                testCase.jsonInput = event.target.value;
                                                            }}
                                                            scope="row">
                                                            {testCase.jsonInput}
                                                        </TextField>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Multiline Placeholder"
                                                            placeholder="Имя параметра"
                                                            variant="standard"
                                                            fullWidth={true}
                                                            multiline
                                                            defaultValue={testCase.jsonOutput}
                                                            onChange={(event) => {
                                                                testCase.jsonOutput = event.target.value;
                                                            }}
                                                            scope="row">
                                                            {testCase.jsonOutput}
                                                        </TextField>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    }
                                    <Button variant="contained" color="primary"
                                            onClick={(e) => handleAddTestCaseRow(currentTask.id, currentTask.inputTemplate, currentTask.outputTemplate)}
                                            sx={{marginTop: 2}}>Добавить
                                        строку</Button>
                                </Table>
                            </Box> :
                            <Typography>
                                Невозможно редактировать тестовые кейсы после параметров. Сохраните текущие параметры,
                                а затем изменяйте тестовые данные
                            </Typography>
                        }
                        <Button variant="contained" color="secondary" onClick={handleCloseEditModal}
                                sx={{marginTop: 2, left: "80%"}}>Сохранить</Button>
                    </Box>
                </Modal>
            </Box>
        </>
    );
};

export default Main;
