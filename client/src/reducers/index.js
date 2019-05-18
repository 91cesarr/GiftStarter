const initialState = {
  user: {},
  item: {},
  donation: {},
  items: [],
  donations: [],
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
    // case "GET_DONATION":
    //   return { ...state, donation: action.payload }
    case "GET_ITEM_LIST":
      return { ...state, items: action.payload }
    case "GET_DONATION_LIST":
      return { ...state, donations: [action.payload] }
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