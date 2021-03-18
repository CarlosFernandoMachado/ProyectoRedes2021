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
import { DataContext } from '../Context';
import Navbar from '../Navbar/Navbar';
import { Redirect } from 'react-router-dom';
class Autenticacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usuario: [], email: "", password: "", redirect: false }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextType = DataContext;

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    this.state.usuario.map((myuser) => {
      if (myuser.email === this.state.email) {
        if (myuser.password === this.state.password) {
          if (myuser.admin === true) {
            this.props.Autenticar();
            this.setState({ redirect: true });
          }


        }
      }
    })
    event.preventDefault();
  }

  componentDidMount() {
    fetch("http://localhost:9000/users")
      .then(async res => {
        const data = await res.json();

        if (!res.ok) {
          const error = (data && data.message) || Response.status.Text;
          return Promise.reject(error);
        }
        this.setState({ usuario: data });

      })
      .catch(error => {

      })
  }
  login() {
    this.state.usuario.map((myuser) => {
      if (myuser.email === this.state.email) {
        if (myuser.password === this.state.password) {
          if (myuser.admin === true) {
            return "/admin"
          } else {
            return "/autenticacion"
          }

        }
      }
    })
  }

  render() {
    const { EstaAutenticado, usuarios, login } = this.context;
    return (
      <div>
        <Navbar Autenticado={this.state.redirect} />
        { this.state.redirect ? (<Redirect push to="/admin" />) : null}
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar">
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Autenticarse
        </Typography>
            <form className="form" noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                autoFocus
                value={this.state.email} onChange={this.handleEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                id="contraseña"
                value={this.state.password} onChange={this.handlePassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={() => this.props.Autenticar()}
                value="Submit"
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