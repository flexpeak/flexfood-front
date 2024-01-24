import React, { useEffect, useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Fab, Grid, TextField, Typography } from '@mui/material'
import { Add, LocalGroceryStore, Remove } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ClienteListarItens = () => {
    const navigate = useNavigate()
    const { restaurante_id } = useParams()
    const [itens, setItens] = useState([])

    const obterDados = async () => {
        const response = await axios.get("http://localhost:3001/itens/" + restaurante_id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        setItens(response.data)
    }

    const excluirItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/itens/${restaurante_id}/${id}`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            alert("Item exclui do com sucesso")
            obterDados()
        } catch (e) {
            alert("Erro ao excluir item")
        }
    }

    useEffect(() => {
        obterDados()
    }, [])

  return (
    <>
        <Fab sx={{
            position: 'absolute',
            bottom: 16,
            right: 16
        }}
            color='primary'
            variant="extended"
        >
            <Typography sx={{fontSize: 20, fontWeight: 'bold', mr: 2}}>R$ 0,00</Typography>
            <LocalGroceryStore/>   
        </Fab>
        <MenuLateral titulo="Listagem de Itens"/>
        <Container sx={{ mt: 10 }}>
            <Grid container spacing={2}>
                { itens.map((item, index) => 
                    (<Grid item xs={12} md={3}>
                    <Card sx={{ height: '400px' }}>
                        
                        <CardMedia
                            component="img"
                            height="200"
                            image={ "http://localhost:3001/" + item.foto?.replace("public", "") }
                        />
                        <CardHeader
                            title={ item.nome }
                            subheader={ item.descricao }
                        />
                        <CardContent>
                            R$ { item.valor }
                        </CardContent>
                        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='contained' disabled onClick={() => {

                            }}>
                                <Remove/>
                            </Button>
                            <Typography>
                                0
                            </Typography>
                            <Button variant='contained' onClick={() => {
                            }}>
                                <Add/>
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>)
                ) }
            </Grid>
        </Container>
    </>
  )
}

export default ClienteListarItens