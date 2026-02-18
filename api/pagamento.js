export default async function handler(req, res) {
  // Configuração para permitir que seu site acesse esta função
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responde ao "pré-voo" do navegador
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Apenas aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ==========================================
  // ⚠️ COLOQUE SUA CHAVE AQUI NO BACKEND ⚠️
  const ABACASH_SECRET_KEY = "sk_live_4457547444fd3627a4f715a1f6ad4fb657978c5b302e752d"; 
  // ==========================================

  const { amount, name, cpf, email } = req.body;

  try {
    const response = await fetch('https://app.abacash.com/api/payment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ABACASH_SECRET_KEY}`
      },
      body: JSON.stringify({
        action: "create",
        product_id: "rifa_01",
        amount: amount,
        customer: { name, cpf, email }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(JSON.stringify(data));
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}