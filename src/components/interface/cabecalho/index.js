import React, { useState, useEffect } from 'react';
import imgEagle from '../../../icons/eagle.svg';
import { Card, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function Cabecalho(props){
  return <Card fullWidth className={props.estilo.cabecalho}>
          {props.tipo == 'cadastro' && <CardHeader title="Eagle Chat" avatar={<Avatar src={imgEagle} />} action={<IconButton className={props.estilo.btnCabecalho} component={Link} to="/login"><ArrowBackIos /></IconButton>}></CardHeader>}
          {props.tipo == 'agenda'  && <CardHeader title="Eagle Chat" avatar={<Avatar src={imgEagle} />} action={<IconButton className={props.estilo.btnCabecalho}  component={Link} to="/agenda"><ArrowBackIos /></IconButton>}></CardHeader>}
          {props.tipo == ''  && <CardHeader title="Eagle Chat" avatar={<Avatar src={imgEagle} />} ></CardHeader>}
          {props.tipo == undefined  && <CardHeader title="Eagle Chat" avatar={<Avatar src={imgEagle} />} ></CardHeader>}
        </Card>
}

export default Cabecalho;
