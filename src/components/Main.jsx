import React from 'react';
import { useSelector } from "react-redux";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TaskTable from "./TaskTable/index.jsx";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Divider, MenuItem, Select } from "@mui/material";
import {cpp} from "@codemirror/lang-cpp";
import {java} from "@codemirror/lang-java";

const EXTENSIONS = {
    python: [python()],
    javascript: [javascript()],
    typescript: [javascript()],
    cpp: [cpp()],
    'c++': [cpp()],
    java: [java()],
};

const Main = () => {
    const [currentTab, setCurrentTab] = React.useState('Список задач');
    const [currentTask, setCurrentTask] = React.useState({});
    const [language, setLanguage] = React.useState("python");

    const taskList = useSelector(state => state.taskList)

    const handleTableRowClick = (task) => () => {
        setCurrentTask(task)
        setCurrentTab('Текущая задача')
    }

    const onChangeTab = (_, value) => {
        setCurrentTab(value)
    }

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const handleChangeSelectLang = (event) => {
        setLanguage(event.target.value)
    };

    console.log("currentTab", currentTab)
    console.log("taskList", taskList)
    console.log("Object.entries(EXTENSIONS)", Object.entries(EXTENSIONS))

    return (
        <>
            <Box sx={{ position: 'absolute', top: 15, right: 0, left: 0 }}>
            <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={onChangeTab}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Список задач" value={"Список задач"} />
                        <Tab label="Текущая задача" value={"Текущая задача"} />
                    </TabList>
                </Box>
                <TabPanel value={"Список задач"}>
                    <TaskTable taskList={taskList} handleTableRowClick={handleTableRowClick}/>
                </TabPanel>

                <TabPanel value={"Текущая задача"}>
                    <p>{currentTask.taskText ?? 'Не удалось открыть задачу'}</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language}
                        label="Язык программирования"
                        onChange={handleChangeSelectLang}
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
                        value={currentTask.codeExample}
                    />
                    <Button variant="contained">Отправить</Button>
                    <Divider sx={{ padding: '10px 0' }} />

                </TabPanel>
            </TabContext>
            </Box>
        </>
    );
};

export default Main;
