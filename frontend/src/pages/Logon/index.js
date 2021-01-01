import React, { useState} from 'react';

import './styles.css'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

import api from '../../services/api';

import { FaSignInAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';


export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();
        // logica pra verificar se a ong existe

        try {
            const response = await api.post('sessions', { id });
            /* a rota que vamos utilizar é sessions que é a rota de logon, e em seguida enviaremos
            um objeto contendo o ID dessa ONG que quer logar */

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
            
        } catch(error) {
            alert('Falha no login, tente novamente')
        }
    }

    return (
    <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be the Hero"/>

        <form onSubmit={handleLogin}>  
            <h1>Faça seu logon</h1>

            <input
             placeholder="Sua ID"
             value={id}
             onChange={e => setId(e.target.value)}
             />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
                <FaSignInAlt size={16} color='#e02041'/>
                Não tenho cadastro 
            </Link>
        </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>
    </div>
    )
}