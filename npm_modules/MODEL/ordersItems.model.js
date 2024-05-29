import { DataTypes } from 'sequelize';
import sequelize from '../DATABASE/dbConfig.js';

const OrderItems = sequelize.define("orderItems",{
    item_id :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    order_id:{
        type : DataTypes.INTEGER,
        allowNull : false,  
    },
    product_id :{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    quantity :{
        type : DataTypes.INTEGER,
        allowNull : false 
    },
})
sequelize.sync ()
.then (()=>{
    console.log("Orders Items created successfully...");
}).catch (err=>{
    console.log("Error during OrdersItems created...",err);
})
export default OrderItems ;