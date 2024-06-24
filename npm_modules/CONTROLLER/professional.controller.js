import { request, response } from 'express';
import Professional from '../MODEL/professional.model.js';
import Subscription from '../MODEL/subscription.model.js';
import { Design,  DesignFeedback, Design_image } from '../MODEL/design.model.js';
import User from '../MODEL/user.model.js';
import xlsx from 'xlsx';
import { PaymentData } from '../MODEL/payment.model.js';

// import Professional from '../MODEL/professional.model.js'; //excel
// import Subscription from '../MODEL/subscription.model.js';
// import { Design,  DesignFeedback, Design_image } from '../MODEL/design.model.js';
// import User from '../MODEL/user.model.js';


// export const subscription = async (request, response, next) => {
//     const workbook = xlsx.readFile('Professionals.xlsx');
//     const sheet_name = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheet_name];
//     console.log(request.body);

//     // Convert the sheet to JSON
//     const data = xlsx.utils.sheet_to_json(sheet);
//     console.log(data);

//     try {
//         for (let item of data) {
//             let professional_name = item.professional_name;
//             let city = item.city;
//             let address = item.address;
//             let pincode = item.pincode;
//             let gender = item.gender;
//             let contact_no = item.contact_no;
//             let email = item.email;
//             let profileImg_URL = item.profileImg_URL;

//             console.log(professional_name + " " + city + " " + address + " " + pincode + " " + gender + " " + contact_no + " " + email + " " + profileImg_URL);

//             await Professional.create({
//                 professional_name,city,address,pincode,gender,contact_no,email,profileImg_URL
//             })
//         }
//         return response.status(200).json({ message: "professional created successfully" });
//     } catch (err) {
//         console.log(err);
//         return response.status(501).json({ error: "Internal server error" });
//     }
// }
    

export const getprofessionalBycity = async (request, response, next) => {
    try {
        let proExist = await Professional.findAll({ where: { city: request.query.city }, raw: true })
        console.log("proExist "+proExist); // [object Object]
        if (proExist.length > 0) {
            return response.status(200).json({ message: "Professionals are from Given city : ", data: proExist })
        } else {
            return response.status(500).json({ error: "Professional not found in this city " })
        }
    } catch (err) {
        console.log("Error inside catch" + err);
        return response.status(500).json({ error: 'Internal server Error ' })
    }
}


export const reviewOnDesign = async(request,response,next)=>{
try {
    const design_id = request.body.design_id;
    console.log('Design ID:.........................................................', design_id);

    const design = await Design.findOne({
        where:{design_id : design_id},
        include:[
            {
                model : Professional,
                attributes :['professional_id','professional_name','email']
            },{
                model : DesignFeedback,
                attributes:['feedback'],
                include :[
                    {
                        model : User,
                        attributes : ['username']
                    }
                ]
            },{
                model : Design_image,
                attributes:['image_url','description']
            }
        ]
    });
    console.log('Design:', design);
    if(!design){
        return response.status(404).json({ message: 'Design not found' });
    }
    const professional_id = design.professional ? design.professional.professional_id : null;
    const professional_name = design.professional ? design.professional.professional_name : null;
    const email = design.professional ? design.professional.email : null;


    const formattedData = {
        design_id: design.design_id,
        username: design.design_feedbacks.length > 0 ? design.design_feedbacks[0].user.username : null,
        feedback: design.design_feedbacks.length > 0 ? design.design_feedbacks[0].feedback : null,
        image_url: design.design_images.length > 0 ? design.design_images[0].image_url : null,
        description: design.design_images.length > 0 ? design.design_images[0].description : null,
        professional_id: professional_id,
        professional_name: professional_name,
        email: email
              };
  
      return response.status(200).json({ data: [formattedData] });

}catch (error){
    console.error(error);
    return response.status(500).json({ message: 'Server error' });

}
}
export const subscribedList  = async(request,response,next)=>{
    try {
        const designers = await Professional.findAll({
        //   attributes: ['professional_id','profileImg_URL', 'professional_name', 'email'],
        });
    
        response.status(200).json({ designers });
      } catch (error) {
        console.error('Error fetching designers:', error);
        response.status(500).json({ error: 'Error fetching designers' });
      }
    };
        
// import { response } from 'express';
// import Professional from '../MODEL/professional.model.js';
// import Subscription from '../MODEL/subscription.model.js';
// import { Design,  DesignFeedback, Design_image } from '../MODEL/design.model.js';
// import User from '../MODEL/user.model.js';


// export const subscription = async (request, response, next) => {
//      try {
//         let professional_id = request.body.professional_id;
//         console.log("professional_id ",request.body.professional_id);


