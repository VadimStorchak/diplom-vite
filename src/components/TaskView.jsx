import CodeMirror from '@uiw/react-codemirror';
import React, {useEffect, useState} from 'react';
import {javascript} from '@codemirror/lang-javascript';
import "../css/task-view.css"
import {java} from '@codemirror/lang-java';
import {python} from '@codemirror/lang-python';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import AceEditor from "react-ace";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TaskList from "./TaskList.jsx";
import Editor from "@monaco-editor/react";
import CodeEditorWindow from "./CodeEditorWindow.jsx";
import {languageOptions} from "./constants/languageOptions.js";

const style = {
    width: "400px",
    height: '500px',
    alignContent: 'center',
    bgcolor: 'background.paper',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('3');
    const [code, setCode] = useState("javascriptDefault");
    const [language, setLanguage] = useState(languageOptions[0]);
    const [theme, setTheme] = useState("cobalt");


    const task = useSelector(state => state.task);

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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        // dispatch(getAllTasks());
    }, []);

    return (
        <Box sx={style}>
            <Typography variant="h6" component="h2">{task.taskTitle}</Typography>
            <Typography className={"task-text"}>{task.taskText}</Typography>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList aria-label="lab API tabs example" onChange={handleChange}>
                        <Tab label="CodeMirror" value="3"/>
                        <Tab label="Ace Code" value="4"/>
                        <Tab label="Monaco" value="5"/>
                    </TabList>
                </Box>
                <TabPanel value="3" style={{width: '100%', height: '100%'}}>
                    <CodeMirror
                        className={"codemirror-editor"}
                        value={'console.log("log");'}
                        height="400px"
                        width="100%"
                        extensions={[javascript()]}
                        theme={"dark"}
                        onChange={onChange}
                    />
                </TabPanel>
                <TabPanel value="4" style={{width: '100%', height: '100%'}}>
                    <AceEditor
                        mode="java"
                        // theme="monokai"
                        onChange={onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{
                            $blockScrolling: true
                        }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true
                        }}
                    /></TabPanel>
                <TabPanel value="5" style={{width: '100%', height: '100%'}}>
                    <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={"vs-dark"}
                    />
                </TabPanel>
            </TabContext>
            {/*<Typography className={"task-input"}>{task.taskInput}</Typography>*/}
        </Box>
    )
}

export default TaskView;