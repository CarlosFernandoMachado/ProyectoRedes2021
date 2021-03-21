import React, { Component } from 'react'
import axios from 'axios';
export const DataContext = React.createContext();
export class DataProvider extends Component {

    state = {
        products: [],
        pedidos:[],
        cart: [],
        total: 0,
        usuarios:[],
        EstaAutenticado:false
        
    };
   
    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item.id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product.id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };
    addPedido = (title, direccion, telefono) =>{
        if(title!== "" && direccion!=="" && telefono!==""){
            const {cart, total} = this.state;
            var comprado="";
            cart.forEach((item,index) =>{
                comprado = comprado + item.title +" cantidad: "+item.cantidad+" Precio/u: "+item.precio+"\n";
            })
            const mipedido ={
                title:title,
                direccion: direccion,
                telefono: telefono,
                contenido: comprado,
                precio: total,
                completado: false,
            }
            axios.post('http://localhost:9000/Pedidos', mipedido)
            .then(response=>{
                this.getTotal();
                cart.forEach((item, index) =>{   
                    cart.splice(index, 1)
                })
                this.setState({cart: cart});
                alert("Se ha realizado el pedido con exito");
            })
            .catch(error=>{
                console.log(error)
            })
          
        }else{
            alert("Debe llenar todos los campos (nombre, direccion, telefono y al menos un producto)");
        }
       
    };
    login=(email, password)=>{
        const {usuarios, EstaAutenticado} = this.state;
        const check = usuarios.every(item=>{
            return item.email === email
        })
        if(check){
            const valido = usuarios.every(item=>{
                return item.password === password
            })
            if(valido){
                return "/admin";
                
            }else{
                return "/";
            }
        }
    }
    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.id === id){
                item.cantidad === 1 ? item.cantidad = 1 : item.cantidad -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.id === id){
                item.cantidad += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item.id === id){
                    item.cantidad =1;
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };
    removeProductoInventario = id =>{
        if(window.confirm("Borrar este producto del inventario?")){
            const {products} = this.state;
            products.forEach((item, index) =>{
                if(item.id === id){
                    products.splice(index, 1)
                }
            })
            this.setState({products: products});
            const url = "http://localhost:9000/Productos/"+id;
            axios.delete(url)
            .then(res => {
              console.log(res);
              console.log(res.data);
        
            })
        }
       
    };
    actualizar_productos = (id,title,cantidad,precio) =>{
        const datos={
            id:id,
            title:title,
            cantidad:cantidad,
            precio:precio
        }
        const {products} = this.state;
        products.forEach((item, index) =>{
            if(item.id === id){
                products[index]=datos;
            }
        })
        this.setState({products: products});       
    };
    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.precio * item.cantidad);
        },0)
        this.setState({total: res})
    };
   
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };
    componentWillUnmount(){
        fetch("http://localhost:9000/Productos")
        .then(res => res.json())
        .then(res => this.setState({ products: res }));

        fetch("http://localhost:9000/users")
        .then(res => res.json())
        .then(res => this.setState({ usuarios: res }));
        
        fetch("http://localhost:9000/Pedidos")
        .then(res => res.json())
        .then(res => this.setState({ pedidos: res }));
    }
    componentDidMount(){
        fetch("http://localhost:9000/Productos")
        .then(res => res.json())
        .then(res => this.setState({ products: res }));

        fetch("http://localhost:9000/Pedidos")
        .then(res => res.json())
        .then(res => this.setState({ pedidos: res }));
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {EstaAutenticado, usuarios,products, cart,total,pedidos} = this.state;
        const {login,removeProductoInventario,actualizar_productos,addCart,reduction,increase,addPedido,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{EstaAutenticado, usuarios, login, products,actualizar_productos, removeProductoInventario,addCart, cart, reduction,increase,addPedido,removeProduct,total,getTotal,pedidos}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


