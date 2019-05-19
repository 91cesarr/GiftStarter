const express = require("express")
const router = express.Router()
const config = require("config")
const jwt = require("jsonwebtoken")
const sha512 = require("js-sha512")
const conn = require("../db")

// backend stripe 
const paymentApi = require('./payment');
const configureRoutes = app => {
  paymentApi(app);
};


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
          const token = jwt.sign({ username }, config.get("secret"))
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
      const token = jwt.sign({ username }, config.get("secret"))

      res.json({
        token
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
router.get('/user/:user_id', (req, res, next) => {
  const sql = `
  SELECT  username, user_id, fname
  FROM users 
  WHERE user_id  = ?
  `

  conn.query(sql, [req.params.user_id], (err, results, fields) => {
    res.json(results[0])
  })
})

// get items
router.get('/item/:item_id', (req, res, next) => {
  const sql = `
  SELECT  items.*
  FROM items 
  WHERE item_id = ?
  `

  conn.query(sql, [req.params.item_id], (err, results, fields) => {
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
 // const sql = `
 // INSERT INTO donations (
 //   donor_id,
 //   requestor_id,
 //   item_id,
 //   amount,
 //   anon,
 //   payment_type
 // )
 // VALUES (?, ?, ?, ?, ?, ?)
 // `

 const sql = `
 INSERT INTO donations (
   donor_id,
   requestor_id,
   item_id,
   amount,
   payment_type
 )
 VALUES (?, ?, ?, ?, ?)
 `
conn.query(sql, [
  Number(req.body.donor_id),
  Number(req.body.requestor_id),
  Number(req.body.item_id),
  Number(req.body.amount),
  // Number(req.body.anon),
  req.body.payment_type
], (err, results, fields) => {

  console.log(err)
  res.json({
    donor_id: req.body.donor_id,
    requestor_id: req.body.requestor_id,
    item_id: req.body.item_id,
    amount: req.body.amount,
    // anon: req.body.anon,
    payment_type: req.body.payment_type
  })
})
})

// // post new item
// router.post('/item', (req, res, next) => {
//   const sql = `
//   INSERT INTO items (
//     requestor_id,  
//     name,
//     description,
//     category,
//     reason,
//     amount,
//     picture_url
//   )
//   VALUES (?, ?, ?, ?, ?, ?, ?)
//   `
//   conn.query(sql, [Number(req.body.requestor_id), req.body.name, req.body.description, req.body.category, req.body.reason, req.body.amount, req.body.pic_url], (err, results, fields) => {

//     console.log(err)
//     res.json({
//       requestor_id: req.body.requestor_id,
//       name: req.body.name,
//       description: req.body.description,
//       category: req.body.category,
//       reason: req.body.reason,
//       amount: req.body.amount,
//       pic_url: req.body.pic_url
//     })
//   })
// })

module.exports = router