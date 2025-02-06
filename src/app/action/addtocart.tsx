export interface Product {
    _id: number;
    name: string;
    stock: number;
    price: string;
    discountPercent: number;
    priceWithoutDiscount: string;
    description: string;
    rating: number;
    imageUrl: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
    isnew: boolean;
    slug: {
      _type: "slug";
      current: string;
    };
    category: string;
    color: string;
    quantity: number;
  }

export const addToCart = (product : Product) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProductIndex = cart.findIndex(item => item._id === product._id)

    if(existingProductIndex > -1) {
        cart[existingProductIndex].stock += 1
    }
    else {
        cart.push({
            ...product, stock: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (productId : number) => {
    let cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id !== productId)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateCartQuantity = (productId :number, quantity : number) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if(productIndex > -1) {
        cart[productIndex].stock = quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const getCartItems = () : Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}