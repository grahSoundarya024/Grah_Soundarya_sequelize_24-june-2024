import { DataTypes } from "sequelize";
import sequelize from "../DATABASE/dbConfig.js";

const Professional = sequelize.define("professional", {
    professional_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    professional_name: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    contact_no: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    is_active: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        unique: true,
        allowNull: false
    },
    profileImg_URL: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
//     customCreatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW
// }
customCreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
},
customUpdatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
}


}, {
    sequelize,
    timestamps: false,
});

sequelize.sync()
    .then(() => {
        console.log("Professional table created....");
    }).catch(err => {
        console.log("Error during create table..", err)
    });



export default Professional;
