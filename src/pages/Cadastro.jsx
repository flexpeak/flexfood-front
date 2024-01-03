import { Avatar, Box, Button, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import './Login.css'
import { Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Cadastro = () => {
    const navigate = useNavigate()

    return (
        <>
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
                        />
                        <TextField
                            label="Telefone"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                        <TextField
                            label="Endereço"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                        <FormControl fullWidth sx={{ mb: 2}}>
                            <InputLabel id="label-tipo">Tipo</InputLabel>
                            <Select labelId="label-tipo" label="Tipo">
                                <MenuItem value={'C'}>Cliente</MenuItem>
                                <MenuItem value={'R'}>Restaurante</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TextField
                            label="E-mail"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                        />

                        <Button variant='contained' fullWidth sx={{ mt: 5, mb: 1 }}>
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