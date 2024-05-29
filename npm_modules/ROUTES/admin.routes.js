import express from 'express';
import {signUp , signIn,AllUserList,getUserByEmail,professionalList,getperticulerPro,feedBackList ,designfeedbackList,OrderList,removeProfessional,removeUser} from '../CONTROLLER/admin.controller.js'
const router = express.Router();
router.post("/signUp",signUp);
router.get("/signIn",signIn)
router.get("/userList",AllUserList);
router.get("/perticulerUser",getUserByEmail)
router.get("/professionalList",professionalList);
router.post("/getprofessional",getperticulerPro);
router.get("/feedBackList",feedBackList);
router.get("/designfeedbackList",designfeedbackList);
router.get("/orderList",OrderList);
router.delete("/removeProfessional",removeProfessional)

// router.delete ("/removeUser",removeUser);

export default router;