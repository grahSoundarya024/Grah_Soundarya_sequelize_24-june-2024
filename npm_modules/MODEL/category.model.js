import { DataTypes } from "sequelize";
import sequelize from "../DATABASE/dbConfig.js";

const Category = sequelize.define("category",{
    category_id : {
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement :true
    },
    category_name :{
        type : DataTypes.STRING(100),
        allowNull : false,
        unique : true
    },
    category_image :{
        type :DataTypes.STRING(250),
        allowNull :false
    }
})
sequelize.sync ()
.then(()=>{
    console.log("Category table created....")
}).catch (err=>{
    console.log("Error during category table created....",err)
})
export default Category;