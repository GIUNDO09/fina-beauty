/* ===== FINA Beauty — Logique du site (version pro) ===== */

/* 📞 À PERSONNALISER : votre numéro WhatsApp (format international, sans + ni espaces) */
const WHATSAPP = "221774641789"; // Sénégal (principal). Maroc : 212781871090
const DEVISE = "FCFA";
const PROMO_CODE = "BIENVENUE";   // code promo
const PROMO_PCT = 0.10;           // -10%

/* ===== Catalogue produits =====
   Pour ajouter/modifier un produit : copiez une ligne { ... }.
   img = emoji (en attendant les vraies photos) · cat = visage/cheveux/corps/maquillage/parfum
   note = sur 5 · avis = nb d'avis · badge = "new" | "best" | "promo" | null · oldPrix = ancien prix si promo */
const PRODUITS = [
  /* ===== VRAIS PRODUITS ===== (photo = fichier dans le dossier images/) */
  { id:13, nom:"Savon au Nila Bleu", cat:"visage", prix:2500, photo:"images/savon-nila-bleu.png", img:"🧼", note:5.0, avis:24, badge:"best",
    desc:"Savon de beauté artisanal à la poudre de nila bleu, fabriqué au Maroc. Unifie le teint, atténue taches, zones sombres et boutons. Nettoie le visage en profondeur et régule le sébum pour un teint éclatant. Naturel & fait main." },

  { id:14, nom:"Savon Noir Marocain — 250g", cat:"corps", prix:1500, photo:"images/savon-noir.png", img:"🧴", note:4.9, avis:18, badge:"best",
    desc:"Savon noir marocain 100% naturel et artisanal (250g). Pâte traditionnelle à base d'olive, utilisée au hammam pour nettoyer, purifier et préparer la peau au gommage. Laisse la peau douce, nette et éclatante. Tradition authentique du Maroc." },

  { id:15, nom:"Savon Noir Marocain — 400g", cat:"corps", prix:2500, photo:"images/savon-noir-250g-2500.png", img:"🧴", note:4.9, avis:12, badge:null,
    desc:"Grand format 400g du savon noir marocain 100% naturel et artisanal. Pâte d'olive du hammam pour nettoyer, purifier et exfolier la peau. Idéal pour un usage régulier en famille. Tradition authentique du Maroc." },

  { id:16, nom:"Bracelet Ayat al-Kursi (Adulte)", cat:"bijoux", prix:5000, photo:"images/BRACELET-KURSI.png", img:"💍", note:5.0, avis:31, badge:"new",
    desc:"Bracelet jonc gravé du verset Ayat al-Kursi (le Trône), en acier inoxydable haute qualité. Ouverture ajustable homme & femme, résistant à l'eau et à l'usure, gravure arabe détaillée. Disponible en 4 couleurs : or, argent, noir, or rose. Belle idée cadeau spirituelle, livré en emballage premium." },

  { id:17, nom:"Bracelet Ayat al-Kursi (Enfant)", cat:"bijoux", prix:3500, photo:"images/BRACELET-KURSI-ENFANT.png", img:"💍", note:5.0, avis:14, badge:"new",
    desc:"Version enfant du bracelet Ayat al-Kursi : doux, léger et ajustable pour les petits poignets. Acier inoxydable hypoallergénique (4 mm), résistant à l'eau et à l'usure, ne noircit pas. Belle idée cadeau éducative et spirituelle, livré dans une jolie boîte prête à offrir." },

  { id:18, nom:"Savon Hikma Carotte — 400g", cat:"visage", prix:2500, photo:"images/hikma-carrotes.png", img:"🥕", note:5.0, avis:9, badge:"new",
    desc:"Savon Hikma à la carotte (400g). Riche en bêta-carotène, il unifie le teint, ravive l'éclat et donne bonne mine. 100% naturel et artisanal." },

  { id:19, nom:"Savon Hikma Curcuma — 400g", cat:"visage", prix:2500, photo:"images/hikma-curcuma.png", img:"🟡", note:5.0, avis:7, badge:"new",
    desc:"Savon Hikma au curcuma (400g). Purifiant et anti-imperfections, il atténue les taches et illumine la peau. 100% naturel et artisanal." },

  { id:20, nom:"Savon Hikma Miel — 400g", cat:"visage", prix:2500, photo:"images/hikma-miel.png", img:"🍯", note:5.0, avis:8, badge:"new",
    desc:"Savon Hikma au miel (400g). Doux et hydratant, il nourrit et adoucit la peau en profondeur. 100% naturel et artisanal." },

  { id:21, nom:"Crème YOKEBE — Galbe & Fermeté", cat:"silhouette", prix:5000, photo:"images/GAME-YOKEBE.png", img:"🧴", note:5.0, avis:14, badge:"new",
    desc:"Crème corporelle YOKEBE, 100% naturelle (réservée aux adultes). Traditionnellement utilisée en massage local pour galber et raffermir fessiers et hanches. Usage externe." },

  { id:22, nom:"Huile YOKEBE — 125 ml", cat:"silhouette", prix:5000, photo:"images/GAME-YOKEBE.png", img:"💧", note:5.0, avis:10, badge:"new",
    desc:"Huile corporelle YOKEBE (125 ml), 100% naturelle (réservée aux adultes). À masser localement pour galber et raffermir fessiers et hanches. Usage externe." },

  { id:23, nom:"Sirop YOKEBE — 125 ml", cat:"silhouette", prix:5000, photo:"images/GAME-YOKEBE.png", img:"🍶", note:5.0, avis:8, badge:"new",
    desc:"Sirop YOKEBE (125 ml), complément naturel (réservé aux adultes) traditionnellement utilisé pour favoriser la prise de poids. À consommer selon les indications de l'emballage." },

  { id:24, nom:"Pack YOKEBE Complet (Crème + Huile + Sirop)", cat:"silhouette", prix:15000, photo:"images/GAME-YOKEBE.png", img:"🎁", note:5.0, avis:11, badge:"best",
    desc:"Le coffret complet de la routine YOKEBE : crème + huile (125 ml) + sirop (125 ml), 100% naturel, réservé aux adultes. Toute la gamme galbe & fermeté en une seule commande, à prix groupé." },

  { id:25, nom:"Coffret Disaar Vitamine C (5 produits)", cat:"visage", prix:8000, photo:"images/DISAAR.png", img:"🍊", note:5.0, avis:16, badge:"best",
    desc:"Coffret complet Disaar à la Vitamine C & acide hyaluronique : nettoyant visage, sérum éclat, sérum whitening, crème hydratante et soin contour des yeux. Pour un teint lumineux et unifié, une peau repulpée et hydratée. Anti-taches, anti-rides et anti-cernes." },

  { id:26, nom:"Gofio El Sahari — Farine de Maïs (375g)", cat:"silhouette", prix:3500, photo:"images/GOFIO.png", img:"🌽", note:5.0, avis:13, badge:"new",
    desc:"Farine de maïs grillé Gofio El Sahari (375g), 100% naturelle, sans conservateurs. Aliment traditionnel saharien riche en énergie, consommé pour favoriser la prise de poids. À mélanger au lait, à l'eau ou à une boisson chaude." },

  /* ===== EXEMPLES (à remplacer par tes vrais produits) ===== */
  { id:1,  nom:"Huile d'Argan pure",        cat:"visage",     prix:6500, img:"💧", note:4.9, avis:128, badge:"best",  desc:"100% pure du Maroc, nourrit et répare peau et cheveux. Pressée à froid." },
  { id:2,  nom:"Beurre de Karité brut",     cat:"corps",      prix:4000, img:"🌰", note:4.8, avis:96,  badge:"best",  desc:"Hydratation intense, idéal peau sèche, vergetures et cheveux secs." },
  { id:4,  nom:"Ghassoul (argile)",         cat:"visage",     prix:3500, img:"🪨", note:4.6, avis:41,  badge:null,    desc:"Argile naturelle purifiante pour visage, corps et cheveux." },
  { id:5,  nom:"Eau de rose",               cat:"visage",     prix:4500, img:"🌹", note:4.9, avis:73,  badge:"new",   desc:"Tonique naturel, apaise, hydrate et illumine le teint." },
  { id:6,  nom:"Huile de figue de Barbarie",cat:"visage",     prix:12000,img:"🌵", note:5.0, avis:38,  badge:"new",   desc:"Anti-âge précieux, raffermit et lisse la peau. Trésor rare." },
  { id:7,  nom:"Masque capillaire Argan",   cat:"cheveux",    prix:5500, img:"🧴", note:4.8, avis:64,  badge:null,    desc:"Répare en profondeur les cheveux secs et abîmés, brillance intense." },
  { id:8,  nom:"Huile de Nigelle",          cat:"cheveux",    prix:5000, img:"🌿", note:4.7, avis:47,  badge:null,    desc:"Fortifie le cuir chevelu et stimule la pousse des cheveux." },
  { id:9,  nom:"Khôl naturel",              cat:"maquillage", prix:2500, img:"👁️", note:4.5, avis:29,  badge:null,    desc:"Khôl traditionnel pour un regard intense et profond." },
  { id:10, nom:"Rouge à lèvres Aker Fassi", cat:"maquillage", prix:3500, img:"💄", note:4.8, avis:52,  badge:"promo", oldPrix:4500, desc:"Teinte naturelle issue du coquelicot et de la grenade." },
  { id:11, nom:"Parfum Oud & Ambre",        cat:"parfum",     prix:9000, img:"🌸", note:4.9, avis:81,  badge:"best",  desc:"Senteur orientale boisée, chaude et envoûtante. Tenue longue durée." },
  { id:12, nom:"Brume fleur d'oranger",     cat:"parfum",     prix:6000, img:"🍊", note:4.7, avis:35,  badge:null,    desc:"Néroli du Maroc, fraîche, délicate et apaisante." },
];

