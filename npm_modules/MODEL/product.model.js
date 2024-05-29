import { DataTypes } from "sequelize";
import sequelize  from "../DATABASE/dbConfig.js";

const Product =  sequelize.define("product",{
    product_id : {
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement : true
    },
    professional_id:{
        type : DataTypes.INTEGER,
        allowNull :false,
    },
    category_id :{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    price :{
        type : DataTypes.DOUBLE,
        allowNull :false,
    },
    title :{
        type : DataTypes.STRING,
        allowNull :false
    },
    description :{
        type : DataTypes.STRING(250),
        allowNull :false
    },
    // status :{
    //     type :DataTypes.STRING (20), // damage /ok
    //     allowNull :false,
    // },
    stock :{
        type : DataTypes.INTEGER,
        allowNull :false
    },
    cancle_price :{
       type:DataTypes.INTEGER,
       allowNull:false 
    }
})
const ProductImage = sequelize.define("ProductImages",{
    productImg_id :{
        type : DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
        autoIncrement : true
    },
    product_id:{
        type :DataTypes.INTEGER,
        allowNull :false
    },
    imageURL:{
        type : DataTypes.STRING(250),
        allowNull :false
    }
})
const ProductFeedback = sequelize.define("product_Feedback",{
    proFeedback_id :{
        type : DataTypes.INTEGER,
        allowNull :false,
        primaryKey : true,
        autoIncrement : true
    },user_id :{
        type : DataTypes.INTEGER,
        allowNull :false
    },
    product_id :{
        type :DataTypes.INTEGER,
        allowNull :false
    },
    feedback :{
        type : DataTypes.STRING(250),
        allowNull:false
    }
})
const Favourite_product = sequelize.define("favourite_product",{
    favProduct_id:{
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    user_id :{
        type : DataTypes.INTEGER,
        allowNull:false,
        },
        product_id :{
            type: DataTypes.INTEGER,
            allowNull :false
        }

})

sequelize.sync()
.then(()=>{
    console.log("Product table created....");
}).catch (err =>{
    console.log("Error during Product ,ProductImage table creation",err);
})
export  {Product,ProductImage,ProductFeedback,Favourite_product};
