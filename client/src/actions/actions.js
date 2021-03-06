import store from "../store"
import axios from 'axios'
// import io from "socket.io-client"

// let socket = null
// export function connect(user) {
//   // Socket io changes remote login
//   socket = io.connect("http://localhost:3001")
// }

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

// get user donation
export function getDonation(item_id) {
  axios.get('/api/donation/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_DONATION',
      payload: resp.data
    })
  })
}

// Donation function
export function donation(donor_name, amount, item_id, requestor_id) {

  // if (donor_name === '') {
  //   donor_name = "Anonymous"
  // } else {
  //   donor_name
  // }

  return new Promise((resolve, reject) => {
    axios
      .post("/api/donation", { donor_name, amount, item_id, requestor_id })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
  })
}

export function donate(e) {
  e.preventDefault()
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

export function getItemData(item_id) {
  axios.get('/api/dashboard/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_ITEM_DATA',
      payload: resp.data
    })
  })
}

// get donation amount
export function getTotal(item_id) {
  axios.get('/api/donation/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_DONATION_TOTAL',
      payload: resp.data
    })
  })
}

// submit a new item
export function sendItemData(item) {
  return axios.post('/api/item', item)
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
//   axios.post('/api/donation', donation)
// }

// get newest item	
export function getNewItem(user_id) {
  axios.get('/api/item/' + user_id).then(resp => {
    store.dispatch({
      type: 'GET_NEW_ITEM',
      payload: resp.data
    })
  })
} 

// get chart data
export function getChartData(item_id) {
  axios.get('/api/donations/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_CHART_DATA',
      payload: resp.data
    })
  })
}
