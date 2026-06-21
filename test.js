const axios = require('axios');

async function test() {
  try {
    console.log("Signing up...");
    const signupRes = await axios.post("http://localhost:3002/signup", {
      name: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      password: "password123"
    });
    console.log("Signup success:", signupRes.data);

    console.log("Logging in...");
    const loginRes = await axios.post("http://localhost:3002/login", {
      email: "test@example.com",
      password: "password123"
    });
    console.log("Login success:", loginRes.data);

    const token = loginRes.data.token;
    console.log("Fetching user profile with token...");
    const userRes = await axios.get("http://localhost:3002/user", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("User profile:", userRes.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

test();
