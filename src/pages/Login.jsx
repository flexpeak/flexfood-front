import { CssBaseline, Grid } from '@mui/material'
import React from 'react'

const Login = () => {
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
                        backgroundImage: 'url(https://n1sistemas.com.br/wp-content/uploads/2022/08/vantagens-erp-cloud.jpg)',
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
                    Formulário
                </Grid>
            </Grid>
        </>
    )
}

export default Login