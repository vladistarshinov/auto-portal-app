import dotenv from "dotenv";

const PaypalController = {};

dotenv.config();

// @desc     Paying Order through PayPal
// @route    GET /api/config/paypal
// @access   Public
PaypalController.payingOrder = (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
};

export default PaypalController;
