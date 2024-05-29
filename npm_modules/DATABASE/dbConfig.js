import { Sequelize } from "sequelize"
const sequelize = new Sequelize("grah_soundaryasequelizedb","root","root",{
    host : 'localhost',
    dialect : "mysql"
}) 
sequelize.authenticate()
.then(()=>{
    console.log("Database Connected");
}).catch(err=>{
    console.log("Error in Database Connection",err)
})

export default sequelize;