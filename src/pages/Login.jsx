import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import './Login.css'
import { Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()


    return (
        <>
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
                        />
                        <TextField 
                            label="Senha" 
                            type="password"
                            fullWidth
                        />

                        <Button variant='contained' fullWidth sx={{ mt: 5, mb:1}}>
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