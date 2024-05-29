import Orders from "../MODEL/orders.model.js";
import OrderItems from "../MODEL/ordersItems.model.js";
export const placeOrders  = async(request,response,next)=>{
    try{
        let order_id = request.body.order_id;
        let order = await Orders.findOne({where :{order_id : order_id} });

        if(order){
            await OrderItems.create({
                order_id : request.body.order_id ,
                product_id : request.body.product_id,
                quantity : request.body.quantity,
            })
            return response.status(200).json ({message : ' Order place sucessfully...'});
        } else {

            let orders = await Orders.create ({
                user_id :request.body.user_id,
                bill_amount: request.body.bill_amount ,               
                delivery_date: request.body.delivery_date,
                status : request.body.status,
                contact_no : request.body.contact_no,
                })

                if(orders){
           await OrderItems.create({
            order_id : request.body.order_id ,
            product_id : request.body.product_id,
            quantity : request.body.quantity,
            })
            return response.status(200).json({ message: "Product Order successfully..." });
        } else 
        return response.status(500).json({ error: "Internal server Problem " });

        }
         }  catch (err){
        console.log("Error in Order controller",err)
        return response.status(200).json({error : 'Internal server Problem....'})
    }
}