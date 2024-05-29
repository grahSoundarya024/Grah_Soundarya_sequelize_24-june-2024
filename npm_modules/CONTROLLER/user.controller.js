// validate data from postman dependancy is express-validator...
import { validationResult } from 'express-validator';
import User from '../MODEL/user.model.js';

// export const signIn = async (request,response,next)=>{
//     let username = request.query.username;
//      let password = request.query.password;
//      console.log("username ......................................."+request.query.username+" password ........................................."+request.query.password)

//      let user = await User. findOne({where:{username:username},raw:true});

//      if(user){
//         if(User.checkPassword(password,user.password))   
         
//         return response.status(200).json({message :"signIn success"});
//         return response.status(401).json({error: 'Unauthorized User'})
//     } else 
    
//     return response.status(401).json({error : 'UnAuthorized User '})
// }

export const signIn = async (request,response,next)=>{
        let username = request.query.username;
        let password = request.query.password;
        console.log("Username: " + username + ", Password: " + password);
      
        try {
          let user = await User.findOne({ where: { username: username }, raw: true });
      
          if (user) {
            if (User.checkPassword(password, user.password)) {
              // Sign-in successful, send user data in the response
              const userData = {
                user_id: user.user_id,
                name: user.name,
                email: user.username,
                // Add other user data as needed
              };
              return response.status(200).json({ message: "Sign In success", user: userData });
            }
            return response.status(401).json({ error: 'Unauthorized User' });
          } else {
            return response.status(401).json({ error: 'Unauthorized User' });
          }
        } catch (err) {
          console.error(err);
          return response.status(500).json({ error: 'Internal Server Error' });
        }
      }


export const signUp = (request,response,next)=>{
    const errors = validationResult(request)
    if(!errors.isEmpty())
    return response.status(401).json({error: errors.array()})
    User.create({

    name : request.body.name,
    username : request.body.username,
    password : request.body.password,
    contact_no : request.body.contact_no,
})

.then(result=>{
    return response.status(200).json({data: result.dataValues, message: "User Ragisterd successfully."});
  }).catch(err=>{
      console.log(err);
      return response.status(500).json({error: "Internal Server Error.."});
  })
}


        


