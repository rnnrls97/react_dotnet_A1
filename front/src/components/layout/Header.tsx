import { Link } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";

export default function Header() {
    const pages = [
        {
            path: 'pages/tarefa/listar',
            name: 'Tarefas',
        },
        {
            path: 'pages/tarefa/listarconcluidas',
            name: 'Tarefas Concluídas',
        },
        {
            path: 'pages/tarefa/listarnaoconcluidas',
            name: 'Tarefas Não Concluídas',
        },
        {
            path: 'pages/tarefa/cadastrar',
            name: 'Cadastrar Tarefa',
        },

    ]

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            {pages.map((page) => (
                                <Link to={page.path} key={page.name}>
                                    <Button color="info" sx={{ my: 2, color: 'white', display: 'block', marginRight: "8px"}} >{page.name}</Button>
                                </Link>
                            ))}
                        </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
}
