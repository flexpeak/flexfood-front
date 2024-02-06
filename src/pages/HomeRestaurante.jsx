import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Status from '../components/Status'

const HomeRestaurante = () => {
    const [pedidos, setPedidos] = useState([])

    const buscarDados = async () => {
        const response = await axios.get("https://api.tecnologia.manaus.br/restaurante/pedidos/", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        console.log(response.data)
        setPedidos(response.data)
    }

    const confirmar = async (id) => {
        try {
            await axios.put("https://api.tecnologia.manaus.br/restaurante/pedidos/" + id, {
                status: 2
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            buscarDados()
        } catch (e) {
            alert("Erro ao realizar operação")
        }
    }

    const enviar = async (id) => {
        try {
            await axios.put("https://api.tecnologia.manaus.br/restaurante/pedidos/" + id, {
                status: 3
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            buscarDados()
        } catch (e) {
            alert("Erro ao realizar operação")
        }
    }

    const cancelar = async (id) => {
        try {
            await axios.put("https://api.tecnologia.manaus.br/restaurante/pedidos/" + id, {
                status: 5
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            buscarDados()
        } catch (e) {
            alert("Erro ao realizar operação")
        }
    }

    const entregue = async (id) => {
        try {
            await axios.put("https://api.tecnologia.manaus.br/restaurante/pedidos/" + id, {
                status: 4
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            buscarDados()
        } catch (e) {
            alert("Erro ao realizar operação")
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Ação</TableCell>
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Itens</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { pedidos.map((pedido) => (
                    <TableRow>
                        <TableCell>
                            { pedido.status == 1 && (<Button variant='contained' onClick={() => { confirmar(pedido.id) }}>Confirmar</Button>) }
                            { pedido.status == 2 && (<Button variant='contained' color='secondary' onClick={() => { enviar(pedido.id) }}>Enviar</Button>) }
                            { pedido.status == 3 && (<Button variant='contained' color='success' onClick={() => { entregue(pedido.id) }}>Entregue</Button>) }
                            { pedido.status != 4 && pedido.status != 5 && (<Button variant='contained' color='error' onClick={() => { cancelar(pedido.id) }}>Cancelar</Button>) }
                        </TableCell>
                        <TableCell>{ pedido.restaurante.nome }</TableCell>
                        <TableCell>{ pedido.usuario.nome }</TableCell>
                        <TableCell>{ pedido.usuario.endereco }</TableCell>
                        <TableCell>{ pedido.usuario.telefone }</TableCell>
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

export default HomeRestaurante