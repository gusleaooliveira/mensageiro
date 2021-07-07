import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { FirestoreMutation } from '@react-firebase/firestore';
import { Link } from 'react-router-dom';

function Perfil(props){
  let [usr, setUsr] = useState(props.usuario)

  useEffect(()=>{
      console.log(usr);
  })

  return  <form noValidate autoComplete="off" id="formulario">
            <TextField fullWidth defaultValue={usr['nome']} id="nomePerfil" label="Nome:" />
            <TextField fullWidth defaultValue={usr['telefone']} id="telefonePerfil"  label="Telefone:" type="tel" />
            <TextField fullWidth value={usr['email']} id="emailPerfil" label="Email:" type="email" />
            <TextField fullWidth defaultValue={usr['senha']} id="senhaPerfil" label="Senha:" type="password" />

            <FirestoreMutation path={"/usuarios/"+props.id} type="set">
              {({runMutation})=>{
                return <Button variant="contained" color="primary" fullWidth onClick={()=>{
                            let nomeUsr = document.querySelector('#nomePerfil').value;
                            let telefoneUsr = document.querySelector('#telefonePerfil').value;
                            let emailUsr = document.querySelector('#emailPerfil').value;
                            let senhausr = document.querySelector('#senhaPerfil').value;
                            let usuario = { nome: nomeUsr, telefone: telefoneUsr, email: emailUsr, senha: senhausr };

                            document.querySelector("#formulario").reset();
                            props.funcoes.addUsuario(usuario);
                            setUsr(usuario)

                            runMutation(usuario).then(res => {
                              alert('Salvo com sucesso!');
                            }).catch(erro => {
                              alert('Erro ao salvar:', erro)
                            });
                       }}>
                        Alterar <Save />
                       </Button>
              }}
            </FirestoreMutation>
          </form>
}

export default Perfil
