import crypto from "crypto";
import { PaymentData } from "../MODEL/payment.model.js";
import { instance } from "../app.js";
import { API } from "../config/config.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount ,sub_id} =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", API.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {

    await PaymentData.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      sub_id
    });
    res.status(200).json({
      success: true,
    });
    // res.redirect(
    //   http://localhost:3001/paymentsuccess?reference=${razorpay_payment_id}
    // );
  } else {
    res.status(400).json({
      success: false,
   });
}
};