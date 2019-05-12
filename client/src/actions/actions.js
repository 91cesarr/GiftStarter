import io from "socket.io-client"
import store from "../store"

const socket = io.connect("http://localhost:3001")
console.log(socket)

export function send(text) {
  socket.emit("new message", text)
}

export function createUsername(username) {
  store.dispatch({
    type: 'SET_USERNAME',
    payload: username
  })
}

export function setCurrentlyTyping(currentlyTyping) {
  socket.emit("currentlyTyping", currentlyTyping)
}
export function setOnlineUser(onlineUser) {
  socket.emit("onlineUser", onlineUser)
}

socket.on("new message", text => {
  const username = store.getState().username
  store.dispatch({
    type: "ADD_MESSAGE",
    payload: {
      text: text,
      username: username
    }
  })
})

socket.on("currentlyTyping", currentlyTyping => {
  store.dispatch({
    type: 'TOGGLE_TYPING',
    payload: currentlyTyping
  })
})

socket.on("onlineUser", onlineUser => {
  store.dispatch({
    type: 'ONLINE_USER',
    payload: onlineUser
  })
})