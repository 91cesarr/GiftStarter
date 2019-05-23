const express = require("express")
const router = express.Router()
const config = require("config")
const jwt = require("jsonwebtoken")
const sha512 = require("js-sha512")
const conn = require("../db")

// // backend stripe 
// const paymentApi = require('./payment');
// const configureRoutes = app => {
//   paymentApi(app);
// };


router.post("/register", (req, res, next) => {
  const username = req.body.username
  const password = sha512(req.body.password + config.get("salt"))

  const checksql = "SELECT count(1) as count from users WHERE username = ?"

  conn.query(checksql, [username], (err, results, fields) => {
    const count = results[0].count

    if (count > 0) {
      res.status(409).json({
        error: "Username already taken"
      })
    } else {
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)"

      conn.query(sql, [username, password], (err, results, fields) => {
        if (err) {
          console.log(err)
          throw new Error("register failed")
        } else {
          const user_id = results.insertId
          const token = jwt.sign({ username, user_id }, config.get("secret"))
          res.json({
            token: token
          })
        }
      })
    }
  })
})

router.post("/login", (req, res, next) => {
  const username = req.body.username
  const password = sha512(req.body.password + config.get("salt"))

  const sql =
    "SELECT count(1) as count FROM users WHERE username = ? AND password = ?"

  conn.query(sql, [username, password], (err, results, fields) => {
    const count = results[0].count

    if (count >= 1) {
      const sql2 = 'SELECT user_id FROM users WHERE username = ?'
      conn.query(sql2, [username], (err2, results2, fields2) => {
        const user_id = results2[0].user_id
        const token = jwt.sign({ username, user_id }, config.get("secret"))

        res.json({
          token
        })
      })
    } else {
      res.status(401).json({
        error: "Invalid username or password"
      })
    }
  })
})

// Create Item Page
// get user profile data
router.get('/user/:username', (req, res, next) => {
  const sql = `
  SELECT username, user_id, fname
  FROM users 
  WHERE username  = ?
  `

  conn.query(sql, [req.params.username], (err, results, fields) => {
    res.json(results[0])
  })
})


// get total amount of donations 
router.get('/donation/:item_id', (req, res, next) => {
  const sql = `
SELECT
SUM(amount) as total
FROM donations
WHERE item_id = ?
  `
  conn.query(sql, [req.params.item_id], (err, results, fields) => {
    res.json(results[0])
  })
})

// / donation page
// post new donation
router.post("/donation", (req, res, next) => {
  const sql = `
 INSERT INTO donations (
   donor_name, 
   amount,
   item_id,
   requestor_id
 )
 VALUES (?, ?, ?, ?)
 `
  conn.query(sql, [
    req.body.donor_name,
    req.body.amount,
    req.body.item_id,
    req.body.requestor_id
  ], (err, results, fields) => {

    console.log(err)
    res.json({
      donor_name: req.body.donor_name,
      amount: req.body.amount,
      item_id: req.body.item_id,
      requestor_id: req.body.requestor_id
    })
  })
})


// get the specific item
router.get('/item/:item_id', (req, res, next) => {
  const sql = `
  SELECT  items.*
  FROM items
  WHERE item_id  = ?
  `

  conn.query(sql, [req.params.item_id], (err, results, fields) => {
    res.json(results[0])
  })
})

// URGENT!!! ADDED A FIELD: REQUESTOR_ID - UPDATE CODE!!!
router.get('/dashboard/:item_id', (req, res, next) => {
  const sql = `
  SELECT  i.item_id as item_id, i.name as name, i.amount as amount, sum(d.amount) as donAmount, (i.amount-sum(d.amount)) as remainder, round((sum(d.amount)/i.amount),2)*100 as percent, i.picture_url as picture, i.status as status, i.description as description, i.reason as reason, i.requestor_id as requestor_id
  FROM items i
  LEFT JOIN donations d ON i.item_id = d.item_id
  GROUP BY item_id DESC
  HAVING item_id  = ?
  `

  conn.query(sql, [req.params.item_id], (err, results, fields) => {
    res.json(results[0])
  })
})

// post new item
router.post('/item', (req, res, next) => {
  const sql = `
  INSERT INTO items (
    requestor_id,  
    name,
    description,
    category,
    reason,
    amount,
    picture_url,
    item_url
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  conn.query(sql, [Number(req.body.requestor_id), req.body.name, req.body.description, req.body.category, req.body.reason, Number(req.body.amount), req.body.picture_url, req.body.item_url], (err, results, fields) => {
    res.json({
      requestor_id: req.body.requestor_id,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      reason: req.body.reason,
      amount: req.body.amount,
      pic_url: req.body.picture_url,
      item_url: '',
      id: results.insertId
    })
  })
})


// get last posted item
router.get('/item/:user_id', (req, res, next) => {
  const sql = `
  SELECT  items.*
  FROM items
  ORDER BY item_id DESC
  WHERE user_id  = ?
  `

  conn.query(sql, (err, results, fields) => {
    res.json(results[0].item_id)
  })
})

// Dashboard Page
// get item list
router.get('/items/:requestor_id', (req, res, next) => {
  const sql = `
  SELECT  i.item_id as item_id, i.name as name, i.amount as amount, sum(d.amount) as donAmount, (i.amount-sum(d.amount)) as remainder, i.requestor_id, round((sum(d.amount)/i.amount),2)*100 as percent, i.picture_url as picture, i.status as status, i.description as description, i.reason as reason
  FROM items i
  LEFT JOIN donations d ON i.item_id = d.item_id
  GROUP BY item_id DESC
  HAVING requestor_id  = ?
  LIMIT 10
  `

  conn.query(sql, [req.params.requestor_id], (err, results, fields) => {
    console.log(err)
    res.json(results)
  })
})

// get item donations list
router.get('/donations/:item_id', (req, res, next) => {
  const sql = `
  SELECT  donations.*
  FROM donations
  WHERE item_id  = ?
  `

  conn.query(sql, [req.params.item_id], (err, results, fields) => {
    res.json(results)
  })
})


module.exports = router