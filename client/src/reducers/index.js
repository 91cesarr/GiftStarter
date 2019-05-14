const initialState = {
  item: {},
  // description: '',
  // category: '',
  // reason: '',
  // amount: '',
  // pic_url: '',
  // time: '',
  // messages: [],
  // username: "",
  // currentlyTyping: false,
  // onlineUser: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_ITEM":
      return { ...state, item: action.payload }
    // case "ADD_MESSAGE":
    //   return { ...state, messages: [...state.messages, action.payload] }
    // case "SET_USERNAME":
    //   return { ...state, username: action.payload }
    // case "TOGGLE_TYPING":
    //   return { ...state, currentlyTyping: action.payload }
    // case "ONLINE_USER":
    //   return { ...state, onlineUser: action.payload }
    default:
      return state
  }
}