import Professional from "../MODEL/professional.model.js";
import Subscription from "../MODEL/subscription.model.js";

export const subscription = async (request, response, next) => {
    try {
        let name = request.body.name;
        let amount = request.body.amount;
        let pro_id = request.body.professional_id;
        let start_date = request.body.start_date;
        let end_date = request.body.end_date;

        //===========================================
        //professional
        let filename = request.file.filename;
        let p_name = request.body.p_name;
        let city = request.body.city;
        let address = request.body.address;
        let pincode = request.body.pincode;
        let gender = request.body.gender;
        let contact_no = request.body.contact_no;
        let is_created = request.body.is_created;
        let is_updated = request.body.is_updated;
        let email = request.body.email;

        let profileImg_URL = "images/" + filename;
        let is_active = request.body.is_active;

        let result = await Professional.isProfessionalExist(pro_id);
        // console.log(" isProfessionalExist " + result.length);

        if (result.length) {
            // Professional exist and then we have save subscription in sunscription

            // console.log(result[0]);
            let pro_id = result[0].professional_id;

            console.log("pro_id in subscriptuion table " + pro_id)
            await Subscription.subscription(name, amount, pro_id, start_date, end_date);
            return response.status(200).json({ message: 'subscription taken successfully' });
            
        } else {

            await Professional.ProfileDesigner(p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL);

            result = await Professional.isProfessionalExist(pro_id);

            /*console.log("ProfileDesigner data " + result.length);
            console.log(result[0]);
            console.log("prof_id [result] [0] " + pro_id); */

        await Subscription.subscription(name, amount, pro_id, start_date, end_date);
            return response.status(200).json({ message: "professional id added in the subscription" });
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: 'Internal server Problem...' })
    }

}

