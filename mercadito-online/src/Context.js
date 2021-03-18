import React, { Component } from 'react'
export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [],
        cart: [],
        total: 0,
        usuarios:[]
        
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
    login=(email, password)=>{
        const {usuarios, redirect} = this.state;
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
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
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
    }
    componentDidMount(){
        fetch("http://localhost:9000/Productos")
        .then(res => res.json())
        .then(res => this.setState({ products: res }));
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
        const {usuarios,products, cart,total} = this.state;
        const {login,addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{usuarios, login, products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


