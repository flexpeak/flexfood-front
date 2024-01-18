import React from 'react'
import MenuLateral from '../components/MenuLateral'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

const ListarItens = () => {
    const navigate = useNavigate()
    const { restaurante_id } = useParams()

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
    </>
  )
}

export default ListarItens