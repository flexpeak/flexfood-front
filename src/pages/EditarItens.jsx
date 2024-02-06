import React, { useEffect, useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import { Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import ReactInputMask from 'react-input-mask'
import { CloudUpload } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditarItens = () => {
    const [nome, setNome] = useState()
    const [tipo, setTipo] = useState('C')
    const [valor, setValor] = useState()
    const [foto, setFoto] = useState()
    const [descricao, setDescricao] = useState()
    const [quantidadeEstoque, setQuantidadeEstoque] = useState()
    const [fotoAtual, setFotoAtual] = useState("")

    const { restaurante_id, item_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        buscarDados()
    }, [])

    const buscarDados = async () => {
        const response = await axios.get('https://api.tecnologia.manaus.br/itens/' + restaurante_id + '/' + item_id, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        setNome(response.data.nome)
        setTipo(response.data.tipo)
        setValor(response.data.valor)
        setDescricao(response.data.descricao)
        setQuantidadeEstoque(response.data.quantidade_estoque)
        setFotoAtual(response.data.foto)
    }

    const enviarDados = async () => {
        let formData = new FormData()
        formData.append("nome", nome)
        formData.append("tipo", tipo)
        formData.append("valor", valor)
        formData.append("foto", foto)
        formData.append("descricao", descricao)
        formData.append("quantidade_estoque", quantidadeEstoque)
        try {
            const response = await axios.put('https://api.tecnologia.manaus.br/itens/' + restaurante_id + "/" + item_id,
                formData
            , {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            })

            alert("Operação realizada com sucesso!")
            navigate("/listar-itens/" + restaurante_id)
        } catch (e) {
            alert("Não foi possível realizar essa operação")
        }
    }

  return (
    <>
        <MenuLateral titulo="Editar Item"/>
        <Container sx={{ mt: 10 }}>
            <Paper sx={{ p: 5 }}>
                <TextField InputLabelProps={{ shrink: true }} value={nome} label="Nome" fullWidth onChange={(e) => { setNome(e.target.value) }} sx={{ mb: 2}}/>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="tipo">
                        Tipo
                    </InputLabel>
                    <Select value={ tipo } labelId='tipo' label='Tipo' onChange={(e) => { setTipo(e.target.value) }}>
                        <MenuItem value={"C"}>COMIDA</MenuItem>
                        <MenuItem value={"B"}>BEBIDA</MenuItem>
                    </Select>
                    
                </FormControl>

                <ReactInputMask mask={"99.99"} onChange={(e) => setValor(e.target.value)} value={valor}>
                    { () => <TextField label='Valor' fullWidth sx={{ mb: 2 }}  InputLabelProps={{ shrink: true }} /> } 
                </ReactInputMask>

                <Button component="label" variant='contained' startIcon={<CloudUpload/>} sx={{ mb: 2}}>
                    <input type="file" onChange={(e) => { setFoto(e.target.files[0]) }} style={{ display: 'none' }}/>
                    Enviar Foto
                </Button>
                
                <Box sx={{mb: 2}}>
                    <img src={"https://api.tecnologia.manaus.br/" + fotoAtual.replace("public", "")} height={100}/>
                </Box>
                
                <TextField InputLabelProps={{ shrink: true }} value={descricao} label="Descrição" fullWidth onChange={(e) => { setDescricao(e.target.value)}} sx={{mb: 2}}/>
                <TextField InputLabelProps={{ shrink: true }} value={quantidadeEstoque} label="Quantidade em Estoque" type="number" fullWidth onChange={(e) => {setQuantidadeEstoque(e.target.value)}} sx={{mb: 2}}/>

                <Divider sx={{ mb: 2 }}/>
                <Button variant='contained' sx={{ width: 500 }} onClick={() => enviarDados()}>
                    Salvar
                </Button>
            </Paper>
        </Container>
    </>
  )
}

export default EditarItens