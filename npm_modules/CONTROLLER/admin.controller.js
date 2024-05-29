import Admin from '../MODEL/admin.model.js'
import User from '../MODEL/user.model.js'
import Professional from '../MODEL/professional.model.js'
import { ProductFeedback } from '../MODEL/product.model.js'
import { DesignFeedback } from '../MODEL/design.model.js'
import OrderItems from '../MODEL/ordersItems.model.js'
export const signUp = (request,response,next)=>{
    Admin.create({
        name : request.body.name,
        username : request.body.username,
        password : request.body.password,
    }).then(result =>{
        return response.status(200).json({message : 'Sign Up successfully...',data :result.dataValues})
    }).catch (err=>{
        console.log("Error inside catch.... "+err);
        return response.status(500).json({error : 'Internal server Problem...'})
    })
}
export const signIn = async (request,response,next)=>{
    let username = request.query.username;
    let password = request.query.password;

    let admin = await Admin.findOne({where: {username : username},raw: true});
    if(admin){                                                                     // email match 
        if(Admin.checkPassword (password,admin.password))
    //return bycrypt.compareSync(originalPassword,encryptedPassword); 
    return response.status(200).json({message : 'signIn success'})
    return response.status(401).json ({error : 'Unauthorized user'});
    } else
    return response.status(401).json({error : "unauthorized user "})
}
export const AllUserList = (request, response, next) => {
    User.findAll({ raw: true })
        .then(result => {
            return response.status(200).json({ data: result });
        }).catch(err => {
            console.log(err);
        })
}
export const getUserByEmail = (request, response, next) => {
    User.findOne({ where: { username: request.body.username }, raw: true })
        .then(result => {
            console.log(result);
            return response.status(200).json({ data: result })
        }).catch(err => {
            console.log(err);
        })
}
export const professionalList = (request, response, next) => {
    Professional.findAll({ raw: true })
        .then(result => {
            return response.status(200).json({ data: result });
        }).catch(err => {
            console.log(err);
            return response.status(400).json({ err: 'internal server error..' });
        })
}
export const getperticulerPro = (request, response, next) => {
    Professional.findOne({ where: { professional_id: request.body.professional_id }, raw: true })
        .then(result => {
            console.log(result);
            return response.status(200).json({ data: result })
        }).catch(err => {
            console.log(err);
        })
}
export const feedBackList = (request,response,next)=>{
    ProductFeedback.findAll({
    })
    .then(result => {
        console.log(result);
        return response.status(200).json({ data: result })
    }).catch(err => {
        console.log(err);
    })
}
export const designfeedbackList = (request,response,next)=>{
    DesignFeedback.findAll({
    })
    .then(result => {
        console.log(result);
        return response.status(200).json({ data: result })
    }).catch(err => {
        console.log(err);
    })
 
}
export const OrderList = (request,response,next)=>{
    OrderItems.findAll({
            })
            .then(result => {
                console.log(result);
                return response.status(200).json({ data: result })
            }).catch(err => {
                console.log(err);
            })
    }
    export const removeProfessional = (request,response,next)=>{
        Professional.destroy({where:{professional_id:request.body.professional_id},raw:true})
        .then(result=>{
            return response.status(200).json({message:" Professional Delete Succesfully"});
           }).catch(err=>{
            console.log(err);
            return response.status(500).json({error:"Internal Server Problem"});
           })
        }
        export const removeUser = (request,response,next)=>{
            User.destroy({where:{user_id:request.body.user_id},raw:true})
            .then(result=>{
                return response.status(200).json({message:" User Delete Succesfully"});
               }).catch(err=>{
                console.log(err);
                return response.status(500).json({error:"Internal Server Problem"});
               })
            }
    




