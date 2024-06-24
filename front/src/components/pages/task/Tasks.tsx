import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "../../../models/Task";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { toDateTime } from "../../../helper";
import { TaskStatus } from "../../../interfaces/TaskStatus";

function Tasks(props: TaskStatus) {
    const url = 'http://localhost:5000'

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => getTasks(), [props]);


    function getTasks() {
        let endpoint = 'tarefas/listar'

        if(props.status){
            if(props.status === 'completed'){
                endpoint = 'tarefas/concluidas'
            } else if(props.status === 'not_completed'){
                endpoint = 'tarefas/naoconcluidas'
            }
        }


        axios
            .get<Task[]>(`${url}/${endpoint}`)
            .then((response) => {
                console.table(response.data);
                setTasks(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar as tarefas:", error);
            });
    }

    const updateStatus = (id?: string) => {
        if (!id) {
            console.error("ID da tarefa não fornecido.");
            return;
        }

        axios
            .put(`${url}/tarefas/alterar/${id}`)
            .then((response) => {
                console.log("Task deletado:", response.data);
                getTasks();
            })
            .catch((error) => {
                console.error("Erro ao alterar status da tarefa:", error);
            });
    }

    return (
        <Container>
            <Typography variant="h5" component="h2" style={{padding: '20px'}}>
                Lista de Tarefas
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Descrição</TableCell>
                            <TableCell align="center">Situação</TableCell>
                            <TableCell align="center">Criado em</TableCell>
                            <TableCell align="center">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.tarefaId}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">{task.tarefaId}</TableCell>
                                <TableCell align="center">{task.titulo}</TableCell>
                                <TableCell align="center">{task.descricao}</TableCell>
                                <TableCell align="center">{task.status}</TableCell>
                                <TableCell align="center">{toDateTime(task.criadoEm)}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="warning" onClick={() => updateStatus(task.tarefaId)}>Alterar Status</Button>
                                </TableCell>
    
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Tasks;
