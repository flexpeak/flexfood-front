import React, { useEffect, useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import axios from 'axios'
import { Button, Card, CardActions, CardHeader, CardMedia, Container, Grid } from '@mui/material'

const MeusItens = () => {
  const [restaurantes, setRestaurantes] = useState([])

  const buscarDados = async () => {
    try {
      const response = await axios.get('http://localhost:3001/restaurantes', {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })

      setRestaurantes(response.data)
    } catch (e) {

    }
  }

  useEffect(() => {
    buscarDados()
  }, [])

  return (
    <>
      <MenuLateral titulo="Meus Ítens"/>
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
                  <Button variant='contained'>GERENCIAR ITENS</Button>
                </CardActions>
              </Card>
            </Grid>)
          ) }
          
        </Grid>
      </Container>
    </>
  )
}

export default MeusItens