import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  } from '@material-ui/core';
import {  } from '@material-ui/icons';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import  { FirestoreProvider } from '@react-firebase/firestore';
import * as fire from 'firebase/app';
import { firebaseConfig } from './config';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Cabecalho from './components/interface/cabecalho/';
import Menu from './components/interface/menu/';
import Login from './components/usuario/login/';
import Cadastrar from './components/usuario/cadastrar/';
import Perfil from './components/usuario/perfil/';
import Agenda from './components/contatos/agenda/';
import Mensagens from './components/mensagens/';
import ContatoCadastrar from './components/contatos/cadastrar/';

import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme)=>({
  barra: {
    backgroundColor: '#272727',
    '& .Mui-selected': { color: '#ff9800'},
    marginTop: '3px'
  },
  acaoBarra: {
    color: '#ffffff'
  },
  cabecalho: {
    backgroundColor: '#272727',
    color: '#ff9800'
  },
  btnCabecalho: {
    color: '#FF9800'
  },
  cartao: {
      backgroundColor: '#ccc'
  },
  tituloCabecalho: {
    fontSize: theme.typography.pxToRem(15),
    fontWeigth: theme.typography.fontWeigthRegular
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  imagem: {
    maxWidth: '200px',
    minHeight: '200px'
  },
  msgEu:{
    color: '#FF9800'
  },
  msgOutro: {
    color: '#5e4352'
  },
  txtConcluido: {
    color: '#009688'
  },
  txtCarregando:{
    color: '#FF9800'
  },
  selecImagem: {
    marginTop: '23px',
    wordWrap: 'break-word',
    width: '170px'
  },
  listaMensagens: {
    minHeight: 300,
    maxHeight: 300,
    overflow: 'auto'
  },
  inline:{
    display: 'inline'
  }

}))

function App(props) {
  let  fonteEstilo = useStyles();

  const usuario = useSelector(state => state.clickState.usuario);
  const id = useSelector(state => state.clickState.id);
  const conectado = useSelector(state => state.clickState.conectado);
  const dispatch = useDispatch();

  function addUsuario(usr){ dispatch({type: 'CLICK_ADD_USUARIO', usuario: usr}); }
  function addId(idUsr){ dispatch({type: 'CLICK_ADD_ID', id: idUsr}); }
  function addConectado(usrConectado){ dispatch({type: 'CLICK_ADD_CONECTADO', conectado: usrConectado}); }

  let listaF = {addUsuario, addId, addConectado};

  return (
    <Router>
      <FirestoreProvider firebase={fire.default} {...firebaseConfig}>


        <Switch>
          <Route path="/login">
            <div>
              <Cabecalho tipo='' estilo={fonteEstilo} />
              {conectado ? <Redirect to="/mensagens" /> : <Login funcoes={listaF} /> }
            </div>
          </Route>
          <Route path="/cadastro">
            <div>
              <Cabecalho tipo="cadastro" estilo={fonteEstilo} />
              {conectado ? <Redirect to="/mensagens" /> : <Cadastrar />}
            </div>
          </Route>
          <Route path="/agenda">
              <Cabecalho estilo={fonteEstilo} />
              {conectado ? <Agenda id={id} estilo={fonteEstilo} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/perfil">
            <div>
              <Cabecalho estilo={fonteEstilo} />
              {conectado ? <Perfil usuario={usuario} id={id} funcoes={listaF} /> : <Redirect to="/login" />}
            </div>
          </Route>
          <Route path="/mensagens">
            <div>
              <Cabecalho estilo={fonteEstilo} />
              {conectado ? <Mensagens estilo={fonteEstilo} usuario={usuario} id={id} /> : <Redirect to="/login" /> }
            </div>
          </Route>
          <Route path="/contato">
            <div>
              <Cabecalho estilo={fonteEstilo} tipo="agenda" />
              {conectado ? <ContatoCadastrar id={id} /> : <Redirect to="/login" /> }
            </div>
          </Route>
          <Redirect from="*" to="/login" />
        </Switch>


        <Menu estilo={fonteEstilo} funcoes={listaF} usuario={usuario} />
      </FirestoreProvider>
    </Router>
  );
}

export default App;


// {conectado ? <p>Conectado</p> : <p>Não conectado</p>}
