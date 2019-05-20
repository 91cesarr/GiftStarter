import store from "../store"
import axios from 'axios'

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
export function donation(amount, item_id) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/donation", { amount, item_id })
      .then(function (response) {
        // console.log(response.data);
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

// get donation amount
export function getTotal(item_id) {
  axios.get('/api/donation/' + item_id).then(resp => {
    store.dispatch({
      type: 'GET_DONATION_TOTAL',
      payload: resp.data
    })
    console.log("this>", resp.data)
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
//   console.log(donation)
//   axios.post('/api/donation', donation)
// }