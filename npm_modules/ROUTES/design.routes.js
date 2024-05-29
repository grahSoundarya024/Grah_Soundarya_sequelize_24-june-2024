import express from 'express';
import {roomType , video,design_images ,viewalldesign,viewAllRoomType,design_feedback,favourite_design,addDesignVideo,addDesignImages,designDetails,allFavouriteList,roomTypeExcel,getCategoryone,VideosByPro_id} from '../CONTROLLER/design.controller.js';
import multer from 'multer';

const roomType_img = multer({dest: "RoomType_img/images"})
const upload = multer ({dest :"Videos/video"})
const design_img = multer ({dest : "design_Images/images"})
const router = express.Router();

router.post("/roomTypeExcel",roomTypeExcel)
router.post("/addRoomType",roomType_img.single("image_url"),roomType);
router.post ("/video", upload.single ("video"),video)
// router.post("/uploadImages", design_img.single ("image_url"),design_images);
router.post("/uploadImages",design_images);

router.get("/viewalldesign",viewalldesign);  

router.get("/viewAllRoomType",viewAllRoomType);
router.post("/design_feedback",design_feedback );   
router.post("/addToFavorite",favourite_design);
router.post("/addDesignVideo",upload.single ("excelFile"),addDesignVideo);
router.post("/addDesignImages",upload.single("excelFile"),addDesignImages);
router.post("/designbyRoomType",designDetails);   // get
router.post("/allFavouriteList",allFavouriteList);
router.get("/getCategoryone",getCategoryone)
router.get("/AllVideo",VideosByPro_id);

// router.get("/DesignByRoomType" , getDesignByRoomType)  

// extra
// router.post ("/video",video)
export default router;