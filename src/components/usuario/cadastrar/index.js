import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { FirestoreMutation } from '@react-firebase/firestore';
import { Link } from 'react-router-dom';

function Cadastrar(props){
  return  <form noValidate autoComplete="off" id="formulario">
            <TextField fullWidth id="nomeCadastro" label="Nome:" />
            <TextField fullWidth id="telefoneCadastro" label="Telefone:" type="tel" />
            <TextField fullWidth id="emailCadastro" label="Email:" type="email"  />
            <TextField fullWidth id="senhaCadastro" label="Senha:" type="password"  />

            <FirestoreMutation path="/usuarios" type="add">
              {({runMutation})=>{
                return <Button variant="contained" color="primary" fullWidth onClick={()=>{
                          let nomeUsr = document.querySelector('#nomeCadastro').value;
                          let telefoneUsr = document.querySelector('#telefoneCadastro').value;
                          let emailUsr = document.querySelector('#emailCadastro').value;
                          let senhaUsr = document.querySelector('#senhaCadastro').value;
                          let usuario = { nome: nomeUsr, telefone: telefoneUsr, email: emailUsr, senha: senhaUsr };
                          runMutation(usuario).then(res=>{
                            alert('Cadastrado com sucesso!\nFaça login!');
                            document.querySelector("#formulario").reset();
                          }).catch(erro =>{
                            alert('Ocorreu um erro ao cadastrar!\nTente novamente!');
                          });

                      }}>
                          Cadastrar <Save />
                       </Button>
              }}
            </FirestoreMutation>
          </form>
}

export default Cadastrar
