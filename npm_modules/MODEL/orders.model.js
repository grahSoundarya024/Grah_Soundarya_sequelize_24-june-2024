import { DataTypes } from 'sequelize';
import sequelize from '../DATABASE/dbConfig.js';

const Orders = sequelize.define("Orders",{
    order_id :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id:{
        type : DataTypes.INTEGER,
        allowNull : false,
},
        //NOT UNIQUE B/C multiple orders can be placed by the same user ||same user can place mult order

    bill_amount :{
        type : DataTypes.DOUBLE,
        allowNull : false
    },
    order_date :{
        type : DataTypes.DATE,
        allowNull :false,
        defaultValue :DataTypes.NOW
    },
    delivery_date :{
        type : DataTypes.DATE,
        allowNull : false,
    },
    status :{
        type : DataTypes.STRING (15),
        allowNull : false,
    },
    contact_no :{
        type : DataTypes.STRING(10),
        allowNull : false,                  // multiple order  same contact_no possible 
    }

})
sequelize.sync ()
.then(()=>{
    console.log("Orders table created.....")
}).catch (err =>{
    console.log("Error during Orders table created",err)
})
export default  Orders;