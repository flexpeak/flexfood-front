import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Sair = () => {
  const navigate = useNavigate()

  const removerToken = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  useEffect(() => {
    removerToken()
  }, [])

  return (
    <></>
  )
}

export default Sair