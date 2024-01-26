import { Chip } from '@mui/material'
import React from 'react'

const Status = ({ statusAtual }) => {
    return (
        <>
            {(statusAtual == 1 && (<Chip label="Pedido Solicitado" color="primary" />))}
            {(statusAtual == 2 && (<Chip label="Pedido Confirmado" color="secondary" />))}
            {(statusAtual == 3 && (<Chip label="Pedido Enviado" color="warning" />))}
            {(statusAtual == 4 && (<Chip label="Pedido Entregue" color="success" />))}
            {(statusAtual == 5 && (<Chip label="Pedido Cancelado" color="error" />))}
        </>
    )
}

export default Status