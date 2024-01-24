import React, { useEffect, useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import axios from 'axios'
import { Button, Card, CardActions, CardHeader, CardMedia, Container, Fab, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Add } from '@mui/icons-material'

const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([])
  const navigate = useNavigate()

  const buscarDados = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos-restaurantes', {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      
      setRestaurantes(response.data.restaurantes)
    } catch (e) {

    }
  }

  useEffect(() => {
    buscarDados()
  }, [])

  return (
    <>
      <MenuLateral titulo="Meus Restaurantes"/>
      <Container sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          { restaurantes.map((restaurante) => 
            (<Grid item xs={12} md={3}>
              <Card>
                <CardHeader 
                  title={ restaurante.nome }
                  subheader={ restaurante.endereco }
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={ "http://localhost:3001/" + restaurante.logo?.replace("public", "") }
                />
                <CardActions>
                  <Button variant='contained' onClick={() => {
                    navigate('/cliente-listar-itens/' + restaurante.id)
                  }}>
                    VISUALIZAR ITENS
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

export default Restaurantes