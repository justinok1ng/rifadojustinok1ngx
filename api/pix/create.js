curl -X POST https://app.abacash.com/api/payment.php \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SUA_SECRET_KEY" \
  -d '{
    "action": "create",
    "product_id": "prod_123456",
    "amount": 10.00,
    "customer": {
      "name": "Player One",
      "cpf": "12345678900",
      "email": "player@email.com"
    }
  }'