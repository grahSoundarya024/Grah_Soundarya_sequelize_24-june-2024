import express from 'express';
import {addProduct,getProduct,addcategory, productImage,productFeedback,favourite_product,addcategoryExcel,addProductExcel,addProductImgExcel,CategoryList,getCategory} from '../CONTROLLER/Category.controller.js'
import multer from 'multer';

const upload = multer({dest : "ProductIMG/images"});
const store = multer ({dest : "CategoryImg"})

const router = express.Router();
router.post("/addProduct",addProduct);
router.get("/productList",getProduct)
router.post("/addcategory",store.single("category_image"),addcategory);
router.post("/ProductImage",upload.single ("imageURL"),productImage);
router.post("/productFeedback",productFeedback);
router.post ("/favourite_product",favourite_product);
router.post("/excelCategory",addcategoryExcel);
router.post ("/addProductExcel",addProductExcel);
router.post("/addProductImgExcel",addProductImgExcel);
router.get("/CategoryList",CategoryList);
router.get("/getCategory",getCategory)

export default router;

