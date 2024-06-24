import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../../../models/Task";
import { Category } from "../../../models/Category";
import axios from "axios";
import {
    Container,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const TaskCreate = () => {
    const url = 'http://localhost:5000'

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<Task>({
        titulo: "",
        descricao: "",
        categoriaId: "",
    });
    const [categorias, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        axios.get<Category[]>(`${url}/categoria/listar`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Erro ao get categorias:", error);
            });
    }

    const createTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post<Task>(`${url}/tarefas/cadastrar`, formValues)
            .then((response) => {
                console.log("Tarefa cadastrada:", response.data);
                navigate("/pages/tarefa/listar");
            })
            .catch((error) => {
                console.error("Erro ao cadastrar tarefa:", error);
            });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom style={{marginTop: "10px"}}>
                Cadastrar Tarefa
            </Typography>
            <form onSubmit={createTask}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Título"
                    name="titulo"
                    value={formValues.titulo}
                    onChange={handleInputChange}
                    placeholder="Digite o título"
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Descrição"
                    name="descricao"
                    value={formValues.descricao}
                    onChange={handleInputChange}
                    placeholder="Digite a descrição"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Categoria</InputLabel>
                    <Select
                        name="categoriaId"
                        value={formValues.categoriaId}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="">
                            <em>Selecione uma categoria</em>
                        </MenuItem>
                        {categorias.map((categoria) => (
                            <MenuItem key={categoria.categoriaId} value={categoria.categoriaId}>
                                {categoria.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Cadastrar
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default TaskCreate;
