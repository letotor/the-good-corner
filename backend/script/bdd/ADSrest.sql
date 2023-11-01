-- CREATION DE LA TABLE CATEGORY 
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(50) NOT NULL
);

-- CREATION DE LA BASE DE DONNEE
CREATE TABLE Ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(50) NOT NULL,
    description TEXT,
    price INTEGER,
    picture varchar(256),
    location varchar(50),
    owner varchar(50),
    categoryId  INTEGER,
    dateAtCreated DATE,
    FOREIGN KEY(category) REFERENCES CATEGORY(id)
);



-- INSERTION DES DONNEE DANS LA TABLE CATEGORY
PRAGMA foreign_keys = ON; -- permet de garder les relation entre talbe et contrainte pour ne pas effacer et casser la structure
INSERT INTO CATEGORY (name) VALUES ('Vêtement'),('Téléphonie'), ('Immobilier'), ('Véhicules'), ('Informatique'), ('Maison'), ('Emploi'), ('Loisirs'), ('Mode'), ('Multimédia'), ('Hifi'), ('Matériel professionnel'), ('Musique'), ('Montres & Bijoux'), ('Jeux vidéo & Consoles'), ('Sacs & Accessoires'), ('Autres');

-- VIDER LA TABLE si NECESSAIRE
--  TRUNCATE TABLE ad;


-- INSERTION DES DONNEe
PRAGMA foreign_keys = ON;
DELETE FROM Ad;
INSERT INTO Ad (title, description, price, picture, location, categoryId, dateAtCreated,owner )
VALUES
  ('iPhone 13 Pro', 'iPhone 13 Pro 256 Go en excellent état', 900, 'https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_640.jpg', 'Paris', 2, '2023-09-20', 'Jean Dupont'),
  ('iPhone 12 Pro', 'iPhone 12 bon état', 300, 'https://cdn.pixabay.com/photo/2016/11/29/07/06/apple-1867991_640.jpg', 'Paris', 2, '2022-09-20', 'Marie Martin'),
  ('Appartement à louer', 'Appartement 2 pièces, proche du centre-ville', 800, 'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg', 'Lyon', 3, '2023-09-21', 'Pierre Tremblay'),
  ('Vélo de montagne', 'Vélo de montagne tout suspendu, en parfait état', 300, 'https://cdn.pixabay.com/photo/2015/05/28/22/29/bicycle-788733_640.jpg', 'Bordeaux', 4, '2023-09-22', 'Sophie Lefebvre'),
  ('Vélo de ville', 'Vélo de ville suspendu, en  état', 200, 'https://cdn.pixabay.com/photo/2013/07/13/13/46/bicycle-161524_640.png', 'Bordeaux', 4, '2023-09-22', 'Pauline Dubois'),
  ('Ordinateur portable Dell', 'Ordinateur portable Dell XPS 15, 16 Go de RAM', 1200, 'https://media.istockphoto.com/id/1266598853/de/foto/mehrere-computer-und-ingenieure.webp?b=1&s=612x612&w=0&k=20&c=3xBq6_0DJvK4rdsUAkCV_BqXv_0WbTlEzC0qK0-hW_E=', 'Paris', 10, '2023-09-23', 'Nicolas Leclerc'),
  ('Studio meublé', 'Studio meublé, toutes charges comprises', 600, 'https://cdn.pixabay.com/photo/2016/06/22/19/42/doll-house-1473910_640.jpg', 'Lyon', 3, '2023-09-24', 'Lucie Girard'),
  ('Table de salle à manger', 'Table en bois massif avec 6 chaises assorties', 250, 'https://cdn.pixabay.com/photo/2017/03/28/12/17/chairs-2181994_640.jpg', 'Bordeaux', 6, '2023-09-25', 'Antoine Gagnon'),
  ('Télévision Samsung 55 pouces', 'Télévision 4K, Smart TV avec télécommande', 600, 'https://cdn.pixabay.com/photo/2016/11/30/08/46/living-room-1872192_640.jpg', 'Paris', 10, '2023-09-26', 'Émilie Caron'),
  ('Voiture d occasion', 'Toyota Camry 2019, en excellent état', 15000, 'https://cdn.pixabay.com/photo/2019/03/05/13/50/vehicle-4036203_1280.jpg', 'Lyon', 4, '2023-09-27', 'Thomas Bergeron'),
  ('Cuisine équipée', 'Cuisine moderne avec électroménagers inclus', 2500, 'https://cdn.pixabay.com/photo/2015/04/18/13/22/kitchen-728724_640.jpg', 'Bordeaux', 6, '2023-09-28', 'Marc Dupuis'),
  ('Canapé en cuir', 'Canapé en cuir véritable, 3 places', 800, 'https://media.istockphoto.com/id/1366569235/fr/photo/canap%C3%A9-isol%C3%A9-sur-fond-blanc.webp?b=1&s=612x612&w=0&k=20&c=Dj0EfFTllgFYIsCOh5ASaSXjP6mR6wRxXtotosyyY6w=', 'Paris', 6, '2023-09-29', 'Julie Lambert'),
  ('MacBook Pro 13 pouces', 'MacBook Pro avec processeur M1, 512 Go de stockage', 1400, 'macbook.jpg', 'Lyon', 4, '2023-09-30', 'Philippe Lavoie'),
  ('Appartement de luxe', 'Appartement de 4 pièces avec vue sur la rivière', 2500, 'https://media.istockphoto.com/id/1289883686/fr/photo/appartement-spacieux-avec-mur-de-fen%C3%AAtre.webp?b=1&s=612x612&w=0&k=20&c=ZfqDPoa-1JqDzrQrDZZ4DthxrtHrOstrLSGRhQ-Npjw=', 'Bordeaux', 3, '2023-10-01', 'Isabelle Morin'),
  ('Vélo de route', 'Vélo de route en carbone avec groupe Shimano 105', 1200, 'https://cdn.pixabay.com/photo/2016/11/29/07/42/bicycle-1868162_640.jpg', 'Paris', 4, '2023-10-02', 'Sébastien Roy'),
  ('Tablet Samsung Galaxy', 'Tablet Samsung Galaxy Tab S7, écran AMOLED', 400, 'https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_640.jpg', 'Lyon', 10, '2023-10-03', 'Valérie Boucher'),
  ('Piano à queue Steinway', 'Piano à queue Steinway & Sons, son exceptionnel', 15000, 'https://media.istockphoto.com/id/1357529193/fr/photo/rendu-3d-dun-salon-confortable.webp?b=1&s=612x612&w=0&k=20&c=BNlVzjNZ9cAw43HGUrTJQT9Vv3eVMjVP98yZY5L_0Ag=', 'Bordeaux', 10, '2023-10-04', 'François Gagné'),
  ('Chaise de bureau ergonomique', 'Chaise de bureau avec support lombaire réglable', 200, 'https://media.istockphoto.com/id/118198399/fr/photo/chaise-de-bureau.webp?b=1&s=612x612&w=0&k=20&c=PA-qVMa6OXW9MhwFpZBTKZ2EPxvkOTpZPxih7drM3q0=', 'Paris', 13, '2023-10-05', 'Nathalie Lévesque'),
  ('Guitare acoustique', 'Guitare acoustique de qualité professionnelle', 800, 'https://cdn.pixabay.com/photo/2016/01/14/06/09/woman-1139397_640.jpg', 'Bordeaux', 13, '2023-10-06', 'Michel Tremblay'),
  ('Montre Rolex Submariner', 'Montre de plongée Rolex Submariner en acier', 10000, 'https://cdn.pixabay.com/photo/2018/03/26/22/17/time-3264348_640.jpg', 'Paris', 14, '2023-10-07', 'Caroline Gauthier');

