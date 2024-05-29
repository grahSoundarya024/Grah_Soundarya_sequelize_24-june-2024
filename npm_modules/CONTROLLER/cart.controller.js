
//                 // cart_id: request.body.cart_id,
//                 cart_id: cart.id,
//                 quantity: request.body.quantity,
//             });
//             return response.status(200).json({ message: 'Product added successfully ' })
//         } else {
//             let createCart = await Cart.create({
//                 user_id: request.body.user_id
//             })
//             if (createCart) {
//                 let newCart = await Cart.findOne({ where: { user_id: request.body.user_id }, raw: true });
//                 if(newCart){
//                 await CartItems.create({
//                     product_id: request.body.product_id,
//                     // cart_id: request.body.cart_id,
//                     cart_id: newCart.id,
//                     quantity: request.body.quantity,
                
//                 })
//             }
//                 return response.status(200).json({ message: 'Product added successfully in the cart' })
//             }
//             return response.status(500).json({ error: 'Internal server Problem' })
//         }
//     } catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: 'Internal server Problem...' })
//     }

// }
// postman se cart id send krne ki need nhi hai 
import Cart from '../MODEL/cart.model.js';
import CartItems from '../MODEL/CartItem.model.js';

export const addToCart = async (request, response, next) => {
    try {
        let cart = await Cart.findOne({ where: { user_id: request.body.user_id } });

        if (!cart) {
            cart = await Cart.create({
                user_id: request.body.user_id
            });
            return response.status(200).json({message : 'Cart successfully created click on send for add product ' })
        }
        const cartId = cart.cart_id;
        console.log("cartId "+cartId )

        await CartItems.create({
            product_id: request.body.product_id,
            cart_id: cartId,
            quantity: request.body.quantity,
        });

        return response.status(200).json({ message: 'Product added successfully to the cart' });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: 'Internal server problem' });
    }
}
