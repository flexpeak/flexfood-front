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
    const [valorTotal, setValorTotal] = useState(0)

    const obterDados = async () => {
        const response = await axios.get("http://localhost:3001/itens/" + restaurante_id, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        const itensComQuantidade = response.data.map((item) => (
            {
                ...item,
                quantidade: 0
            }
        ))

        setItens(itensComQuantidade)
    }

    const calcularValorTotal = () => {
        const valorCalculo = itens.reduce(function(incremento, item) {
            return incremento + (item.quantidade * item.valor)
        }, 0)
        setValorTotal(valorCalculo)
    }

    const enviarDados = () => {
        let dados = {
            status: 1,
            restaurante_id: restaurante_id
        }

        dados.itens = itens.filter((item) => item.quantidade > 0).map((item) => 
            ({ 
                item_id: item.id,
                quantidade: item.quantidade
            })
        )

        try {
            axios.post("http://localhost:3001/cliente/pedidos", dados, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            alert("Pedido realizado com sucesso!")
            navigate("/home")
        } catch (e) {
            alert("Não foi possível fazer pedido")
        }
        
    }

    useEffect(() => {
        obterDados()
    }, [])

  return (
    <>
        <Fab onClick={enviarDados} sx={{
            position: 'absolute',
            bottom: 16,
            right: 16
        }}
            color='primary'
            variant="extended"
        >
            <Typography sx={{fontSize: 20, fontWeight: 'bold', mr: 2}}>
                R$ { valorTotal.toFixed(2) }
            </Typography>
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
                            <Button disabled={(item.quantidade == 0)} variant='contained' onClick={() => {
                                const novosItens = [...itens]
                                novosItens[index].quantidade -= 1;
                                setItens(novosItens)
                                calcularValorTotal()
                            }}>
                                <Remove/>
                            </Button>
                            <Typography>
                                { item.quantidade }
                            </Typography>
                            <Button variant='contained' onClick={() => {
                                const novosItens = [...itens]
                                novosItens[index].quantidade += 1;
                                setItens(novosItens)
                                calcularValorTotal()
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