import React,{useState, useEffect} from 'react'
import {storeProducts,detailProduct} from './data';



const ProductContext = React.createContext();

let cartArray = [];

function ProductProvider(props) {
    const [product, setproduct] = useState([]);
    const [detail, setdetail] = useState(detailProduct);
    const [cart, setcart] = useState(cartArray);
    const [modalOpen, setmodalOpen] = useState(false);
    const [modalProduct, setmodalProduct] = useState(detailProduct);
    const [subTotal, setsubTotal] = useState(0);
    const [cartTax, setcartTax] = useState(0);
    const [cartTotal, setcartTotal] = useState(0);


    useEffect(() => {
        setMethod();
    }, [])

    useEffect(() => {
        addTotal();
        console.log(cart);
    }, [cart])

    const setMethod=()=>
    {
        let temProduct = [];
        storeProducts.forEach(item => {
            const singleProduct = {...item};
            temProduct = [...temProduct, singleProduct];
        })
       return setproduct(temProduct);
    }

    const handleDetail = ()=>
    {
        console.log("this will handle the detail");
    }

    const getItem = id=>
    {
        const temProduct = product.find(item => item.id === id);
        return temProduct;
    }

    const addToCart = id =>
    {
       let tempProduct = [...product];
       const index = tempProduct.indexOf(getItem(id));
       const newProduct = tempProduct[index];
       newProduct.inCart = true;
       newProduct.count = 1;
       const price = newProduct.price;
       newProduct.total = price;

       setcart([...cart,newProduct]);
       setproduct(tempProduct);



       addTotal()
 
    }

    const openModal = id=>
    {
        const temProduct = getItem(id);
        return(
            setmodalProduct(temProduct),
            setmodalOpen(true)
        )
    }

    const closeModal = id=>
    {
        const temProduct = getItem(id);
        
        return setmodalOpen(false)
    }

    const increment = id =>{
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item=>item.id === id)

        const index = tempCart.indexOf(selectedProduct);

        const product = tempCart[index];

        product.count = product.count + 1;

        product.total = product.count * product.price;

        setcart([...tempCart]);

        addTotal();
    }

    const decrement = id =>{
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item=>item.id === id)

        const index = tempCart.indexOf(selectedProduct);

        const deproduct = tempCart[index];

        deproduct.count = deproduct.count - 1;
        if(deproduct.count === 0)
        {
            removeItem(id);
        }else{
            deproduct.total = deproduct.count * deproduct.price;
            setcart([...tempCart]);
            addTotal();
        }


    }

    const removeItem = id =>{
        let removeProduct = [...product];
        let tempCart = [...cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = removeProduct.indexOf(getItem(id));
        let removeItem = removeProduct[index];
        removeItem.inCart = false;
        removeItem.count = 0;
        removeItem.total = 0;

        setcart(tempCart);
        setproduct(removeProduct);
        addTotal();

    }
    const clearCart = () =>{
        setcart([])
        setMethod();
        addTotal();
    }

    const addTotal = () =>{
        let newSubtotal = 0;
        cart.map(item=>
            {
                newSubtotal += item.total;
            });
        const tempTax = newSubtotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = newSubtotal + tax;

        setsubTotal(newSubtotal);
        console.log(cart);
        setcartTax(tax);
        setcartTotal(total);
    }

    return (
        <ProductContext.Provider value={
            {
                product:product,
                detail:detail,
                cart: cart,
                modalOpen:modalOpen,
                modalProduct:modalProduct,
                subTotal:subTotal,
                cartTax:cartTax,
                cartTotal:cartTotal,
                handleDetail:handleDetail,
                addToCart:addToCart,
                openModal:openModal,
                closeModal:closeModal,
                increment:increment,
                decrement:decrement,
                removeItem:removeItem,
                clearCart:clearCart
            }
        }>
            {props.children}
        </ProductContext.Provider>
    )
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}
