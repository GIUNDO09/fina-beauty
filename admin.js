/* ===== FINA Beauty — Administration ===== */
const SB_URL = "https://ejzthooypcffgycqmtgi.supabase.co";
const SB_KEY = "sb_publishable_ilIf9TfT8zpfvpqrO06ZbA_BUCQbdqU";
const SB = window.supabase.createClient(SB_URL, SB_KEY);
const $ = s => document.querySelector(s);
const fmt = n => (n||0).toLocaleString("fr-FR") + " FCFA";
let PRODUITS = [];

/* ---------- Connexion ---------- */
$("#login-form").addEventListener("submit", async e => {
  e.preventDefault();
  const msg = $("#login-msg"); msg.className = "msg"; msg.textContent = "Connexion…";
  const { error } = await SB.auth.signInWithPassword({ email: $("#email").value.trim().toLowerCase(), password: $("#password").value });
  if(error){
    msg.className = "msg err";
    const m = (error.message || "").toLowerCase();
    if(m.includes("not confirmed")) msg.textContent = "Compte non confirmé : confirme l'utilisateur dans Supabase (Authentication → Users).";
    else if(m.includes("invalid login")) msg.textContent = "E-mail ou mot de passe incorrect (vérifie l'orthographe de l'e-mail).";
    else msg.textContent = "Erreur : " + error.message;
    return;
  }
  demarrer();
});
$("#logout").addEventListener("click", async () => { await SB.auth.signOut(); location.reload(); });

async function verifierSession(){
  const { data } = await SB.auth.getSession();
  if(data && data.session) demarrer();
}
function demarrer(){
  $("#login").style.display = "none";
  $("#dash").style.display = "block";
  charger();
}

/* ---------- Charger la liste ---------- */
async function charger(){
  const { data, error } = await SB.from("products").select("*").order("id", { ascending:false });
  if(error){ alert("Erreur de chargement : " + error.message); return; }
  PRODUITS = data || [];
  rendre();
}
function rendre(){
  const q = ($("#search").value || "").toLowerCase();
  const liste = PRODUITS.filter(p => (p.nom + " " + (p.cat||"")).toLowerCase().includes(q));
  $("#count").textContent = "(" + PRODUITS.length + ")";
  $("#plist").innerHTML = liste.map(p => {
    const img = p.photo ? `<img src="${p.photo}" alt="">` : (p.img || "🛍️");
    const old = p.old_prix ? `<span class="old">${fmt(p.old_prix)}</span>` : "";
    const badge = p.badge ? `<span class="tag">${({new:"Nouveau",best:"Best",promo:"Promo"})[p.badge]||p.badge}</span>` : "";
    return `<div class="pcard">
      <div class="thumb">${img}</div>
      <div class="info">
        <h4>${esc(p.nom)}${badge}</h4>
        <div class="meta">${labelCat(p.cat)}</div>
        <div class="price">${old}${fmt(p.prix)}</div>
      </div>
      <div class="acts">
        <button class="btn btn-ghost" data-edit="${p.id}">✏️</button>
        <button class="btn btn-danger" data-del="${p.id}">🗑️</button>
      </div>
    </div>`;
  }).join("") || `<p style="color:#a89a86;text-align:center;padding:2rem">Aucun produit.</p>`;
}
const esc = s => (s||"").replace(/</g,"&lt;");
const labelCat = c => ({visage:"Soins visage",corps:"Corps",cheveux:"Cheveux",huiles:"Huiles",silhouette:"Silhouette",bijoux:"Bijoux",artisanat:"Artisanat",parfum:"Parfum",maquillage:"Maquillage"}[c]||c||"");
$("#search").addEventListener("input", rendre);