-- AFFICHAGE DES ANNONCES
SELECT * FROM Ad;

-- 
SELECT * FROM CATEGORY;

--modification des images 
UPDATE TABLE Ad SET(picture


-- AFFICHAGE DES ANNONCES avec NOM DE CATEGORIE filtrer p category
SELECT ad.title,ad.price,ad.description , ad.location, ad.date ,cat.id as catId, cat.name as categoryName FROM  ad as ad
LEFT JOIN CATEGORY as cat ON cat.id = ad.category WHERE LOWER(categoryName) in ('téléphonie','immobilier');

-- AFFICHAGE DU PRIX MOYEN DSE ANNONCES de la categorie de la category telephonie
SELECT AVG(ad.price)
FROM ad
INNER JOIN category AS cat ON cat.id = ad.category
WHERE LOWER(cat.name) = 'téléphonie';

--Afficher les annonces des catégories dont le nom commence par un “v”
SELECT ad.* ,cat.id as catId, cat.name as categoryName FROM  ad as ad
LEFT JOIN CATEGORY as cat ON cat.id = ad.category WHERE LOWER(ad.title) LIKE 'v%';

-- AFFICHAGE DES ANNONCES PAR VILLE
SELECT * FROM ad WHERE LOWER(location) = 'bordeaux';

-- suppresion des annonce avec prix superieur a un montant
-- DECLARE @montant AS  INTEGER=1000;-- Déclarez la variable et attribuez-lui une valeur
DELETE FROM ad WHERE price > 1000 ;

-- METTRE aj our les annonce du 1er september avec un rix 0
UPDATE ad SET price=0 WHERE date='2023-09-01' 

-- AFFICHAGE DE la moynne des prix des annonces a paris 
SELECT AVG(price) FROM ad WHERE LOWER(location) = 'paris';

--BONUS DE la moynne des prix des
SELECT AVG(price),location FROM ad GROUP BY location;

PRAGMA foreign_keys = ON
DELETE FROM ad WHERE id = 23;



-- 