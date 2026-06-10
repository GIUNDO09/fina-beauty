-- ============================================================
-- FINA Beauty — Installation Supabase (à coller dans SQL Editor)
-- Supabase -> SQL Editor -> New query -> coller -> RUN
-- ============================================================

-- 1) Table des produits
create table if not exists products (
  id bigint primary key,
  nom text not null,
  cat text,
  prix integer,
  old_prix integer,
  photo text,
  photos jsonb,
  img text,
  note real default 5,
  avis integer default 0,
  badge text,
  description text,
  created_at timestamptz default now()
);

-- 2) Sécurité : lecture publique, écriture réservée à l'admin connecté
alter table products enable row level security;
drop policy if exists "lecture publique" on products;
create policy "lecture publique" on products for select using (true);
drop policy if exists "ecriture admin" on products;
create policy "ecriture admin" on products for all
  to authenticated using (true) with check (true);

-- 3) Stockage des photos (bucket public "produits")
insert into storage.buckets (id, name, public)
  values ('produits', 'produits', true)
  on conflict (id) do nothing;
drop policy if exists "photos lecture" on storage.objects;
create policy "photos lecture" on storage.objects for select using (bucket_id = 'produits');
drop policy if exists "photos upload" on storage.objects;
create policy "photos upload" on storage.objects for insert to authenticated with check (bucket_id = 'produits');
drop policy if exists "photos maj" on storage.objects;
create policy "photos maj" on storage.objects for update to authenticated using (bucket_id = 'produits');
drop policy if exists "photos suppr" on storage.objects;
create policy "photos suppr" on storage.objects for delete to authenticated using (bucket_id = 'produits');

