import { getShoppingCart } from "../utilities/fakedb";

const CartProductLoader = async () =>{
   const loadedProducts = await fetch('products.json');
   const products = await loadedProducts.json();
   //if cart data is in database ,you have to use async await
   const storedCart = getShoppingCart();
   console.log(storedCart);
   const savedCart = [];
   for(const id in storedCart){
    const addedProduct = products.find(pd => pd.id === id);
    if(addedProduct){
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
    }
   }
   //console.log(products);
   //if you need to send two things
//    return {savedCart,cart: savedCart};
   //another option
//    return [savedCart,savedCart];
   return savedCart;
}
export default CartProductLoader;