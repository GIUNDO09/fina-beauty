// Fonction serverless (Vercel) : envoie une campagne e-mail Brevo pour un produit.
// Sécurité : n'accepte que les requêtes d'un admin connecté (token Supabase vérifié).
// Variables d'env Vercel requises : BREVO_API_KEY, BREVO_SENDER (e-mail vérifié). Liste = 3.
const SB_URL = "https://ejzthooypcffgycqmtgi.supabase.co";
const SB_KEY = "sb_publishable_ilIf9TfT8zpfvpqrO06ZbA_BUCQbdqU";
const SITE = "https://finabeauty.store/";

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ ok:false, error:"Méthode" }); return; }
  try {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    const token = body.token;
    const p = body.product || {};
    if (!token) { res.status(401).json({ ok:false, error:"non autorisé" }); return; }

    // 1) Vérifier que le token correspond à un utilisateur connecté (admin)
    const who = await fetch(SB_URL + "/auth/v1/user", {
      headers: { apikey: SB_KEY, Authorization: "Bearer " + token }
    });
    if (who.status !== 200) { res.status(401).json({ ok:false, error:"session invalide, reconnecte-toi" }); return; }

    // 2) Config Brevo
    const apiKey = process.env.BREVO_API_KEY;
    const sender = process.env.BREVO_SENDER;
    const listId = parseInt(process.env.BREVO_LIST_ID || "3", 10);
    if (!apiKey || !sender) { res.status(200).json({ ok:false, error:"Config Brevo manquante dans Vercel (BREVO_SENDER / BREVO_API_KEY)." }); return; }

    // 3) Construire l'e-mail (photo + nom + prix)
    const nom = (p.nom || "Une nouveauté").toString();
    const img = p.photo ? (String(p.photo).startsWith("http") ? p.photo : SITE + p.photo) : "";
    const prix = p.prix ? (Number(p.prix).toLocaleString("fr-FR").replace(/ | /g, " ") + " FCFA") : "";
    const imgHtml = img ? `<img src="${img}" alt="${nom}" style="width:100%;max-width:340px;border-radius:14px;display:block;margin:16px auto" />` : "";
    const prixHtml = prix ? `<p style="text-align:center;font-size:22px;color:#d6aa4e;font-weight:bold;margin:6px 0">${prix}</p>` : "";
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#171210;color:#ece0cd;border-radius:16px;overflow:hidden">
        <div style="background:#14100c;padding:22px;text-align:center;border-bottom:1px solid #3a2f22">
          <span style="font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#f3ead8">FINA <span style="color:#d6aa4e">Beauty</span></span>
        </div>
        <div style="padding:24px">
          <h2 style="color:#f3ead8;font-family:Georgia,serif;text-align:center;margin:0 0 4px">${nom}</h2>
          ${imgHtml}
          ${prixHtml}
          <p style="font-size:15px;line-height:1.6;text-align:center">À découvrir maintenant dans notre boutique 💛</p>
          <p style="text-align:center;margin:26px 0">
            <a href="${SITE}" style="background:#d6aa4e;color:#171210;text-decoration:none;font-weight:bold;padding:13px 28px;border-radius:50px;display:inline-block">Voir la boutique 🛍️</a>
          </p>
        </div>
        <div style="background:#14100c;padding:16px;text-align:center;font-size:12px;color:#a89a86">
          FINA Beauty — Cosmétiques naturels du Maroc · Sénégal &amp; Maroc<br>
          Vous recevez cet e-mail car vous êtes inscrite à notre newsletter.
        </div>
      </div>`;

    const payload = {
      name: ("FINA Beauty - " + nom).slice(0, 120),
      subject: "🌿 Nouveau chez FINA Beauty : " + nom,
      sender: { name: "FINA Beauty", email: sender },
      htmlContent: html,
      recipients: { listIds: [listId] }
    };

    // 4) Créer + envoyer la campagne
    const cr = await fetch("https://api.brevo.com/v3/emailCampaigns", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload)
    });
    const cd = await cr.json().catch(() => ({}));
    if (!cd.id) { res.status(200).json({ ok:false, error: "Brevo : " + (cd.message || cd.code || "création campagne échouée") }); return; }

    const sd = await fetch("https://api.brevo.com/v3/emailCampaigns/" + cd.id + "/sendNow", {
      method: "POST", headers: { "api-key": apiKey, accept: "application/json" }
    });
    if (sd.status >= 200 && sd.status < 300) { res.status(200).json({ ok:true }); return; }
    const se = await sd.json().catch(() => ({}));
    res.status(200).json({ ok:false, error: "Envoi : " + (se.message || se.code || ("HTTP " + sd.status)) });
  } catch (e) {
    res.status(200).json({ ok:false, error: String(e && e.message ? e.message : e) });
  }
}
