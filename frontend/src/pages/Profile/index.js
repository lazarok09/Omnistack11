import React, { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import api from '../../services/api'
export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data)
    })

  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        }
      });
      // apagar da tela o ID deletado
      
      setIncidents(incidents.filter(incident => incident.id !== id));

    }catch(error) {
      alert("Ocorreu um erro ao deletar o caso.")
    }

  }
  //botao logOUT
  function handleLogut() {
    localStorage.clear();

    history.push('/')

  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button 
        onClick={handleLogut}
        type="button">
          <FaPowerOff size={18} color="#E02041" />
        </button>
      </header>
      
      <h1>Casos cadastrados</h1>
      <ul>
       
       {incidents.map(incident => (
          <li key={incident.id}>
          <strong></strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>
          {incident.description}
          </p>

          <strong>VALOR:</strong>
          <p>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}
          </p>

          <button type="button"
          onClick = {() => handleDeleteIncident(incident.id)}
          >
            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
          </button>
        </li>
       )) }
      </ul>
    </div>
  );
}
