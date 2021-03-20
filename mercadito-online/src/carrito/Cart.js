import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import './Cart.css'
import './Details.css'
export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    
    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>Ningun producto</h2>
        }else{
            return (
                <>
                    {
                           <table className="cart">
                           <thead>
                             <tr>
                               <th>ID</th>
                               <th>Producto</th>
                               <th>Cantidad</th>
                               <th>Precio</th>
                               <th>Subtotal</th>
                               <th>Opciones</th>
                             </tr>
                           </thead>
                           <tbody>
                             {cart.map((item) => {
                               return (
                                 <tr key={item.id}>
                                   <td>{item.id}</td>
                                   <td>{item.title}</td>
                                   <td>
                                        <div className="amount">
                                            <button className="count" onClick={() => reduction(item.id)}> - </button>
                                            <span>{item.cantidad-(item.cantidad-1)}</span>
                                            <button className="count" onClick={() => increase(item.id)}> + </button>
                                        </div>
                                    </td>
                                    <td>{item.precio}</td>
                                    <td><span>L.{item.precio * item.cantidad}</span></td>
                                    <td className="delete" onClick={() => removeProduct(item.id)}>QUITAR</td>
                                 </tr>
                               );
                             })}
                           </tbody>
                         </table>
                       
                    }
                    <div className="total">
                        <Link to="/payment">Payment</Link>
                        <h3>Total: L.{total}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart
