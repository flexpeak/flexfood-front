import React, { useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import { Box, Button, Container, Divider, FormControl, Input, InputLabel, Paper, TextField } from '@mui/material'
import axios from 'axios'
import ReactInputMask from 'react-input-mask'

const MeuRestaurante = () => {

  const [nome, setNome] = useState()
  const [telefone, setTelefone] = useState()
  const [endereco, setEndereco] = useState()

  const enviarDados = async () => {
    try {
      const response = await axios.post("http://localhost:3001/restaurantes", {
        nome: nome,
        telefone: telefone,
        endereco: endereco
      })
      console.log(response)
    } catch (e) {

    }
  }

  return (
    <>
      <MenuLateral titulo="Meu Restaurante" />
      <Container sx={{ mt: 10 }}>
        <Paper>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 5, py: 5 }}>
            <TextField label="Nome" sx={{ mb: 3 }} fullWidth onChange={(e) => setNome(e.target.value)}/>
            <TextField label="Endereço" sx={{ mb: 3 }} fullWidth onChange={(e) => setEndereco(e.target.value)}/>
            
            <ReactInputMask mask="(99) 99999-9999" onChange={(e) => setTelefone(e.target.value)}>
              { () => 
                <TextField 
                  label="Telefone"
                  sx={{ mb: 3 }}
                  fullWidth
                /> }
            </ReactInputMask>

            <Divider flexItem sx={{ mb: 3 }}/>

            <Button 
              variant='contained' 
              sx={{ width: 300 }}
              onClick={() => {
                enviarDados()
              }}
            >Salvar</Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default MeuRestaurante