//         let result = await Professional.findOne({ where: { professional_id: professional_id }, raw: true })

//         // console.log("result "+result.professional_id) //obj / null
//         console.log("result "+result) //obj / null

        
//         if (result) {
//             // professional exist and then we have save subscription in sunscription table
//             let pro_id = result.professional_id;
//             let subscriptionEndDate = new Date();
//             subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
//             //track the user so he cannot take 2 or more subs at same

//             // let alreadytakenSub = await Subscription.findOne({ where: { professional_id : result.professional_id }, raw: true })
//             // if(alreadytakenSub){
//             //     return response.status(200).json({message : "you have already active subscription ..."})
//             // }
    

// console.log("pro_id in subscriptuion table " + pro_id);
//             await Subscription.create({
//                 name: request.body.name,
//                 amount: request.body.amount,
//                 professional_id: pro_id,
//                 subscription_start: new Date(),
//                 subscription_end: subscriptionEndDate

//             })
//             return response.status(200).json({ message: 'subscription taken successfully' });
//          }
//      else {
//     //         //==============================================================================================
//             const { filename } = request.file;
//             let createprofessional = await Professional.create({

//                 professional_name: request.body.professional_name,
//                 city: request.body.city,
//                 address: request.body.address,
//                 pincode: request.body.pincode,
//                 gender: request.body.gender,
//                 contact_no: request.body.contact_no,
//                 email: request.body.email,
//                 profileImg_URL: "images/" + filename
//             });
//             console.log ("isProfessional created  "+createprofessional.professional_id)
//             if (createprofessional) {

//                 let pro_id = createprofessional.professional_id;
//                 let subscriptionEndDate = new Date();
//                 subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
            

//              await Subscription.create({
//                     name: request.body.name,
//                     amount: request.body.amount,
//                     professional_id: pro_id,
//                     subscription_start: new Date(),
//                     subscription_end: subscriptionEndDate
            
//                 }).then(result =>{
//                 return response.status(200).json({ message: "professional created successfully" ,data : result });
//             })
//             } else {
//                 return response.status(500).json({ error: "Internal server Problem " });
//             }
//         }
//     } 
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: 'Internal server Problem...' })
//      }
//     }


// export const subscription = async (request, response, next) => {
//   try {
//     console.log(request.body);
//     let { email } = request.body;

//     let professional = await Professional.findOne({ where: { email } });
//     console.log(professional);
//     if (!professional) professional = await Professional.create(request.body);

//     let subscription = await Subscription.findOne({
//       where: {
//         professional_id: professional.professional_id,
//         subscription_active: 1,
//       },
//     });

//     console.log("subscription", subscription);
//     if (subscription)
//       return response
//         .status(203)
//         .json({ Message: "You are already subscribed...." });

//     // console.log(new Date());
//             let subscriptionEndDate = new Date();
//             subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

//     let subscribtion = await Subscription.create({
//       name: "Monthly Subscription Plan",
//       amount: 999,
//       subscription_start: new Date(),
//       subscription_end: subscriptionEndDate,
//       professional_id: professional.professional_id,
//     });

//     return response.status(200)
//       .json({ Message: "You are Subscribed successfully....", subscribtion });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({ Error: "Internal server error" });
//   }
// }; 
//  above code work fine for payment 1sub 1pay

 export const subscription = async (request, response, next) => {
  try {
    console.log(request.body);
    let { email } = request.body;

    let professional = await Professional.findOne({ where: { email } });
    console.log(professional);
    if (!professional) professional = await Professional.create(request.body);

    let subscription = await Subscription.findOne({
      where: {
        professional_id: professional.professional_id,
        subscription_active: 1,
      },
    });
    console.log("subscription", subscription);

    if (subscription) {
      let existPayment = await PaymentData.findOne({ where: { sub_id: subscription.sub_id } });
      if (existPayment) {
        return response.status(203).json({ Message: "You are already subscribed...." });
      }
    }

    let subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    let newSubscription = await Subscription.create({
      name: "Monthly Subscription Plan",
      amount: 999,
      subscription_start: new Date(),
      subscription_end: subscriptionEndDate,
      professional_id: professional.professional_id,
    });
    console.log(  ({ Message: "You are Subscribed successfully....", subscription: newSubscription }));

    return response.status(200).json({ Message: "You are Subscribed successfully....", subscription: newSubscription });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ Error: "Internal server error" });
  }
};



//2 condition username == pro_email && subscription_active = 1; 

