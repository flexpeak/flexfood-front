import { ArrowCircleLeft, ArrowLeft, HomeMax, HomeOutlined, Menu, Notifications, Place, Restaurant, RestaurantMenu } from '@mui/icons-material'
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MenuLateral = ({ titulo }) => {
    const [drawer, setDrawer] = useState(false)
    const navigate = useNavigate()

    const itensDoMenu = [
        {
            texto: 'Página Inicial',
            icone: <HomeOutlined />,
            destino: '/home'
        },
        {
            texto: 'Meu Restaurante',
            icone: <Restaurant />,
            destino: '/meu-restaurante'
        },
        {
            texto: 'Meus Ítens',
            icone: <RestaurantMenu />,
            destino: '/meus-itens'
        },
        {
            texto: 'Restaurantes',
            icone: <Place />,
            destino: '/restaurantes'
        },
        {
            texto: 'Sair',
            icone: <ArrowCircleLeft />,
            destino: '/sair'
        }
    ];

    return (
        <>
            <Drawer open={drawer} onClose={() => { setDrawer(false) }}>
                <Box sx={{ width: 250 }}>
                    <List>
                        {
                            itensDoMenu.map((itemDoMenu) => (
                                <ListItem>
                                    <ListItemButton onClick={() => {
                                        navigate(itemDoMenu.destino)
                                    }}>
                                        <ListItemIcon>
                                            {itemDoMenu.icone}
                                        </ListItemIcon>
                                        <ListItemText primary={itemDoMenu.texto} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Drawer>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
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
                            <Menu />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            sx={{ flexGrow: 1 }}
                        >
                            { titulo }
                        </Typography>
                        <IconButton sx={{
                            color: "#fff"
                        }}>
                            <Notifications />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default MenuLateral