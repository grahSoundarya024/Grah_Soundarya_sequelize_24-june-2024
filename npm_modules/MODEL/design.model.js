import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../DATABASE/dbConfig.js';

const RoomType = sequelize.define("roomType",{
    roomType_id:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    roomType :{
        type : DataTypes.STRING(100),
        allowNull : false,
        unique : true
    },
    image_url :{
       type :DataTypes.STRING(250),
       allowNull:false,
    }
});

 const Design = sequelize.define("design",{
    design_id:{
        type : DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement : true,
    },
    professional_id:{
        type : DataTypes.INTEGER,
        allowNull : false,
    },

    roomType_id :{
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    video :{
        type : DataTypes.STRING(250),
        allowNull : false
    },
    title:{
        type:DataTypes.STRING(7000),
        allowNull:true
    }
})
const Design_image = sequelize.define("design_image",{
    designImg_id :{
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    design_id :{
        type : DataTypes.INTEGER,
        allowNull:false,
},
        image_url :{
            type : DataTypes.STRING(200),
            allowNull :false,
            unique : true,
        },
        description : {
            type :DataTypes.STRING(250),
            allowNull : false
        },
    });
    const DesignFeedback = sequelize.define("design_feedback",{
        designFeedback_id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement:true
             
        },design_id :{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        user_id :{
            type : DataTypes.INTEGER,
            allowNull: false
        },
        feedback:{
            type:DataTypes.STRING(250),
            allowNull:false,
        }
    })

    const DesignFav = sequelize.define("favourite_design",{
        favDesign_id:{
            type :DataTypes.INTEGER,
            primaryKey :true,
            allowNull : false,
            autoIncrement :true
        },
        user_id:{
            type :DataTypes.INTEGER,
            allowNull:false
        },
        designImg_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })

sequelize.sync()
.then(()=>{
    console.log(" RoomType , Design , Design_image  Design_feedback table created...");    
}).catch (err =>{
    console.log("something went wrong when table created ",err);
});    



export   {RoomType,Design,Design_image,DesignFeedback,DesignFav};