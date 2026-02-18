export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, buyerName, buyerPhone, product, qty } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount obrigatório" });
    }

    // 🔒 SUA CHAVE FICA SEGURA AQUI (não no front)
    const SECRET_KEY = process.env.ABACASH_SECRET;

    const response = await fetch("https://app.abacash.com/api/payment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SECRET_KEY}`
      },
      body: JSON.stringify({
        action: "create",
        product_id: "prod_123456", // depois você troca
        amount: amount,
        customer: {
          name: buyerName,
          cpf: buyerPhone.replace(/\D/g, "").slice(0, 11) || "00000000000",
          email: "cliente@email.com"
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json(data);
    }

    // 🔄 Ajuste aqui conforme o retorno real da Abacash
    return res.status(200).json({
      copiaecola: data.pix_code || data.copy_paste || "",
      qrCodeBase64: data.qr_code_base64 || null,
      qrCodeUrl: data.qr_code || null,
      expiresInSeconds: 600
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao gerar Pix",
      detail: String(error.message)
    });
  }
}
