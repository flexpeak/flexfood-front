import { Menu, Notifications } from '@mui/icons-material'
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const Home = () => {
  const [drawer, setDrawer] = useState(false)
  return (
    <>
        <Drawer open={drawer} onClose={() => {setDrawer(false)}}>
            Olá Mundo
        </Drawer>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <IconButton
                        sx={{
                            marginRight: '36px',
                            color: "#fff"
                        }}
                        onClick={() => {
                            setDrawer(true)
                        }}
                    >
                       <Menu/>
                    </IconButton>
                    <Typography 
                        component="h1"
                        variant="h6"
                        sx={{ flexGrow: 1}}
                    >
                        Página Inicial
                    </Typography>
                    <IconButton sx={{
                        color: "#fff"
                    }}>
                        <Notifications/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Home