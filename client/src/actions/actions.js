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

  })
}

// submit a new item
export function sendItemData(item) {
  axios.post('/api/item', item)
}