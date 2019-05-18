import io from "socket.io-client"
import store from "../store"
import axios from 'axios'

// const socket = io.connect("http://localhost:3001")

// get user data
export function getUser(username) {
  axios.get('/api/user/' + username).then(resp => {
    store.dispatch({
      type: 'GET_USER',
      payload: resp.data
    })
  })
}

// get user donation
export function getDonation(item_id) {
  axios.get('/api/donation/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_DONATION',
      payload: resp.data
    })
  })
}

// get single item
export function getItem(item_id) {
  axios.get('/api/donation/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_ITEM',
      payload: resp.data
    })
  })
}
// get donation amount
export function getTotal(item_id) {
  // const id = this.props.match.params.item_id
  axios.get('/api/donation/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_DONATION_TOTAL',
      payload: resp.data
    })
  })
}

// submit a new item
export function sendItemData(item) {
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