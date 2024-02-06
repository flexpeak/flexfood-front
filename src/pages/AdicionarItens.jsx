import React, { useState } from 'react'
import MenuLateral from '../components/MenuLateral'
import { Button, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import ReactInputMask from 'react-input-mask'
import { CloudUpload } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AdicionarItens = () => {
    const [nome, setNome] = useState()
    const [tipo, setTipo] = useState()
    const [valor, setValor] = useState()
    const [foto, setFoto] = useState()
    const [descricao, setDescricao] = useState()
    const [quantidadeEstoque, setQuantidadeEstoque] = useState()

    const { restaurante_id } = useParams()
    const navigate = useNavigate()

    const enviarDados = async () => {
        let formData = new FormData()
        formData.append("nome", nome)
        formData.append("tipo", tipo)
        formData.append("valor", valor)
        formData.append("foto", foto)
        formData.append("descricao", descricao)
        formData.append("quantidade_estoque", quantidadeEstoque)
        try {
            const response = await axios.post('https://api.tecnologia.manaus.br/itens/' + restaurante_id,
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
        <MenuLateral titulo="Adicionar Item"/>
        <Container sx={{ mt: 10 }}>
            <Paper sx={{ p: 5 }}>
                <TextField label="Nome" fullWidth onChange={(e) => { setNome(e.target.value) }} sx={{ mb: 2}}/>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="tipo">
                        Tipo
                    </InputLabel>
                    <Select labelId='tipo' label='Tipo' onChange={(e) => { setTipo(e.target.value) }}>
                        <MenuItem value={"C"}>COMIDA</MenuItem>
                        <MenuItem value={"B"}>BEBIDA</MenuItem>
                    </Select>
                    
                </FormControl>

                <ReactInputMask mask={"99.99"} onChange={(e) => setValor(e.target.value)}>
                    { () => <TextField label='Valor' fullWidth sx={{ mb: 2 }}/> }
                </ReactInputMask>

                <Button component="label" variant='contained' startIcon={<CloudUpload/>} sx={{ mb: 2}}>
                    <input type="file" onChange={(e) => { setFoto(e.target.files[0]) }} style={{ display: 'none' }}/>
                    Enviar Foto
                </Button>
                
                <TextField label="Descrição" fullWidth onChange={(e) => { setDescricao(e.target.value)}} sx={{mb: 2}}/>
                <TextField label="Quantidade em Estoque" type="number" fullWidth onChange={(e) => {setQuantidadeEstoque(e.target.value)}} sx={{mb: 2}}/>

                <Divider sx={{ mb: 2 }}/>
                <Button variant='contained' sx={{ width: 500 }} onClick={() => enviarDados()}>
                    Salvar
                </Button>
            </Paper>
        </Container>
    </>
  )
}

export default AdicionarItens