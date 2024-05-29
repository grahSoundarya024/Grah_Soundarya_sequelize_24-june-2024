import express from 'express';
import {  subscription ,getprofessionalBycity,reviewOnDesign,subscribedList,continueAsPro,updatePro} from '../CONTROLLER/professional.controller.js';
import multer from 'multer';

const  upload = multer({dest :"ProfileImage/image/"});
const router = express.Router();
router.post("/saveProfile",upload.single("profileImg_URL"),subscription);  // upload.single(databaseColumnName)

// router.post("/saveProfile",subscription);  // upload.single(databaseColumnName)

 router.get("/getprofessionalBycity" ,getprofessionalBycity);
 router.get ("/reviewOnDesign",reviewOnDesign); // by professional
 router.get("/subscribedList",subscribedList);
 router.get("/continueAsPro",continueAsPro);
 router.post("/updatePro",updatePro);

export default router;

