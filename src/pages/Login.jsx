import { Alert, Avatar, Box, Button, CssBaseline, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './Login.css'
import { Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const [alerta, setAlerta] = useState(false)
    const [mensagemAlerta, setMensagemAlerta] = useState()
    const [tipoAlerta, setTipoAlerta] = useState('success')

    const enviarDados = async () => {
        try {
            const response = await axios.post("http://localhost:3001/usuarios/login", {
                email: email,
                senha: senha
            })

            const token = response.data.token
            localStorage.setItem("token", token)

            navigate('/home')
        } catch(e) {
            setAlerta(true)
            setMensagemAlerta(e.response.data.error)
            setTipoAlerta("error")
        }
        // linha 15
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}} 
                open={alerta} 
                autoHideDuration={6000} 
                onClose={() => {setAlerta(false)}}
            >
                <Alert variant='filled' onClose={() => {setAlerta(false)}} severity={tipoAlerta}>
                    { mensagemAlerta }
                </Alert>
            </Snackbar>
            <CssBaseline/>
            <Grid container sx={{ height: '100vh' }}>
                <Grid 
                    item 
                    xs={false} 
                    sm={4} 
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://grupobravote.com.br/wp-content/uploads/2022/10/Design-sem-nome-1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={5}
                >
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mx: 4,
                            my: 8
                        }}
                    >
                        <Avatar className='avatar-legal'>
                            <Lock/>
                        </Avatar>
                        <Typography sx={{ 
                            mt: 2, 
                            mb: 5, 
                            fontSize: 26, 
                            fontWeight: 'bold'
                        }}>
                            Formulário de Login
                        </Typography>

                        <TextField 
                            label="E-mail" 
                            sx={{ mb: 2}}
                            fullWidth
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <TextField 
                            label="Senha" 
                            type="password"
                            fullWidth
                            onChange={(e) => {setSenha(e.target.value)}}
                        />

                        <Button variant='contained' fullWidth sx={{ mt: 5, mb:1}} onClick={enviarDados}>
                            FAZER LOGIN
                        </Button>
                        <Button variant='outlined' fullWidth onClick={() => {
                            navigate('/cadastro')
                        }}>
                            CADASTRAR-SE
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Login