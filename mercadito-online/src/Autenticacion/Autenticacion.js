import React from 'react';
import './Autenticacion.css'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";

class Autenticacion extends React.Component {
  state ={usuario: []}

  componentDidMount(){
    fetch("http://localhost:9000/users")
    .then(async res => {
      const data = await res.json();

      if(!res.ok){
        const error =(data  && data.message) || Response.status.Text;
        return Promise.reject(error);
      }
      this.setState({usuario: data});
      console.log(this.state.usuario);
    })
    .catch(error =>{
      
    })
  }
  login(){
    this.state.usuario.map((myuser)=>{
      if(myuser.email ==="Pablo@gmail.com"){
        if(myuser.password ==="123456"){
          console.log(myuser.email);
          console.log(myuser.password);
          //this.props.history.push('localhost:3000/admin');
        }
      }
    })
  }
  render() {
    return (
      <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Autenticarse
        </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="contraseña"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              component={Link} 
              to="/admin"
              onClick ={this.login()}
            >
              Acceder
          </Button>
          </form>
        </div>
      </Container>
    </div>
    );
  }
}

export default Autenticacion;