/* eslint-disable no-undef */
require('dotenv').config()
const { dateForSQL, setParamInSQL } = require('./utils.js')
const http = require('http')
const odbc = require('odbc')
const url = require('url')
const {
  selectPriceById,
  selectPricesByPeriod,
  setPricesByDates,
  setCategories,
  setObjects,
  setYears,
  addPrice,
  setPricesTop
} = require('./queries')
const {
  parsePrices,
  parseCategories,
  parseObjects,
  parseYears,
  parseAddPrice
} = require('./parsers')

async function connectAndCall (req, res, data) {
  const cnx = await odbc.connect('DSN=financereact')
  const parsedUrl = url.parse(req.url, true)
  const query_ = parsedUrl.query
  const path_ = parsedUrl.pathname
  try {
    let sql
    let params
    if (req.method === 'GET') {
      if (path_ === '/pricesByDates') {
        // http://localhost:3001/pricesByDates?years=2025,2024&months=1,2,3
        const years_ = query_.years
        const months_ = query_.months
        sql = setPricesByDates
        params = [years_, months_]
        parser = parsePrices
      } else if (path_ === '/pricesTop') {
        // http://localhost:3001/pricesByDates?top=10
        const top_ = query_.top
        sql = setPricesTop
        params = [top_]
        parser = parsePrices
      } else if (path_ === '/setCategories') {
        // http://localhost:3001/setCategories
        sql = setCategories
        params = []
        parser = parseCategories
      } else if (path_ === '/setObjects') {
        // http://localhost:3001/setObjects
        params = []
        sql = setObjects
        parser = parseObjects
      } else if (path_ === '/setYears') {
        // http://localhost:3001/setYears
        params = []
        sql = setYears
        parser = parseYears
      }
    }
    if (req.method === 'POST') {

      if (path_ === '/addPrice') {
              const  {price,  comment,  actionDate,objId  } =  data
               // http://localhost:3001/addPrice
               params = [`${price}`,  `${comment}`, `${actionDate}` ,objId]
               sql = addPrice
               parser = parseAddPrice
    }}

    if (path_ === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' })
      return res.end()
    }
    console.log("SQL:", setParamInSQL(sql, params))
    const rows = await cnx.query(setParamInSQL(sql, params))

    let rows_
    if (req.method === 'POST')
    {    const sqlId = await cnx.query(`SELECT @@IDENTITY as id`);
          rows_ = sqlId[0].id;
     } else

     {
      rows_=rows
     }
     console.log("rows_:", rows_)
    const result = await parser(rows_, params)
    const jsonData = JSON.stringify(result)
    
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    await res.end(jsonData)
  } catch (error) {
    console.error(error)
  } finally {
    cnx.close()
  }
}

const port = process.env.PORT
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
  } else if (req.method === 'GET') {
    await connectAndCall(req, res, null)
  } else if (req.method === 'POST') {
    req.on('data', async data => {
      await connectAndCall(req, res, JSON.parse(data))
    })
    req.on('end', () => {})
  }
})

server.listen(port, () => {
  console.log('listening... on ' + port)
})