/* ===== Catégories (vitrine) ===== */
const CATEGORIES = [
  { cat:"visage",     nom:"Soins visage", emoji:"🧖‍♀️" },
  { cat:"cheveux",    nom:"Cheveux",      emoji:"💇‍♀️" },
  { cat:"corps",      nom:"Corps",        emoji:"🧴" },
  { cat:"maquillage", nom:"Maquillage",   emoji:"💄" },
  { cat:"parfum",     nom:"Parfums",      emoji:"🌸" },
  { cat:"bijoux",     nom:"Bijoux",       emoji:"💍" },
  { cat:"silhouette", nom:"Silhouette",   emoji:"✨" },
  { cat:"all",        nom:"Tout voir",    emoji:"🛍️" },
];

/* ===== État ===== */
let panier = JSON.parse(localStorage.getItem("fina_panier") || "[]");
let favoris = JSON.parse(localStorage.getItem("fina_favoris") || "[]");
let filtreCat = "all", recherche = "", tri = "default", promoActif = false;

/* ===== Helpers ===== */
const $ = s => document.querySelector(s);
const fmt = n => n.toLocaleString("fr-FR") + " " + DEVISE;
const labelCat = c => ({visage:"Soins visage",cheveux:"Cheveux",corps:"Corps",maquillage:"Maquillage",parfum:"Parfum",bijoux:"Bijoux",silhouette:"Silhouette"}[c]||c);
const etoiles = n => "★".repeat(Math.round(n)) + "☆".repeat(5-Math.round(n));
const badgeHTML = b => b ? `<span class="p-badge ${b}">${{new:"Nouveau",best:"Best-seller",promo:"Promo"}[b]}</span>` : "";
const visuel = p => p.photo ? `<img src="${p.photo}" alt="${p.nom}" loading="lazy" onerror="this.onerror=null;this.outerHTML='${p.img}'">` : p.img;  /* vraie photo si dispo, sinon icône de secours */

