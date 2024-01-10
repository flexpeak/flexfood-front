import { Alert, Avatar, Box, Button, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './Login.css'
import { Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cadastro = () => {
    const navigate = useNavigate()
    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [endereco, setEndereco] = useState()
    const [tipo, setTipo] = useState()
    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()

    const [alerta, setAlerta] = useState(false)
    const [mensagemAlerta, setMensagemAlerta] = useState()
    const [tipoAlerta, setTipoAlerta] = useState('success')


    const enviarDados = () => {
        try {
            axios.post('http://localhost:3001/usuarios', {
                nome: nome,
                telefone: telefone,
                endereco: endereco,
                tipo: tipo,
                senha: senha,
                email: email
            }).then(() => {
                setAlerta(true)
                setTipoAlerta('success')
                setMensagemAlerta('Usuário criado com sucesso')

                setTimeout(() => {
                    navigate('/')
                }, 2000)
                
            })
        } catch (e) {
            setAlerta(true)
            setTipoAlerta('error')
            setMensagemAlerta('Não foi possível cadastrar usuário')
        }
        
    }

    return (
        <>
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}} 
                open={alerta} 
                autoHideDuration={6000} 
                onClose={() => {}}
            >
                <Alert variant='filled' onClose={() => {}} severity={tipoAlerta}>
                    { mensagemAlerta }
                </Alert>
            </Snackbar>
            <CssBaseline />
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
                            <Lock />
                        </Avatar>
                        <Typography sx={{
                            mt: 2,
                            mb: 5,
                            fontSize: 26,
                            fontWeight: 'bold'
                        }}>
                            Formulário de Cadastro
                        </Typography>

                        <TextField
                            label="Nome"
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(e) => {
                                setNome(e.target.value)
                            }}
                        />
                        
                        <TextField
                            label="Telefone"
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(e) => {
                                setTelefone(e.target.value)
                            }}
                        />
                        <TextField
                            label="Endereço"
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(e) => {
                                setEndereco(e.target.value)
                            }}
                        />
                        <FormControl fullWidth sx={{ mb: 2}}>
                            <InputLabel id="label-tipo">Tipo</InputLabel>
                            <Select 
                                labelId="label-tipo" 
                                label="Tipo"
                                onChange={(e) => {
                                    setTipo(e.target.value)
                                }}
                            >
                                <MenuItem value={'C'}>Cliente</MenuItem>
                                <MenuItem value={'R'}>Restaurante</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TextField
                            label="E-mail"
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            onChange={(e) => {
                                setSenha(e.target.value)
                            }}
                        />

                        <Button variant='contained' fullWidth sx={{ mt: 5, mb: 1 }} onClick={enviarDados}>
                            SALVAR
                        </Button>
                        <Button variant='outlined' fullWidth onClick={() => {
                            navigate('/')
                        }}>
                            VOLTAR PARA LOGIN
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Cadastro