import React, { useEffect, useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import axios from 'axios'
import { Button, Card, CardActions, CardHeader, CardMedia, Container, Fab, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Add } from '@mui/icons-material'

const ListarMeuRestaurante = () => {
  const [restaurantes, setRestaurantes] = useState([])
  const navigate = useNavigate()

  const buscarDados = async () => {
    try {
      const response = await axios.get('https://api.tecnologia.manaus.br/restaurantes', {
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
        <Fab color='primary' sx={{
            position: 'absolute',
            bottom: 16,
            right: 16
        }} onClick={() => {
            navigate('/adicionar-meu-restaurante/')
        }}>
            <Add/>
        </Fab>
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
                  image={ "https://api.tecnologia.manaus.br/" + restaurante.logo?.replace("public", "") }
                />
                <CardActions>
                  <Button variant='contained' onClick={() => {
                    navigate('/editar-meu-restaurante/' + restaurante.id)
                  }}>
                    EDITAR
                  </Button>
                  <Button color="error" variant='contained' onClick={() => {
                    if (window.confirm("Tem certeza?")) {
                        axios.delete("https://api.tecnologia.manaus.br/restaurantes/" + restaurante.id, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then((response) => {
                            buscarDados()
                        })
                    }
                  }}>
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

export default ListarMeuRestaurante