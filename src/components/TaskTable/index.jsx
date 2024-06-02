import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TaskTable = ({taskList, handleTableRowClick}) => {

    console.log(`taskList TaskTable`, taskList)

    return (
        <TableContainer component={Paper} sx={{width: '100%', height: '100%', left: 0}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Название задачи</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        taskList?.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}
                                onClick={handleTableRowClick(task)}
                            >
                                <TableCell component="th" scope="row">
                                    {task.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {task.name}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskTable;
