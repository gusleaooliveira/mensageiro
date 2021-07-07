import React, {useState, useEffect} from 'react';
import { Fab, Accordion,AccordionSummary,Typography, CardContent, CardHeader, AccordionDetails, Card, Avatar} from '@material-ui/core';
import { ExpandMore, Add } from '@material-ui/icons';
import { FirestoreCollection } from '@react-firebase/firestore';
import { Link } from 'react-router-dom';
import imgUsr from '../../../icons/usuario.svg';

function Agenda(props){
    return <div>
              <FirestoreCollection path="/contatos">
                {d=>{
                  if(d.isLoading) return <p><b>Carregando!</b></p>;
                  if(d.value.length > 0){
                    return <div>
                              {d.value.map((item, indice)=>{
                                if(item['idUsuario'] == props.id){
                                  return  <Accordion fullWidth>
                                            <AccordionSummary expandIcon={<ExpandMore />}>
                                              <Typography className={props.estilo.tituloCabecalho}>{item['nome']}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              <Card fullWidth className={props.estilo.cartao}>
                                                <Typography>
                                                <CardHeader  avatar={<Avatar aria-label={item['nome']} src={imgUsr}  />} title={item['nome']} />
                                                  <CardContent>
                                                    <p><b>Email:</b>{item['email']}</p>
                                                    <p><b>Telefone:</b>{item['telefone']}</p>
                                                  </CardContent>
                                                </Typography>
                                              </Card>
                                            </AccordionDetails>
                                          </Accordion>;
                                }
                              })}
                           </div>
                  }
                }}
              </FirestoreCollection>
              <Fab color="primary" className={props.estilo.fab} component={Link} to="/contato" aria-label="add">
                <Add />
              </Fab>
            </div>
}

export default Agenda
