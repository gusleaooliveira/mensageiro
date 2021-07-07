import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { FirestoreCollection } from '@react-firebase/firestore';
import { Link } from 'react-router-dom';

function Login(props){

    return <form noValidate autoComplete="off">
            <TextField id="emailLogin" fullWidth type="email" label="Email:"  />
            <TextField id="senhaLogin" fullWidth type="password" label="Senha:"  />
            <Button color="primary" component={Link} to="/cadastro">
              Cadastre-se
            </Button>

            <FirestoreCollection path="/usuarios">
              {d=>{
                if(d.isLoading) return <p><b>Carregando!</b></p>
                if(d.value.length > 0){
                  return <Button variant="contained" color="primary" fullWidth onClick={()=>{
                            let email = document.querySelector('#emailLogin').value;
                            let senha = document.querySelector('#senhaLogin').value;

                            d.value.map((item, indice)=>{
                              if(item['email'] == email && item['senha'] == senha){
                                props.funcoes.addUsuario(item);
                                props.funcoes.addId(d.ids[indice]);
                                props.funcoes.addConectado(true);
                                alert(`Seja bem-vindo ${item['nome']}!`)
                              }
                            });
                        }}>
                            Entrar <Person />
                         </Button>
                }
              }}
            </FirestoreCollection>

          </form>
}

export default Login
