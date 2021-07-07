import React, {useState, useEffect} from 'react';
import { TextField, Button, NativeSelect, InputLabel  } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { FirestoreCollection, FirestoreMutation } from '@react-firebase/firestore';
import { Link } from 'react-router-dom';

function  ContatoCadastrar(props){
  let [idContato, setIdContato] = useState('');
  let [nomeContato, setNomeContato] = useState('');

  function handleChange(event) {

      setIdContato(event.target.value);
      setNomeContato(event.target.selectedOptions[0].textContent);

  }

  return <form noValidate autoComplete="off" id="formulario">
            <InputLabel htmlFor="dados">Selecione o usuário:</InputLabel>
            <FirestoreCollection path="/usuarios">
              {d=>{
                if(d.isLoading) return  <p><b>Carregando!</b></p>
                if(d.value.length > 0){
                  return <NativeSelect id="dados" fullWidth value={idContato} onChange={handleChange}>
                            {d.value.map((usuario, indice)=>{
                              if(d.ids[indice] != props.id){
                                return <option value={d.ids[indice]}>{usuario['nome']}</option>
                              }
                            })}
                         </NativeSelect>
                }
              }}
            </FirestoreCollection>
            <TextField id="telefoneContato" label="Telefone:" type="tel" fullWidth />
            <TextField id="emailContato" label="Email:" type="email" fullWidth />
            <input type="hidden" id="idContato" value={idContato} />
            <input type="hidden" id="nomeContato" value={nomeContato} />
            <input type="hidden" id="idUsuario" value={props.id} />

            <FirestoreMutation path="/contatos" type="add">
              {({runMutation})=>{
                return <Button variant="contained" color="primary" fullWidth onClick={()=>{
                          let nomeContato = document.querySelector('#nomeContato').value;
                          let emailContato = document.querySelector('#emailContato').value;
                          let idContato = document.querySelector('#idContato').value;
                          let idUsuario = document.querySelector('#idUsuario').value;
                          let telefoneContato = document.querySelector('#telefoneContato').value;
                          let usuario = {
                            nome: nomeContato,
                            email: emailContato,
                            idContato: idContato,
                            idUsuario: idUsuario,
                            telefone: telefoneContato
                          }
                          if(nomeContato != "" && idContato != ""){
                            runMutation(usuario).then(res=>{
                                document.querySelector('#formulario').reset();
                                alert('Seu contato foi salvo com sucesso!');

                            }).catch(erro=>{
                              alert('Tente novamente, ocorreu um erro ao salvar!');
                            })
                          }
                          else{
                            alert('Por favor, selecione um contato novamente!');
                          }

                       }}>
                        Salvar Contato <Save />
                      </Button>
              }}
            </FirestoreMutation>
         </form>
}

export default ContatoCadastrar
