-- CREATION DE LA TABLE CATEGORY 
CREATE TABLE CATEGORY (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(50) NOT NULL
);

-- CREATION DE LA BASE DE DONNEE
CREATE TABLE ADS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(50) NOT NULL,
    description TEXT,
    price INTEGER,
    picture varchar(128),
    location varchar(50),
    owner varchar(50),
    category  INTEGER,
    dateAtCreated DATE,
    FOREIGN KEY(category) REFERENCES CATEGORY(id)
);



-- INSERTION DES DONNEE DANS LA TABLE CATEGORY
PRAGMA foreign_keys = ON;
INSERT INTO CATEGORY (name) VALUES ('Vêtement'),('Téléphonie'), ('Immobilier'), ('Véhicules'), ('Informatique'), ('Maison'), ('Emploi'), ('Loisirs'), ('Mode'), ('Multimédia'), ('Hifi'), ('Matériel professionnel'), ('Musique'), ('Montres & Bijoux'), ('Jeux vidéo & Consoles'), ('Sacs & Accessoires'), ('Autres');

-- VIDER LA TABLE si NECESSAIRE
--  TRUNCATE TABLE ad;


-- INSERTION DES DONNEe
PRAGMA foreign_keys = ON;
INSERT INTO Ads (title, description, price, picture, location, category, dateAtCreated,owner )
VALUES
  ('iPhone 13 Pro', 'iPhone 13 Pro 256 Go en excellent état', 900, 'iphone.jpg', 'Paris', 1, '2023-09-20', 'Jean Dupont'),
  ('iPhone 12 Pro', 'iPhone 12 bon état', 300, 'iphone.jpg', 'Paris', 1, '2022-09-20', 'Marie Martin'),
  ('Appartement à louer', 'Appartement 2 pièces, proche du centre-ville', 800, 'appartement.jpg', 'Lyon', 2, '2023-09-21', 'Pierre Tremblay'),
  ('Vélo de montagne', 'Vélo de montagne tout suspendu, en parfait état', 300, 'velo.jpg', 'Bordeaux', 3, '2023-09-22', 'Sophie Lefebvre'),
  ('Vélo de ville', 'Vélo de ville suspendu, en  état', 200, 'velo.jpg', 'Bordeaux', 3, '2023-09-22', 'Pauline Dubois'),
  ('Ordinateur portable Dell', 'Ordinateur portable Dell XPS 15, 16 Go de RAM', 1200, 'dell.jpg', 'Paris', 4, '2023-09-23', 'Nicolas Leclerc'),
  ('Studio meublé', 'Studio meublé, toutes charges comprises', 600, 'studio.jpg', 'Lyon', 2, '2023-09-24', 'Lucie Girard'),
  ('Table de salle à manger', 'Table en bois massif avec 6 chaises assorties', 250, 'table.jpg', 'Bordeaux', 5, '2023-09-25', 'Antoine Gagnon'),
  ('Télévision Samsung 55 pouces', 'Télévision 4K, Smart TV avec télécommande', 600, 'tv.jpg', 'Paris', 5, '2023-09-26', 'Émilie Caron'),
  ('Voiture d occasion', 'Toyota Camry 2019, en excellent état', 15000, 'voiture.jpg', 'Lyon', 6, '2023-09-27', 'Thomas Bergeron'),
  ('Cuisine équipée', 'Cuisine moderne avec électroménagers inclus', 2500, 'cuisine.jpg', 'Bordeaux', 7, '2023-09-28', 'Marc Dupuis'),
  ('Canapé en cuir', 'Canapé en cuir véritable, 3 places', 800, 'canape.jpg', 'Paris', 8, '2023-09-29', 'Julie Lambert'),
  ('MacBook Pro 13 pouces', 'MacBook Pro avec processeur M1, 512 Go de stockage', 1400, 'macbook.jpg', 'Lyon', 4, '2023-09-30', 'Philippe Lavoie'),
  ('Appartement de luxe', 'Appartement de 4 pièces avec vue sur la rivière', 2500, 'appartement_luxe.jpg', 'Bordeaux', 2, '2023-10-01', 'Isabelle Morin'),
  ('Vélo de route', 'Vélo de route en carbone avec groupe Shimano 105', 1200, 'velo_route.jpg', 'Paris', 3, '2023-10-02', 'Sébastien Roy'),
  ('Tablet Samsung Galaxy', 'Tablet Samsung Galaxy Tab S7, écran AMOLED', 400, 'tablet.jpg', 'Lyon', 9, '2023-10-03', 'Valérie Boucher'),
  ('Piano à queue Steinway', 'Piano à queue Steinway & Sons, son exceptionnel', 15000, 'piano.jpg', 'Bordeaux', 10, '2023-10-04', 'François Gagné'),
  ('Chaise de bureau ergonomique', 'Chaise de bureau avec support lombaire réglable', 200, 'chaise_bureau.jpg', 'Paris', 11, '2023-10-05', 'Nathalie Lévesque'),
  ('Guitare acoustique', 'Guitare acoustique de qualité professionnelle', 800, 'guitare.jpg', 'Bordeaux', 12, '2023-10-06', 'Michel Tremblay'),
  ('Montre Rolex Submariner', 'Montre de plongée Rolex Submariner en acier', 10000, 'rolex.jpg', 'Paris', 13, '2023-10-07', 'Caroline Gauthier');

-- AFFICHAGE DES ANNONCES
SELECT * FROM ADS;

-- 
SELECT * FROM CATEGORY;

-- AFFICHAGE DES ANNONCES avec NOM DE CATEGORIE filtrer p category
SELECT ads.title,ads.price,ads.description , ads.location, ads.date ,cat.id as catId, cat.name as categoryName FROM  ADS as ads
LEFT JOIN CATEGORY as cat ON cat.id = ads.category WHERE LOWER(categoryName) in ('téléphonie','immobilier');

-- AFFICHAGE DU PRIX MOYEN DSE ANNONCES de la categorie de la category telephonie
SELECT AVG(ads.price)
FROM ads
INNER JOIN category AS cat ON cat.id = ads.category
WHERE LOWER(cat.name) = 'téléphonie';

--Afficher les annonces des catégories dont le nom commence par un “v”
SELECT ads.* ,cat.id as catId, cat.name as categoryName FROM  ADS as ads
LEFT JOIN CATEGORY as cat ON cat.id = ads.category WHERE LOWER(ads.title) LIKE 'v%';

-- AFFICHAGE DES ANNONCES PAR VILLE
SELECT * FROM ADS WHERE LOWER(location) = 'bordeaux';

-- suppresion des annonce avec prix superieur a un montant
-- DECLARE @montant AS  INTEGER=1000;-- Déclarez la variable et attribuez-lui une valeur
DELETE FROM ADS WHERE price > 1000 ;

-- METTRE aj our les annonce du 1er september avec un rix 0
UPDATE ADS SET price=0 WHERE date='2023-09-01' 

-- AFFICHAGE DE la moynne des prix des annonces a paris 
SELECT AVG(price) FROM ADS WHERE LOWER(location) = 'paris';

--BONUS DE la moynne des prix des
SELECT AVG(price),location FROM ADS GROUP BY location;


DELETE FROM ADS WHERE id = 23;



-- 