/* ---------- Ouvrir le formulaire ---------- */
$("#add").addEventListener("click", () => ouvrirForm(null));
$("#form-close").addEventListener("click", fermerForm);
$("#overlay").addEventListener("click", e => { if(e.target === $("#overlay")) fermerForm(); });
$("#plist").addEventListener("click", e => {
  const ed = e.target.closest("[data-edit]"), de = e.target.closest("[data-del]");
  if(ed) ouvrirForm(PRODUITS.find(p => p.id === +ed.dataset.edit));
  if(de) supprimer(+de.dataset.del);
});

function ouvrirForm(p){
  $("#form-title").textContent = p ? "Modifier le produit" : "Nouveau produit";
  $("#f-id").value = p ? p.id : "";
  $("#f-nom").value = p ? p.nom : "";
  $("#f-cat").value = p ? (p.cat || "visage") : "visage";
  $("#f-badge").value = p ? (p.badge || "") : "";
  $("#f-prix").value = p ? p.prix : "";
  $("#f-old").value = p && p.old_prix ? p.old_prix : "";
  $("#f-desc").value = p ? (p.description || "") : "";
  $("#f-img").value = p ? (p.img || "") : "";
  $("#f-photo").value = "";
  const prev = $("#f-prev");
  if(p && p.photo){ prev.src = p.photo; prev.style.display = "block"; } else { prev.style.display = "none"; }
  $("#form-msg").textContent = "";
  $("#overlay").classList.add("open");
}
function fermerForm(){ $("#overlay").classList.remove("open"); }

/* aperçu de la photo choisie */
$("#f-photo").addEventListener("change", () => {
  const f = $("#f-photo").files[0];
  if(f){ const prev = $("#f-prev"); prev.src = URL.createObjectURL(f); prev.style.display = "block"; }
});

/* ---------- Enregistrer ---------- */
$("#pform").addEventListener("submit", async e => {
  e.preventDefault();
  const msg = $("#form-msg"); msg.className = "msg";
  const btn = $("#save-btn"); btn.disabled = true; const old = btn.innerHTML; btn.innerHTML = '<span class="spin"></span> Enregistrement…';
  try{
    const id = $("#f-id").value;
    let photoUrl = null;
    const file = $("#f-photo").files[0];
    if(file){
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = "p_" + (id || "new") + "_" + Math.round(performance.now()) + "." + ext;
      const up = await SB.storage.from("produits").upload(path, file, { upsert:true, contentType:file.type });
      if(up.error) throw up.error;
      photoUrl = SB.storage.from("produits").getPublicUrl(path).data.publicUrl;
    }
    const row = {
      nom: $("#f-nom").value.trim(),
      cat: $("#f-cat").value,
      prix: parseInt($("#f-prix").value, 10),
      old_prix: $("#f-old").value ? parseInt($("#f-old").value, 10) : null,
      badge: $("#f-badge").value || null,
      description: $("#f-desc").value.trim(),
      img: $("#f-img").value.trim() || "🛍️"
    };
    if(photoUrl) row.photo = photoUrl;

    if(id){
      const { error } = await SB.from("products").update(row).eq("id", +id);
      if(error) throw error;
    } else {
      row.id = await prochainId();
      row.note = 5; row.avis = 0;
      const { error } = await SB.from("products").insert(row);
      if(error) throw error;
    }
    fermerForm();
    await charger();
  }catch(err){
    msg.className = "msg err"; msg.textContent = "Erreur : " + (err.message || err);
  }finally{
    btn.disabled = false; btn.innerHTML = old;
  }
});

async function prochainId(){
  const { data } = await SB.from("products").select("id").order("id", { ascending:false }).limit(1);
  return (data && data[0] ? data[0].id : 0) + 1;
}

/* ---------- Supprimer ---------- */
async function supprimer(id){
  const p = PRODUITS.find(x => x.id === id);
  if(!confirm("Supprimer « " + (p ? p.nom : id) + " » ? Cette action est définitive.")) return;
  const { error } = await SB.from("products").delete().eq("id", id);
  if(error){ alert("Erreur : " + error.message); return; }
  await charger();
}

/* ---------- Démarrage ---------- */
verifierSession();
