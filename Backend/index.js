/**
 * Main Express Application Entry Point
 * This file sets up the server, connects to MongoDB, and defines all API routes.
 */
require ("dotenv").config();
const express=require("express");
const mongoose=require ("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const PORT=process.env.PORT || 3002;
// Default JWT Secret used for signing and verifying tokens
const JWT_SECRET = process.env.JWT_SECRET || 'investo_super_secret_key';

// Import Mongoose models for interacting with the database
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const uri=process.env.MONGO_URL;
const app=express();

// Middleware Setup
app.use(cors()); // Allow cross-origin requests from the React frontend
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.json());


// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });
// Middleware to verify JWT token
// This intercepts requests to protected routes, checks the Authorization header,
// and decodes the token to identify the logged-in user.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user; // Attach the decoded user payload to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

/**
 * --- DATA FETCHING ROUTES ---
 * These routes return the user's portfolio data.
 * They are protected by the authenticateToken middleware.
 */

// Fetch all current stock holdings
app.get("/allHoldings", authenticateToken, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// Fetch all intraday/CNC positions
app.get("/allPositions", authenticateToken, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// Fetch the history of all placed orders
app.get("/allOrders", authenticateToken, async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * --- AUTHENTICATION ROUTES ---
 */

// User Registration endpoint
app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const lowerEmail = email.toLowerCase();
    
    // Check if the user already exists in the database
    const existingUser = await UserModel.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Create and save the new user
    const newUser = new UserModel({
      name,
      email: lowerEmail,
      phone,
      password // Note: In a production app, passwords should be hashed (e.g. using bcrypt)
    });
    await newUser.save();
    
    // Generate an auth token for the new user
    const token = jwt.sign({ email: lowerEmail }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ success: true, message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const lowerEmail = email.toLowerCase();
    
    // Find the user with matching email and password
    const user = await UserModel.findOne({ email: lowerEmail, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Generate the JWT auth token
    const token = jwt.sign({ email: lowerEmail }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, email: user.email, name: user.name, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({
        email,
        password: "defaultpassword",
        availableMargin: 4043.10,
        usedMargin: 3757.30,
        openingBalance: 4043.10,
        commodityRequested: false,
        activeApps: []
      });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/user/update-margin", authenticateToken, async (req, res) => {
  try {
    const { availableMargin, usedMargin, openingBalance } = req.body;
    const email = req.user.email;
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (availableMargin !== undefined) user.availableMargin = Number(availableMargin);
    if (usedMargin !== undefined) user.usedMargin = Number(usedMargin);
    if (openingBalance !== undefined) user.openingBalance = Number(openingBalance);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/user/update-commodity", authenticateToken, async (req, res) => {
  try {
    const { commodityRequested } = req.body;
    const email = req.user.email;
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.commodityRequested = Boolean(commodityRequested);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/user/toggle-app", authenticateToken, async (req, res) => {
  try {
    const { appName } = req.body;
    const email = req.user.email;
    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const index = user.activeApps.indexOf(appName);
    if (index > -1) {
      user.activeApps.splice(index, 1);
    } else {
      user.activeApps.push(appName);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * --- ORDER EXECUTION ---
 * This is the core logic for placing buy/sell orders.
 * It dynamically updates the user's Positions and Holdings based on the trade.
 */
app.post("/newOrder", authenticateToken, async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Body missing or empty" });
    }

    // Step 1: Save the order record to history
    const newOrder = new OrdersModel(req.body);
    await newOrder.save();

    // Step 2: Dynamically update the user's active Positions
    const { name, qty: orderQty, price: orderPrice, mode } = req.body;
    let position = await PositionsModel.findOne({ name });

    if (mode === "BUY") {
      if (position) {
        // If position already exists, average out the new buy price and add quantities
        const oldQty = position.qty || 0;
        const oldAvg = position.avg || 0;
        const newQty = oldQty + Number(orderQty);
        
        let newAvg = oldAvg;
        if (newQty > 0) {
          newAvg = ((oldQty * oldAvg) + (Number(orderQty) * Number(orderPrice))) / newQty;
        }

        position.qty = newQty;
        position.avg = newAvg;
        position.price = Number(orderPrice); // Update latest traded price
        
        // Calculate if the position is currently in loss
        const curValue = position.price * position.qty;
        const isProfit = curValue - position.avg * position.qty >= 0.0;
        position.isLoss = !isProfit;

        await position.save();
      } else {
        // Create a new position record if none exists
        const newPos = new PositionsModel({
          product: "CNC",
          name,
          qty: Number(orderQty),
          avg: Number(orderPrice),
          price: Number(orderPrice),
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false,
        });
        await newPos.save();
      }
    } else if (mode === "SELL") {
      if (position) {
        // Reduce quantity upon selling
        const oldQty = position.qty || 0;
        const newQty = oldQty - Number(orderQty);

        if (newQty === 0) {
          // If all shares sold, remove position
          await PositionsModel.deleteOne({ name });
        } else {
          position.qty = newQty;
          position.price = Number(orderPrice);
          const curValue = position.price * position.qty;
          const isProfit = curValue - position.avg * position.qty >= 0.0;
          position.isLoss = !isProfit;
          await position.save();
        }
      } else {
        // If selling without prior position, it's a short sell (negative qty)
        const newPos = new PositionsModel({
          product: "CNC",
          name,
          qty: -Number(orderQty),
          avg: Number(orderPrice),
          price: Number(orderPrice),
          net: "+0.00%",
          day: "+0.00%",
          isLoss: false,
        });
        await newPos.save();
      }
    }

    // Step 3: Dynamically update long-term Holdings
    // The logic is similar to Positions but tracks long-term investments
    let holding = await HoldingsModel.findOne({ name });
    if (mode === "BUY") {
      if (holding) {
        const oldQty = holding.qty || 0;
        const oldAvg = holding.avg || 0;
        const newQty = oldQty + Number(orderQty);
        let newAvg = oldAvg;
        if (newQty > 0) {
          newAvg = ((oldQty * oldAvg) + (Number(orderQty) * Number(orderPrice))) / newQty;
        }
        holding.qty = newQty;
        holding.avg = newAvg;
        holding.price = Number(orderPrice);
        await holding.save();
      } else {
        const newHolding = new HoldingsModel({
          name,
          qty: Number(orderQty),
          avg: Number(orderPrice),
          price: Number(orderPrice),
          net: "+0.00%",
          day: "+0.00%"
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      if (holding) {
        const oldQty = holding.qty || 0;
        const newQty = oldQty - Number(orderQty);
        if (newQty <= 0) {
          await HoldingsModel.deleteOne({ name });
        } else {
          holding.qty = newQty;
          holding.price = Number(orderPrice);
          await holding.save();
        }
      }
    }

    res.status(201).json({ message: "Order saved!" });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
    console.log("App started !");
    mongoose.connect(uri);
    console.log("DB connected");
});

// mongoose.connect(uri)
//   .then(() => console.log("DB connected"))
//   .catch(err => console.log(err));

// app.listen(PORT, () => {
//   console.log(`App started on port ${PORT}`);
// });