/* ===== Catégories ===== */
$("#cat-grid").innerHTML = CATEGORIES.map(c => `
  <div class="cat-card" data-cat="${c.cat}">
    <div class="cat-emoji">${c.emoji}</div>
    <h3>${c.nom}</h3>
    <small>${c.cat==="all" ? "Tous les produits" : PRODUITS.filter(p=>p.cat===c.cat).length+" produits"}</small>
  </div>`).join("");
$("#cat-grid").addEventListener("click", e => {
  const card = e.target.closest(".cat-card"); if(!card) return;
  filtreCat = card.dataset.cat;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat===filtreCat));
  afficherProduits();
  $("#boutique").scrollIntoView({behavior:"smooth"});
});

/* ===== Affichage produits ===== */
const produitsEl = $("#products");
function listeFiltree(){
  let l = PRODUITS.filter(p => filtreCat==="all" || p.cat===filtreCat);
  if(recherche){ const q = recherche.toLowerCase(); l = l.filter(p => (p.nom+" "+p.desc+" "+labelCat(p.cat)).toLowerCase().includes(q)); }
  if(tri==="price-asc")  l = [...l].sort((a,b)=>a.prix-b.prix);
  if(tri==="price-desc") l = [...l].sort((a,b)=>b.prix-a.prix);
  if(tri==="new")        l = [...l].sort((a,b)=>(b.badge==="new")-(a.badge==="new"));
  return l;
}
const discountPct = p => p.oldPrix ? Math.round((1 - p.prix/p.oldPrix)*100) : 0;
function cardHTML(p){
  const pct = discountPct(p);
  return `
    <div class="product">
      <div class="product-img" data-view="${p.id}">
        ${visuel(p)}
        <div class="product-badges">
          ${pct?`<span class="p-badge promo">-${pct}%</span>`:""}
          ${badgeHTML(p.badge==="promo"?null:p.badge)}
        </div>
        <button class="fav-toggle ${favoris.includes(p.id)?'active':''}" data-fav="${p.id}" aria-label="Favori">${favoris.includes(p.id)?'❤️':'🤍'}</button>
        <button class="quick-view" data-view="${p.id}">👁️ Aperçu</button>
      </div>
      <div class="product-body">
        <span class="product-cat">${labelCat(p.cat)}</span>
        <h3>${p.nom}</h3>
        <div class="product-stars">${etoiles(p.note)} <small>(${p.avis})</small></div>
        <p class="product-desc">${p.desc}</p>
        <div class="product-foot">
          <span class="price">${p.oldPrix?`<span class="old">${fmt(p.oldPrix)}</span>`:""}${fmt(p.prix)}</span>
          <button class="add-btn" data-id="${p.id}">+ Ajouter</button>
        </div>
      </div>
    </div>`;
}
function afficherProduits(){
  const liste = listeFiltree();
  $("#no-result").hidden = liste.length>0;
  produitsEl.innerHTML = liste.map(cardHTML).join("");
}
function renderBestSellers(){
  const track = $("#bestsellers-track"); if(!track) return;
  track.innerHTML = PRODUITS.filter(p => p.badge==="best").map(cardHTML).join("");
}

