import { DataTypes } from "sequelize";
import sequelize from "../DATABASE/dbConfig.js";
import bcrypt from 'bcryptjs';

const Admin = sequelize.define("admin",{
    admin_id :{
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement : true
    },
    username :{
        type : DataTypes.STRING (100),
        allowNull: false,
        unique : true
    },
    password :{
        type :DataTypes.STRING,
        allowNull :false,
            set(value){                                                 // value = password
                let saltkey = bcrypt.genSaltSync(10);
                let encryptedPassword = bcrypt.hashSync(value,saltkey);
                this.setDataValue("password",encryptedPassword);
            }
    }
});
Admin.checkPassword = (originalPassword , encryptedPassword)=>{
    console.log("check password called ")
    return bcrypt.compareSync(originalPassword,encryptedPassword); 
}
sequelize.sync()
.then(()=>{
    console.log("Admin table created successfully");
}).catch(err =>{
    console.log("Something went to wrong...",err);
})
export default Admin;
