
const sqlPricesTop = `SELECT TOP ? id, prix, commentaire, DateAction, id_objet, dateCreate, dateModif, template FROM prix WHERE template=0 ORDER BY dateModif DESC`

const sqlCategories = `SELECT id, Categorie, Ordre, template FROM categorie ORDER BY Ordre`

const sqlObjects = `SELECT id, Objet, id_categorie, template FROM objet ORDER BY Objet`

const sqlYears = `SELECT distinct year(dateAction) as year FROM prix ORDER BY year(dateAction) DESC`

const sqlAddPrice = `INSERT INTO prix (prix, commentaire, DateAction, id_objet) VALUES ('?','?','?',?)`

const sqlPricesByDates = `SELECT p.id as priceId, p.prix, p.commentaire, p.DateAction, p.dateCreate, p.dateModif, p.template as priceTemplate
                            , o.id as objId, o.Objet, o.template as objTemplate
                            , c.id as catId, c.categorie, c.Ordre, c.template as catTemplate
                            FROM prix p, objet o, categorie c
                            WHERE o.id_categorie = c.id
                            AND p.id_objet = o.id
                            AND Year(p.DateAction) in (?)
                            AND Month(p.DateAction) in (?)
                            ORDER BY p.DateAction, c.Ordre, o.Objet`

module.exports = {
  sqlPricesByDates,
  sqlPricesTop,
  sqlCategories,
  sqlObjects,
  sqlYears,
  sqlAddPrice
}
