import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Status from '../components/Status'

const HomeCliente = () => {
    const [pedidos, setPedidos] = useState([])

    const buscarDados = async () => {
        const response = await axios.get("https://api.tecnologia.manaus.br/cliente/pedidos", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        console.log(response.data)
        setPedidos(response.data)
    }

    useEffect(() => {
        buscarDados()
    }, [])

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Itens</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { pedidos.map((pedido) => (
                    <TableRow>
                        <TableCell>{ pedido.restaurante.nome }</TableCell>
                        <TableCell>R$ {
                            pedido.itens.reduce((total, item) => {
                                return total + (item.pedidos_itens.quantidade * item.valor)
                            }, 0).toFixed(2)
                        }</TableCell>
                        <TableCell>
                            {
                                pedido.itens.map((item) => item.nome)
                            }
                        </TableCell>
                        <TableCell>
                            {/* { pedido.status } */}
                            {/* <Chip label="Pedido Cancelado" color="error" /> */}
                            <Status statusAtual={pedido.status} />
                        </TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default HomeCliente