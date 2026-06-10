// Fonction serverless (Vercel) : inscrit un e-mail dans la liste Brevo "FB" (#3)
// La clé API est lue depuis la variable d'environnement BREVO_API_KEY (jamais dans le code).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }
  try {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    const email = ((body && body.email) || "").trim().toLowerCase();
    const valide = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!valide) {
      res.status(400).json({ ok: false, error: "Email invalide" });
      return;
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      // Service pas encore configuré côté Vercel : on ne bloque pas le visiteur.
      res.status(200).json({ ok: true, note: "non configuré" });
      return;
    }

    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify({ email, listIds: [3], updateEnabled: true }),
    });

    if (r.status === 201 || r.status === 204) {
      res.status(200).json({ ok: true });
      return;
    }
    const data = await r.json().catch(() => ({}));
    if (data && data.code === "duplicate_parameter") {
      // déjà inscrite : on considère que c'est bon
      res.status(200).json({ ok: true, already: true });
      return;
    }
    // Autre cas : on reste tolérant pour ne pas bloquer l'expérience cliente
    res.status(200).json({ ok: true, brevo: data && data.code ? data.code : "ok" });
  } catch (e) {
    res.status(200).json({ ok: true, note: "erreur ignorée" });
  }
}
