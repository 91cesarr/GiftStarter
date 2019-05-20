const initialState = {
<<<<<<< HEAD
  user: {},
  item: {},
  donation: {},
  items: [],
  donations: [],
=======
  user: [],
  item: [],
  donation: [],
  donation_amount: [],
  user_id: [],
>>>>>>> master
  // name: '',
  // description: '',
  // category: '',
  // reason: '',
  // amount: '',
  // pic_url: '',
  // time: '',
  // count: 5
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_ITEM":
      return { ...state, item: action.payload }
    case "GET_USER":
      return { ...state, user: action.payload }
<<<<<<< HEAD
    // case "GET_DONATION":
    //   return { ...state, donation: action.payload }
    case "GET_ITEM_LIST":
      return { ...state, items: action.payload }
    case "GET_DONATION_LIST":
      return { ...state, donations: [action.payload] }
=======
    case "GET_DONATION":
      return { ...state, donation: action.payload}
    case "GET_DONATION_TOTAL":
      return { ...state, donation_amount: action.payload }
    // case "ADD_MESSAGE":
    //   return { ...state, messages: [...state.messages, action.payload] }
>>>>>>> master
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