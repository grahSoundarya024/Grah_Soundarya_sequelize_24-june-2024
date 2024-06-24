import bodyParser from "body-parser";
import express from "express";
import userRouter from './ROUTES/user.routes.js';
import professionalRouter from './ROUTES/professional.routes.js';
import AdminRouter from './ROUTES/admin.routes.js'
import DesignRouter from './ROUTES/design.routes.js'
import CartRouter from './ROUTES/cart.routes.js';
import ProductRouter from './ROUTES/category.routes.js';
import OrderRouter from './ROUTES/orders.routes.js'
import PaymentRouter from './ROUTES/payment.routes.js'
import './MODEL/association.model.js'
import path from "path";
import cors from "cors"
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import { API } from "./config/config.js"

export const instance = new Razorpay({
   key_id: API.RAZORPAY_API_KEY,
   key_secret: API.RAZORPAY_APT_SECRET,   
});

const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "ProfileImage")));
app.use(express.static(path.join(__dirname, "Videos")));
app.use(express.static(path.join(__dirname, "design_Images")));
app.use(express.static(path.join(__dirname , "ProductIMG"))); //Product image
app.use(express.static(path.join(__dirname,"RoomType_img")))


app.use("/admin", AdminRouter)
app.use("/user", userRouter);
app.use("/professional",professionalRouter);
app.use("/design", DesignRouter);
app.use("/cart", CartRouter);
app.use("/product", ProductRouter);
app.use("/orders", OrderRouter);
app.use("/payment", PaymentRouter)

// const port = 3001;
app.listen(3001, () => {
   console.log("Server started....");
})
