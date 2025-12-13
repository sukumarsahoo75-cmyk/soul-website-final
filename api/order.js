import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // 1. Initialize Razorpay
      const razorpay = new Razorpay({
        key_id: process.env.VITE_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // 2. Get the amount (It is already in paise from frontend)
      const { amount, currency = "INR" } = req.body;
      
      if (!amount) {
        return res.status(400).json({ error: "Amount is required" });
      }

      // 3. Create the options
      const options = {
        amount: amount, // No * 100 here (Frontend already did it)
        currency,
        receipt: `receipt_order_${new Date().getTime()}`,
      };

      // 4. Generate Order ID
      const order = await razorpay.orders.create(options);

      if (!order) {
        return res.status(500).json({ error: "Error creating order" });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error("Razorpay API Error:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    // Block non-POST requests
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}