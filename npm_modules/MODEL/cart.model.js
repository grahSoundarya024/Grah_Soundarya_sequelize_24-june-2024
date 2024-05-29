import { DataTypes } from "sequelize";
import sequelize from "../DATABASE/dbConfig.js";

const Cart = sequelize.define("cart",{
    cart_id :{
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement :true,
    },
    user_id :{
        type :DataTypes.INTEGER,
        unique :true,
        allowNull :false,
    }
})
sequelize.sync()
.then(()=>{
    console.log("cart table created..")
}).catch(err =>{
    console.log("Error during cart table create...",err);
})
export default Cart ;