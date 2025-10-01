import Razorpay from "razorpay";
import cors from "cors";

// Helper to run middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  // Initialize cors middleware with custom options
  const corsMiddleware = cors({
    origin: "*", // In production, restrict this to your website's domain
    methods: ["POST"],
  });
  
  // Run cors middleware
  await runMiddleware(req, res, corsMiddleware);

  if (req.method === "POST") {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.VITE_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const { amount, currency = "INR" } = req.body;
      if (!amount) {
        return res.status(400).json({ error: "Amount is required" });
      }

      const options = {
        amount: amount * 100, // Amount in paise
        currency,
        receipt: `receipt_order_${new Date().getTime()}`,
      };

      const order = await razorpay.orders.create(options);

      if (!order) {
        return res.status(500).json({ error: "Error creating order" });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error("Razorpay API Error:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}