import { DataTypes } from "sequelize";
import sequelize from "../DATABASE/dbConfig.js";

const Subscription = sequelize.define("subscription",{
    sub_id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
        },
    name:{
        type : DataTypes.STRING(100),
        alloNull:false,
    },
        amount:{
            type : DataTypes.DOUBLE, 
            allowNull:false,
    },
    subscription_active: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },

    subscription_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    subscription_end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    professional_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //     subscription_start:{
    //     type:DataTypes.DATE,
    //     allowNull:false,
    //     defaultValue:DataTypes.NOW
    // },
    // subscription_end: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     defaultValue: sequelize.literal('DATE_ADD(NOW(), INTERVAL 1 MONTH)') // Set default value to current date + 1 month
    // }
}, {
        sequelize,
        timestamps:false,
    });

      sequelize.sync()
    .then(() => {
        console.log("Subscription table created....");
    }).catch(err => {
        console.log("Error during create table..", err)
    });

    export default Subscription;


    // subscription_start:{
    //     type:DataTypes.DATE,
    //     allowNull:false,
    //     defaultValue:DataTypes.NOW
    // },
    // subscription_end: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     defaultValue: sequelize.literal('DATE_ADD(NOW(), INTERVAL 1 MONTH)') // Set default value to current date + 1 month

    // }
