import { Product } from "../../../types/products";

export const addtoCart = (product: Product)=>{
    const cart :Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex = cart.findIndex((item:Product) => item._id === product._id);

    if(existingProductIndex > -1){
        cart[existingProductIndex].stock += 1;
}else{
    cart.push({...product, stock: 1 });
}

localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeFromCart =(productId: number)=> {
    let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter (item=> item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}
export const updatedCart =(productId: number, quantity: number)=> {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex (item=> item._id !== productId);
    

    if(productIndex > -1){
        cart[productIndex].stock = quantity;
    }
}
export const getCartItems =() : Product[] => {
   return JSON.parse(localStorage.getItem('cart') || '[]');
}