/* ===== Filtres / tri / recherche ===== */
$("#filters").addEventListener("click", e => {
  if(!e.target.classList.contains("chip")) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  e.target.classList.add("active");
  filtreCat = e.target.dataset.cat;
  afficherProduits();
});
$("#sort").addEventListener("change", e => { tri = e.target.value; afficherProduits(); });
$("#search-input").addEventListener("input", e => { recherche = e.target.value; afficherProduits(); });

/* ===== Clics sur produits (ajout / favori / aperçu) ===== */
function handleProductClick(e){
  const add = e.target.closest("[data-id]");
  const fav = e.target.closest("[data-fav]");
  const view = e.target.closest("[data-view]");
  if(add) ajouter(+add.dataset.id);
  else if(fav) toggleFav(+fav.dataset.fav);
  else if(view) ouvrirApercu(+view.dataset.view);
}
produitsEl.addEventListener("click", handleProductClick);
$("#bestsellers-track").addEventListener("click", handleProductClick);

/* ===== Panier ===== */
function ajouter(id){
  const item = panier.find(i => i.id === id);
  if(item) item.qte++;
  else { const p = PRODUITS.find(x => x.id === id); panier.push({id:p.id, nom:p.nom, prix:p.prix, img:p.img, photo:p.photo, qte:1}); }
  sauverPanier(); rendrePanier(); toast(`✅ Ajouté au panier`); ouvrir("cart");
}
function changerQte(id, d){ const i=panier.find(x=>x.id===id); if(!i)return; i.qte+=d; if(i.qte<=0) panier=panier.filter(x=>x.id!==id); sauverPanier(); rendrePanier(); }
function retirer(id){ panier=panier.filter(i=>i.id!==id); sauverPanier(); rendrePanier(); }
function sauverPanier(){ localStorage.setItem("fina_panier", JSON.stringify(panier)); }

