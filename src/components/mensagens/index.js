import React, {useState, useEffect} from 'react';
import { TextField, Button, NativeSelect, InputLabel, Divider, Typography,Grid, List,ListItem,ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Send,Publish,Done, Close } from '@material-ui/icons';
import * as fire from 'firebase/app';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation } from '@react-firebase/firestore';
import { Link } from 'react-router-dom';
import imgUsr from '../../icons/usuario.svg';
import FileUploader from 'react-firebase-file-uploader';

function Mensagens(props){
  let [idContato, setIdContato] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [erro, setErro] = useState(false);
  let [progress, setProgress] = useState(0);
  let [imagem, setImagem] = useState('')
  let [url, setUrl] = useState('');
  let [nomeContato, setNomeContato] = useState('');


  function handleChange(event){
    setNomeContato(event.target.selectedOptions[0].textContent);
    setIdContato(event.target.value);
  }

  function handleUploadStart(){
    setIsLoading(true);
    setProgress(0);
    setErro(false)
  }
  function handleProgress(progress){
    setProgress(progress);
    setErro(false)
  }
  function handleUploadError(error){
    setIsLoading(false)
    setErro(true)
  }
  function handleUploadSuccess(filename){
    setImagem(filename)
    setProgress(100)
    setIsLoading(false)
    setErro(false)

    fire.default.storage().ref('images').child(filename).getDownloadURL().then(url=>setUrl(url))
  }

  return <React.Fragment>
            <FirestoreCollection path="/mensagens">
              {d=>{
                if(d.isLoading) return  <p><b>Carregando!</b></p>
                if(d.value.length > 0){
                  return <List className={props.estilo.listaMensagens}>
                            {d.value.map((item, indice)=>{
                              if(item['autor'] == props.id || item['recebedor'] == props.id){

                                let autorNome = item['de'];
                                let recebedorNome = '';

                                if(item['autor'] == props.id){
                                    autorNome= "Você";
                                }

                                return <div>
                                        <ListItem>
                                            <ListItemAvatar>
                                              <Avatar src={imgUsr} />
                                            </ListItemAvatar>

                                            <ListItemText
                                              primary={
                                                autorNome
                                              }
                                              secondary={
                                                <React.Fragment>
                                                  <Typography
                                                    component="span"
                                                    variant="band2"
                                                    className={props.estilo.inline}
                                                    color="textPrimary">
                                                    {recebedorNome}
                                                  </Typography>

                                                  {item['mensagem'] != '' && <p>{item['mensagem']}</p>}
                                                  {item['imagem'] != '' && <p><img src={item['imagem']} className={props.estilo.imagem} /></p>}
                                                </React.Fragment>
                                              }
                                            />
                                         </ListItem>
                                       <Divider variant="inset" component="li" />
                                      </div>
                                    }
                            })}
                         </List>
                }
              }}
            </FirestoreCollection>
            <form noValidate autoComplete="off" id="formulario">
              <Grid container>
                <Grid item xs={5}>
                  <InputLabel htmlFor="dados">Usuário:</InputLabel>
                  <FirestoreCollection path="/contatos">
                    {d=>{
                      if(d.isLoading) return  <p><b>Carregando!</b></p>
                      if(d.value.length > 0){
                          return <NativeSelect id="dados" fullWidth value={idContato} onChange={handleChange}>
                                    {d.value.map((contato, indice)=>{
                                      if(contato['idUsuario'] == props.id){
                                        return  <option value={contato['idContato']}>{contato['nome']}</option>
                                      }
                                    })}
                                 </NativeSelect>
                      }
                    }}
                  </FirestoreCollection>
                </Grid>
                <Grid item xs={7}>
                  <FileUploader
                    accept="image/*"
                    name="imagem"
                    randomizeFilename
                    storageRef={fire.default.storage().ref('images')}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                    className={props.estilo.selecImagem}
                  />
                  {isLoading == true && <span className={props.estilo.txtCarregando}><Publish /></span>}
                  {progress == 100 && <span className={props.estilo.txtConcluido}><Done /></span>}
                  {erro == true && <span className={props.estilo.txtErro}><Close /></span>}
                </Grid>
              </Grid>
              <input type="hidden" id="arquivoUrl" value={url} />
              <input type="hidden" id="idContato" value={idContato} />
              <input type="hidden" id="idUsuario" value={props.id} />
              <input type="hidden" id="nomeContato" value={nomeContato} />
              <input type="hidden" id="nomeUsuario" value={props.usuario['nome']} />

              <Grid container>
                <Grid item xs={10}>
                  <TextField id="mensagem" label="Mensagem:" fullWidth />
                </Grid>
                <Grid item xs={1}>
                  <FirestoreMutation path="/mensagens" type="add">
                    {({runMutation})=>{
                      return <Button variant="contained" color="primary" fullWidth onClick={()=>{
                                  let idCont = document.querySelector('#idContato').value;
                                  let idUsr = document.querySelector('#idUsuario').value;
                                  let msgSend = document.querySelector('#mensagem').value;
                                  let imgSend = document.querySelector('#arquivoUrl').value;
                                  let nomeContato = document.querySelector('#nomeContato').value;
                                  let nomeUsuario = document.querySelector('#nomeUsuario').value;

                                  let msg = {
                                    autor: idUsr,
                                    de: nomeUsuario,
                                    recebedor: idCont,
                                    para: nomeContato,
                                    mensagem: msgSend,
                                    imagem: imgSend
                                  }

                                  if(idUsr != ""){
                                    runMutation(msg).then(res=>{
                                      document.querySelector('#formulario').reset();
                                      alert('Mensagem enviada!')
                                    })
                                  }
                                  else {
                                    alert('Por favor, selecione o contato novamente!')
                                  }
                              }}>
                               <Send />
                            </Button>
                    }}
                  </FirestoreMutation>
                </Grid>
              </Grid>
            </form>
   </React.Fragment>
}

export default Mensagens;
