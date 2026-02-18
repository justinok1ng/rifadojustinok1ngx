const axios = require('axios');

async function createPix() {
  try {
    const response = await axios.post('https://app.abacash.com/api/payment.php', {
      action: "create",
      product_id: "prod_123456",
      amount: 10.00,
      customer: {
        name: "Player One",
        cpf: "12345678900",
        email: "player@email.com"
      }
    }, {
      headers: {
        'Authorization': 'Bearer SUA_SECRET_KEY'
      }
    });

    console.log("Pix Created:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

createPix();
