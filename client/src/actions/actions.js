import io from "socket.io-client"
import store from "../store"
import axios from 'axios'

const socket = io.connect("http://localhost:3001")
console.log(socket)

// get user data
export function getUser(user_id) {
  axios.get('/api/user/' + user_id).then(resp => {
    store.dispatch({
      type: 'GET_USER',
      payload: resp.data
    })
  })
}

// // get single item
// export function getItem(item_id) {
//   axios.get('/api/item/' + item_id).then(resp => {
//     store.dispatch({
//       type: 'GET_ITEM',
//       payload: resp.data
//     })
//   })
// }

// submit a new item
export function sendItemData(item) {
  console.log(item)
  axios.post('/api/item', item)
}


// export function send(text) {
//   socket.emit("new message", text)
// }

// export function createUsername(username) {
//   store.dispatch({
//     type: 'SET_USERNAME',
//     payload: username
//   })
// }

// export function setCurrentlyTyping(currentlyTyping) {
//   socket.emit("currentlyTyping", currentlyTyping)
// }
// export function setOnlineUser(onlineUser) {
//   socket.emit("onlineUser", onlineUser)
// }

// socket.on("new message", text => {
//   const username = store.getState().username
//   store.dispatch({
//     type: "ADD_MESSAGE",
//     payload: {
//       text: text,
//       username: username
//     }
//   })
// })

// socket.on("currentlyTyping", currentlyTyping => {
//   store.dispatch({
//     type: 'TOGGLE_TYPING',
//     payload: currentlyTyping
//   })
// })

// socket.on("onlineUser", onlineUser => {
//   store.dispatch({
//     type: 'ONLINE_USER',
//     payload: onlineUser
//   })
// })