// import io from "socket.io-client"
import store from "../store"
import axios from 'axios'

// const socket = io.connect("http://localhost:3001")
// console.log(socket)

// get user data
export function getUser(username) {
  axios.get('/api/user/' + username).then(resp => {
    store.dispatch({
      type: 'GET_USER',
      payload: resp.data
    })
  })
}

// get item list
export function getItems(requestor_id) {
  axios.get('/api/items/' + requestor_id).then(resp => {
    store.dispatch({
      type: 'GET_ITEM_LIST',
      payload: resp.data
    })
  })
}

// get single item
export function getItem(item_id) {
  axios.get('/api/item/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_ITEM',
      payload: resp.data
    })
  })
}

// submit a new item
export function sendItemData(item) {
  console.log(item)
  axios.post('/api/item', item)
}

// get donation list
export function getDonList(item_id) {
  axios.get('/api/donations/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_DONATION_LIST',
      payload: resp.data
    })
  })
}

// // submit a donation
// export function sendDonation(donation) {
//   console.log(donation)
//   axios.post('/api/donation', donation)
// }