function rendrePanier(){
  const items=$("#cart-items");
  if(panier.length===0){
    items.innerHTML = `<p class="cart-empty">Votre panier est vide 🛍️<br>Ajoutez vos produits préférés !</p>`;
  } else {
    items.innerHTML = panier.map(i => `
      <div class="cart-item">
        <div class="ci-img">${i.photo?`<img src="${i.photo}" alt="">`:i.img}</div>
        <div class="ci-info">
          <h4>${i.nom}</h4>
          <span class="ci-price">${fmt(i.prix)}</span>
          <div class="qty">
            <button data-act="moins" data-id="${i.id}">−</button>
            <span>${i.qte}</span>
            <button data-act="plus" data-id="${i.id}">+</button>
          </div>
        </div>
        <button class="ci-remove" data-act="suppr" data-id="${i.id}" aria-label="Retirer">🗑️</button>
      </div>`).join("");
  }
  const sub = panier.reduce((s,i)=>s+i.prix*i.qte,0);
  const disc = promoActif ? Math.round(sub*PROMO_PCT) : 0;
  $("#cart-subtotal").textContent = fmt(sub);
  $("#discount-line").hidden = !promoActif;
  $("#cart-discount").textContent = "-" + fmt(disc);
  $("#cart-total").textContent = fmt(sub - disc);
  $("#cart-count").textContent = panier.reduce((s,i)=>s+i.qte,0);
}
$("#cart-items").addEventListener("click", e => {
  const t=e.target; const id=+t.dataset.id, act=t.dataset.act;
  if(act==="plus") changerQte(id,1);
  if(act==="moins") changerQte(id,-1);
  if(act==="suppr") retirer(id);
});

/* ===== Code promo ===== */
$("#apply-promo").addEventListener("click", () => {
  const v = $("#promo-input").value.trim().toUpperCase();
  if(v===PROMO_CODE){ promoActif=true; toast("🎁 Code BIENVENUE appliqué : -10% !"); }
  else { promoActif=false; toast("❌ Code promo invalide"); }
  rendrePanier();
});

/* ===== Favoris ===== */
function toggleFav(id){
  if(favoris.includes(id)){ favoris=favoris.filter(f=>f!==id); toast("💔 Retiré des favoris"); }
  else { favoris.push(id); toast("❤️ Ajouté aux favoris"); }
  localStorage.setItem("fina_favoris", JSON.stringify(favoris));
  $("#fav-count").textContent = favoris.length;
  afficherProduits(); renderBestSellers(); rendreFavoris();
}
function rendreFavoris(){
  const items=$("#fav-items");
  const liste=PRODUITS.filter(p=>favoris.includes(p.id));
  if(liste.length===0){ items.innerHTML=`<p class="cart-empty">Aucun favori pour l'instant 🤍<br>Cliquez sur le cœur d'un produit !</p>`; return; }
  items.innerHTML = liste.map(p => `
    <div class="cart-item">
      <div class="ci-img">${visuel(p)}</div>
      <div class="ci-info">
        <h4>${p.nom}</h4>
        <span class="ci-price">${fmt(p.prix)}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:.3rem">
        <button class="ci-add" data-favadd="${p.id}">+ Panier</button>
        <button class="ci-remove" data-favdel="${p.id}" aria-label="Retirer">🗑️</button>
      </div>
    </div>`).join("");
}
$("#fav-items").addEventListener("click", e => {
  const a=e.target.closest("[data-favadd]"), d=e.target.closest("[data-favdel]");
  if(a) ajouter(+a.dataset.favadd);
  if(d) toggleFav(+d.dataset.favdel);
});

/* ===== Aperçu rapide (modale) ===== */
function ouvrirApercu(id){
  const p = PRODUITS.find(x=>x.id===id); if(!p) return;
  $("#modal-body").innerHTML = `
    <div class="modal-img">${visuel(p)}</div>
    <div class="modal-info">
      <span class="product-cat">${labelCat(p.cat)}</span>
      <h2>${p.nom}</h2>
      <div class="product-stars">${etoiles(p.note)} <small>${p.note}/5 (${p.avis} avis)</small></div>
      <p class="m-desc">${p.desc}</p>
      <span class="price">${p.oldPrix?`<span class="old">${fmt(p.oldPrix)}</span>`:""}${fmt(p.prix)}</span>
      <div class="modal-actions">
        <button class="btn btn-primary" data-id="${p.id}">+ Ajouter au panier</button>
        <button class="btn btn-ghost" data-fav="${p.id}">${favoris.includes(p.id)?'❤️ Favori':'🤍 Ajouter aux favoris'}</button>
      </div>
    </div>`;
  $("#modal-overlay").classList.add("open");
}
$("#modal-body").addEventListener("click", e => {
  const add=e.target.closest("[data-id]"), fav=e.target.closest("[data-fav]");
  if(add){ ajouter(+add.dataset.id); fermerModale(); }
  if(fav){ toggleFav(+fav.dataset.fav); fermerModale(); }
});
function fermerModale(){ $("#modal-overlay").classList.remove("open"); }
$("#close-modal").addEventListener("click", fermerModale);
$("#modal-overlay").addEventListener("click", e => { if(e.target.id==="modal-overlay") fermerModale(); });

