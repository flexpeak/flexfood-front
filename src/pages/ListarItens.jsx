import React, { useEffect, useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Fab, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ListarItens = () => {
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
            alert("Item excluido com sucesso")
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
        <MenuLateral titulo="Listagem de Itens"/>
        <Fab color='primary' sx={{
            position: 'absolute',
            bottom: 16,
            right: 16
        }} onClick={() => {
            navigate('/adicionar-itens/' + restaurante_id)
        }}>
            <Add/>
        </Fab>
        <Container sx={{ mt: 10 }}>
            <Grid container spacing={2}>
                { itens.map((item) => 
                    (<Grid item xs={12} md={3}>
                    <Card sx={{ height: '460px' }}>
                        
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
                            R$ { item.valor } <br/>
                            Quantidade em estoque: { item.quantidade_estoque }
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' onClick={() => {}}>
                                EDITAR 
                            </Button>
                            <Button variant='contained' color='error' onClick={() => { excluirItem(item.id) }}>
                                EXCLUIR
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

export default ListarItens