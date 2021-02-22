import React, { Component } from 'react';
import './Tabla_Productos.css';
class Tabla_Productos extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         apiResponse: [[]]
      }
   }
   callAPI() {
        //fetch("http://localhost:9000/Productos")
          //  .then(res => res.json())
            //.then(res => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }
    componentDidUpdate(){
        this.callAPI();
    }
   renderTableData() {
    return this.state.apiResponse.map((producto, index) => {
       const { id, title, cantidad, precio } = producto //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{title}</td>
             <td>{cantidad}</td>
             <td>{precio}</td>
             
             <td><select>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </td>
          </tr>
       )
    })
 }

 renderTableHeader() {
    let header = Object.keys(this.state.apiResponse[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

 render() {
    return (
       <div>
          <h1 id='title'>Productos de la tienda</h1>
          <table id='students'>
              <thead>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Cantidad a Comprar</th>
              </thead>
             <tbody>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    );
 }
}

export default Tabla_Productos