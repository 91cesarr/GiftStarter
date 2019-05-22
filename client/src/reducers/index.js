const initialState = {
  user: {},
  item: {},
  donation: {},
  donation_amount: {},
  user_id: {},
  item_id: {},
  items: [],
  donations: [],
  donation_amount: {},
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
    case "GET_ITEM_DATA":
      return { ...state, item: action.payload }
    case "GET_USER":
      return { ...state, user: action.payload }
    case "GET_ITEM_LIST":
      return { ...state, items: action.payload }
    case "GET_DONATION_LIST":
      return { ...state, donations: action.payload }
    case "GET_DONATION":
      return { ...state, donation: action.payload }
    case "GET_DONATION_TOTAL":
      return { ...state, donation_amount: action.payload }
    case "GET_NEW_ITEM":
      return { ...state, item_id: action.payload }
    default:
      return state
  }
}