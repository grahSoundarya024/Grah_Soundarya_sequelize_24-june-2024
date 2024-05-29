// for passord encription dependency : npm install bcrypt;
import { DataTypes } from "sequelize";
import sequelize from "../DATABASE/dbConfig.js";
import bcrypt from 'bcryptjs';

const User = sequelize.define("user",{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement :true

    },
    name :{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    username :{
        type:DataTypes.STRING(100),
        allowNull:false,    
        unique:true
    },
    password :{                                               // Password Encription...
        type: DataTypes.STRING,
        allowNull:false,
        set(value){
            let saltKey = bcrypt.genSaltSync(10)
            let encryptedPassword = bcrypt.hashSync(value,saltKey);
            this.setDataValue("password",encryptedPassword);    
        }
    },
    contact_no:{
        type: DataTypes.STRING(11),
        allowNull:false,    
        unique:true

    },
    sub_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
});
                                                                   
User.checkPassword = (originalPassword,encryptedPassword)=>{     // password decrypt
console.log("CheckPassword called");
return bcrypt.compareSync(originalPassword,encryptedPassword);
}

sequelize.sync()
.then(()=>{
    console.log("User table created successfully....");
}).catch(err=>{
    console.log("Error during create table..",err)
})
export default User;