-- 4) Migration de tes 29 produits actuels
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (13,'Savon au Nila Bleu','visage',1800,2500,'images/savon-nila-bleu.png',null,'🧼',5,24,'best','Savon de beauté artisanal à la poudre de nila bleu, fabriqué au Maroc. Unifie le teint, atténue taches, zones sombres et boutons. Nettoie le visage en profondeur et régule le sébum pour un teint éclatant. Naturel & fait main.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (14,'Savon Noir Marocain — 250g','corps',1500,null,'images/savon-noir.png',null,'🧴',4.9,18,'best','Savon noir marocain 100% naturel et artisanal (250g). Pâte traditionnelle à base d''olive, utilisée au hammam pour nettoyer, purifier et préparer la peau au gommage. Laisse la peau douce, nette et éclatante. Tradition authentique du Maroc.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (15,'Savon Noir Marocain — 400g','corps',2500,null,'images/savon-noir-250g-2500.png',null,'🧴',4.9,12,null,'Grand format 400g du savon noir marocain 100% naturel et artisanal. Pâte d''olive du hammam pour nettoyer, purifier et exfolier la peau. Idéal pour un usage régulier en famille. Tradition authentique du Maroc.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (16,'Bracelet Ayat al-Kursi (Adulte)','bijoux',5000,null,'images/BRACELET-KURSI.png',null,'💍',5,31,'new','Bracelet jonc gravé du verset Ayat al-Kursi (le Trône), en acier inoxydable haute qualité. Ouverture ajustable homme & femme, résistant à l''eau et à l''usure, gravure arabe détaillée. Disponible en 4 couleurs : or, argent, noir, or rose. Belle idée cadeau spirituelle, livré en emballage premium.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (17,'Bracelet Ayat al-Kursi (Enfant)','bijoux',3500,null,'images/BRACELET-KURSI-ENFANT.png',null,'💍',5,14,'new','Version enfant du bracelet Ayat al-Kursi : doux, léger et ajustable pour les petits poignets. Acier inoxydable hypoallergénique (4 mm), résistant à l''eau et à l''usure, ne noircit pas. Belle idée cadeau éducative et spirituelle, livré dans une jolie boîte prête à offrir.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (18,'Savon Hikma Carotte — 400g','corps',2500,null,'images/hikma-carrotes.png',null,'🥕',5,9,'new','Savon Hikma à la carotte (400g). Riche en bêta-carotène, il unifie le teint, ravive l''éclat et donne bonne mine. 100% naturel et artisanal.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (19,'Savon Hikma Curcuma — 400g','corps',2500,null,'images/hikma-curcuma.png',null,'🟡',5,7,'new','Savon Hikma au curcuma (400g). Purifiant et anti-imperfections, il atténue les taches et illumine la peau. 100% naturel et artisanal.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (20,'Savon Hikma Miel — 400g','corps',2500,null,'images/hikma-miel.png',null,'🍯',5,8,'new','Savon Hikma au miel (400g). Doux et hydratant, il nourrit et adoucit la peau en profondeur. 100% naturel et artisanal.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (21,'Crème YOKEBE — Galbe & Fermeté','silhouette',5000,null,'images/GAME-YOKEBE.png',null,'🧴',5,14,'new','Crème corporelle YOKEBE, 100% naturelle (réservée aux adultes). Traditionnellement utilisée en massage local pour galber et raffermir fessiers et hanches. Usage externe.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (22,'Huile YOKEBE — 125 ml','silhouette',5000,null,'images/GAME-YOKEBE.png',null,'💧',5,10,'new','Huile corporelle YOKEBE (125 ml), 100% naturelle (réservée aux adultes). À masser localement pour galber et raffermir fessiers et hanches. Usage externe.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (23,'Sirop YOKEBE — 125 ml','silhouette',5000,null,'images/GAME-YOKEBE.png',null,'🍶',5,8,'new','Sirop YOKEBE (125 ml), complément naturel (réservé aux adultes) traditionnellement utilisé pour favoriser la prise de poids. À consommer selon les indications de l''emballage.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (24,'Pack YOKEBE Complet (Crème + Huile + Sirop)','silhouette',15000,null,'images/GAME-YOKEBE.png',null,'🎁',5,11,'best','Le coffret complet de la routine YOKEBE : crème + huile (125 ml) + sirop (125 ml), 100% naturel, réservé aux adultes. Toute la gamme galbe & fermeté en une seule commande, à prix groupé.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (25,'Coffret Disaar Vitamine C (5 produits)','visage',8000,null,'images/DISAAR.png',null,'🍊',5,16,'best','Coffret complet Disaar à la Vitamine C & acide hyaluronique : nettoyant visage, sérum éclat, sérum whitening, crème hydratante et soin contour des yeux. Pour un teint lumineux et unifié, une peau repulpée et hydratée. Anti-taches, anti-rides et anti-cernes.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (26,'Gofio El Sahari — Farine de Maïs (375g)','silhouette',3500,null,'images/GOFIO.png',null,'🌽',5,13,'new','Farine de maïs grillé Gofio El Sahari (375g), 100% naturelle, sans conservateurs. Aliment traditionnel saharien riche en énergie, consommé pour favoriser la prise de poids. À mélanger au lait, à l''eau ou à une boisson chaude.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (27,'Huile de Fenugrec — Souplesse','huiles',1500,null,'images/huile-fenugrec.png',null,'🌱',5,7,null,'Huile de fenugrec Souplesse, 100% végétale. Fortifie les cheveux, favorise la pousse et nourrit la peau.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (28,'Huile d''Ail — Souplesse','huiles',1500,null,'images/huile-ail.png',null,'🧄',5,6,null,'Huile d''ail Souplesse, 100% végétale. Renforce les cheveux et aide à limiter la chute.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (29,'Huile de Vitamine E — Souplesse','huiles',1500,null,'images/huile-vitamine-e.png',null,'💛',5,8,null,'Huile de vitamine E Souplesse, 100% végétale. Antioxydante, nourrit et protège la peau et les cheveux.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (30,'Huile de Noix de Coco — Souplesse','huiles',1500,null,'images/huile-coco.png',null,'🥥',5,9,null,'Huile de noix de coco Souplesse, 100% végétale. Hydrate, fait briller les cheveux et adoucit la peau.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (31,'Huile d''Olive — Souplesse','huiles',1500,null,'images/huile-olive.png',null,'🫒',5,8,null,'Huile d''olive Souplesse, 100% végétale. Nourrit en profondeur cheveux et peau.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (32,'Huile de Curcuma — Souplesse','huiles',1500,null,'images/huile-curcuma.png',null,'🟠',5,7,null,'Huile de curcuma Souplesse, 100% végétale. Ravive l''éclat du teint, apaise et purifie la peau.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (34,'Huile de Ricin — Souplesse','huiles',1500,null,'images/huile-ricin.png',null,'🌰',5,11,null,'Huile de ricin Souplesse, 100% végétale. Stimule la pousse des cheveux, cils et sourcils, et nourrit la peau en profondeur.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (35,'Mélange d''Huiles Cheveux — Spécial FINA','huiles',8000,null,'images/huilemelangecheveux.png',null,'💆‍♀️',5,22,'best','Le mélange signature FINA pour cheveux : une synergie d''huiles végétales qui nourrit le cuir chevelu, fortifie les cheveux et favorise la pousse. La recette beauté maison de FINA, pour des cheveux forts et brillants.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (36,'Huile d''Akpi (Djansang)','huiles',1500,null,'images/huile-akpi.png',null,'🌰',5,9,null,'Huile d''Akpi (djansang), 100% naturelle. Traditionnellement utilisée en Afrique de l''Ouest pour nourrir la peau et les cheveux.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (37,'Medicube Collagen Night Wrapping Mask','visage',8000,null,'images/medicube.png',null,'🌙',5,17,'best','Masque de nuit au collagène Medicube (soin coréen premium). Appliqué le soir, il enveloppe la peau : raffermit, hydrate intensément et illumine le teint pendant le sommeil. Réveil avec une peau repulpée et éclatante.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (38,'Poudre de Nila Bleu — 50g','visage',3000,null,'images/poudre-nilableu.png',null,'💙',5,19,'best','Poudre de nila bleu pure (50g), qualité supérieure. La poudre de beauté traditionnelle du Maroc pour unifier le teint, atténuer les zones sombres et illuminer la peau. À utiliser en masque ou mélangée à ta routine. 100% naturelle.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (39,'Tirelire Artisanale en Bois','artisanat',1500,null,'images/tire-lire.png',null,'🪵',5,8,'new','Tirelire artisanale en bois, gravée à la main. Forme hexagonale élégante avec motif laurier. Parfaite pour économiser ou offrir — un joli objet déco fait main.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (40,'Lèvre Rose — Rothie','visage',1000,null,'images/levre-rose.png',null,'💋',5,10,'new','Soin « Lèvre Rose » de Rothie : ravive et rosit naturellement les lèvres foncées pour des lèvres douces, hydratées et roses. À appliquer quotidiennement.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (41,'Set Coiffure Pro 9-en-1 (2200W)','cheveux',18000,null,'images/maquillage/1.jpg','["images/maquillage/1.jpg","images/maquillage/2.jpg","images/maquillage/3.jpg","images/maquillage/4.jpg","images/maquillage/5.jpg","images/maquillage/6.jpg"]'::jsonb,'💇‍♀️',5,14,'new','Coffret de coiffure professionnel 9-en-1 (2200W) : sèche-cheveux puissant, lisseur, fer à friser, brosse soufflante, peignes, embouts et accessoires. Adapté à tous types de cheveux. Un vrai coiffage de salon à la maison.');
insert into products (id,nom,cat,prix,old_prix,photo,photos,img,note,avis,badge,description) values (33,'MOIKA — Pads Acide Kojique & Curcuma (50)','visage',8000,null,'images/MOIKA.png',null,'🟡',5,15,'new','Disques nettoyants MOIKA à l''acide kojique et au curcuma (50 pads). Éclaircit, illumine et revitalise la peau. Formule quotidienne pour un teint lumineux et unifié, aide à atténuer les taches.');