/* ===== Tiroirs (panier / favoris) ===== */
const overlay=$("#overlay"), cartD=$("#cart-drawer"), favD=$("#fav-drawer");
function ouvrir(which){
  overlay.classList.add("open");
  if(which==="cart"){ cartD.classList.add("open"); favD.classList.remove("open"); }
  else { favD.classList.add("open"); cartD.classList.remove("open"); }
}
function fermerTiroirs(){ overlay.classList.remove("open"); cartD.classList.remove("open"); favD.classList.remove("open"); }
$("#open-cart").addEventListener("click", ()=>ouvrir("cart"));
$("#open-fav").addEventListener("click", ()=>ouvrir("fav"));
$("#close-cart").addEventListener("click", fermerTiroirs);
$("#close-fav").addEventListener("click", fermerTiroirs);
overlay.addEventListener("click", fermerTiroirs);

/* ===== Recherche (ouverture/fermeture) ===== */
$("#open-search").addEventListener("click", ()=>{ $("#searchbar").classList.toggle("open"); if($("#searchbar").classList.contains("open")) $("#search-input").focus(); });
$("#close-search").addEventListener("click", ()=>{ $("#searchbar").classList.remove("open"); recherche=""; $("#search-input").value=""; afficherProduits(); });

/* ===== Commande WhatsApp ===== */
$("#checkout").addEventListener("click", () => {
  if(panier.length===0){ toast("Votre panier est vide 🛍️"); return; }
  let msg = "Bonjour FINA Beauty 🌿, je souhaite commander :%0A%0A";
  let sub=0;
  panier.forEach(i => { msg += `• ${i.nom} x${i.qte} — ${fmt(i.prix*i.qte)}%0A`; sub+=i.prix*i.qte; });
  const disc = promoActif ? Math.round(sub*PROMO_PCT) : 0;
  if(promoActif) msg += `%0ACode BIENVENUE : -${fmt(disc)}`;
  msg += `%0A%0A*Total : ${fmt(sub-disc)}*%0A%0AMode de paiement : (Wave / Orange Money / à la livraison)%0AMode de réception : (retrait / livraison)`;
  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
});

/* ===== Formulaire contact → WhatsApp ===== */
$("#contact-form").addEventListener("submit", e => {
  e.preventDefault(); const f=e.target;
  const msg = `Bonjour FINA Beauty 🌿%0A%0ANom : ${encodeURIComponent(f.nom.value)}%0ATél : ${encodeURIComponent(f.tel.value)}%0A%0A${encodeURIComponent(f.message.value)}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  f.reset(); toast("💬 Ouverture de WhatsApp...");
});

/* ===== Newsletter ===== */
$("#newsletter-form").addEventListener("submit", e => { e.preventDefault(); e.target.reset(); toast("🎁 Merci ! Votre code BIENVENUE est prêt."); });

/* ===== FAQ ===== */
$("#faq-list").addEventListener("click", e => {
  const q=e.target.closest(".faq-q"); if(!q) return;
  q.parentElement.classList.toggle("open");
});

/* ===== Menu mobile ===== */
const menu=$("#menu");
$("#burger").addEventListener("click", ()=>menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>menu.classList.remove("open")));

/* ===== Toast ===== */
let toastTimer;
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),2200); }

/* ===== Scroll : header, retour haut, reveal ===== */
const header=$(".header"), toTop=$("#to-top");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY>20);
  toTop.classList.toggle("show", window.scrollY>500);
});
toTop.addEventListener("click", ()=>window.scrollTo({top:0,behavior:"smooth"}));
const io = new IntersectionObserver(entries => entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } }), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ===== Init ===== */
afficherProduits();
renderBestSellers();
rendrePanier();
rendreFavoris();
$("#fav-count").textContent = favoris.length;