// export const continueAsPro = async(request,response,next)=>{
// try{
// console.log(request.body);
// let {username} = request.body; 
// let professional = await Professional.findOne({where:{email : username}});
// console.log(professional);
// if(!professional){
//   return response.status(200).json({message :"Professional not found. Please subscribe before uploading a design."});
//   }
//   let subscription = await Subscription.findOne({
//     where:{
//       professional_id : professional.professional_id,
//       subscription_active: 1,
//     }
//   })
//   console.log("subscription", subscription);
//   if(subscription){
//     return response.status(200).json({message:"professional your subscription is active",data: subscription })
//   } else {
//     return response.status(200).json({message:" you're subscription is expired"})

//   }
// }
//  catch(err){
// console.log("Error found in catch "+err);
// return response.status(500).json({error:"Internal server Error"});
// }
// }


export const continueAsPro = async(request,response,next)=>{
  try{
  console.log(request.query);
  let {user_id} = request.query; 
  let user = await User.findOne({where:{user_id}});
  console.log(user);
  let username = user.username;
  console.log("IsProActive by user_id "+username)
  let professional = await Professional.findOne({where:{email : username}});
  console.log(professional);
  if(!professional){
    return response.status(200).json({message :"Professional not found. Please subscribe before uploading a design."}); 
    }
    let subscription = await Subscription.findOne({
      where:{
        professional_id : professional.professional_id,
        subscription_active: 1,
      }
    })
    console.log("subscription", subscription);
    if(subscription){
      return response.status(200).json({message:"professional your subscription is active",data: subscription })
    } else {
      return response.status(200).json({message:" you're subscription is expired"})
  
    }
  }
   catch(err){
  console.log("Error found in catch "+err);
  return response.status(500).json({error:"Internal server Error"});
  }
  }


  export const  updatePro = async (request, response, next) => {
    try {
      const { professional_id, professional_name, address, email, contact_no } = request.body;
  
      let professional = await Professional.findOne({where: {professional_id}});
      const currentEmail = professional.dataValues.email;

      //current email before update
      
      const professionalup = await Professional.update(
        {
          professional_name,
          address,
          email,
          contact_no
        },
        {
          where: {
            professional_id
          }
        }
      );
            if(email)
        await User.update({username: email}, {where: {username: currentEmail}}); //cr== preve

      if (professionalup[0] > 0) {
        return response.status(200).json({ message: "Professional updated successfully", data: professionalup });
      } else {
        return response.status(404).json({ message: "Email is already exist" });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server problem" });
    }
  };
  




  
  
  
  
  
  
    
// export const getprofessionalBycity = async (request, response, next) => {
//     try {
//         let proExist = await Professional.findAll({ where: { city: request.query.city }, raw: true })
//         console.log("proExist "+proExist); // [object Object]
//         if (proExist.length > 0) {
//             return response.status(200).json({ message: "Professionals are from Given city : ", data: proExist })
//         } else {
//             return response.status(500).json({ error: "Professional not found in this city " })
//         }
//     } catch (err) {
//         console.log("Error inside catch" + err);
//         return response.status(500).json({ error: 'Internal server Error ' })
//     }
// }


// export const reviewOnDesign = async(request,response,next)=>{
// try {
//     const design_id = request.body.design_id;
//     console.log('Design ID:.........................................................', design_id);

//     const design = await Design.findOne({
//         where:{design_id : design_id},
//         include:[
//             {
//                 model : Professional,
//                 attributes :['professional_id','professional_name','email']
//             },{
//                 model : DesignFeedback,
//                 attributes:['feedback'],
//                 include :[
//                     {
//                         model : User,
//                         attributes : ['username']
//                     }
//                 ]
//             },{
//                 model : Design_image,
//                 attributes:['image_url','description']
//             }
//         ]
//     });
//     console.log('Design:', design);
//     if(!design){
//         return response.status(404).json({ message: 'Design not found' });
//     }
//     const professional_id = design.professional ? design.professional.professional_id : null;
//     const professional_name = design.professional ? design.professional.professional_name : null;
//     const email = design.professional ? design.professional.email : null;


//     const formattedData = {
//         design_id: design.design_id,
//         username: design.design_feedbacks.length > 0 ? design.design_feedbacks[0].user.username : null,
//         feedback: design.design_feedbacks.length > 0 ? design.design_feedbacks[0].feedback : null,
//         image_url: design.design_images.length > 0 ? design.design_images[0].image_url : null,
//         description: design.design_images.length > 0 ? design.design_images[0].description : null,
//         professional_id: professional_id,
//         professional_name: professional_name,
//         email: email
//               };
  
//       return response.status(200).json({ data: [formattedData] });

// }catch (error){
//     console.error(error);
//     return response.status(500).json({ message: 'Server error' });

// }
// }


