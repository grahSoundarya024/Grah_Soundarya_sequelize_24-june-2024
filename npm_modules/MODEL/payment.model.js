import sequelize from '../DATABASE/dbConfig.js';
import { DataTypes } from "sequelize";
export const PaymentData = sequelize.define('PaymentTable',{
    razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull:false
    },
    razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull:false
    },
    razorpay_signature: {
        type: DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
   }
   ,
   sub_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
},

})