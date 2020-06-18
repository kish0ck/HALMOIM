import React, {useState} from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Mains from './Mains';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    marginTop: theme.spacing(5),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fffcf2',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
  },
}));

interface Props extends RouteComponentProps {}

const Main = ( {history}:Props ) => {
  const classes = useStyles();
  const [phone, setPhone] = useState('');


  return (
    <Mains {...history}/>
  )
}

export default Main
