import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { AccountBox,RecentActors,Forum,ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function Menu(props){
  const [value, setValue] = useState('mensagens');
  const handleChange = (event, newValue) => { setValue(newValue); }

  return <BottomNavigation value={value} onChange={handleChange} showLabels className={props.estilo.barra}>
          <BottomNavigationAction component={Link} to="/perfil" label="Perfil" value="perfil" icon={<AccountBox/>} className={props.estilo.acaoBarra}></BottomNavigationAction>
          <BottomNavigationAction component={Link} to="/agenda" label="Agenda" value="agenda" icon={<RecentActors/>} className={props.estilo.acaoBarra}></BottomNavigationAction>
          <BottomNavigationAction component={Link} to="/mensagens" label="Mensagens" value="mensagens" icon={<Forum/>} className={props.estilo.acaoBarra}></BottomNavigationAction>
          <BottomNavigationAction label="Logout" value="logout" icon={<ExitToApp/>} className={props.estilo.acaoBarra} onClick={()=>{

            alert(`Até mais ${props.usuario['nome']}!`)

            props.funcoes.addUsuario({nome: '', telefone: '', icone: '', email: '', senha: ''});
            props.funcoes.addId('');
            props.funcoes.addConectado(false);


          }}></BottomNavigationAction>
        </BottomNavigation>
}

export default Menu;
