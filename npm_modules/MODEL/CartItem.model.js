import { DataTypes } from "sequelize";
import sequelize  from "../DATABASE/dbConfig.js";

const CartItem = sequelize.define("cartItems",{
    item_id :{
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement :true,
        },
        product_id :{
            type :DataTypes.INTEGER,
            allowNull :false,
        },

        cart_id :{
            type :DataTypes.INTEGER,
            allowNull :false,
    },
            quantity :{
                type : DataTypes.INTEGER,
                allowNull : false,
            }
        
})
sequelize.sync()
.then(()=>{
    console.log("cartItems table created....");
}).catch (err =>{
    console.log("Error during cartItems creations....",err);
})
export default CartItem;