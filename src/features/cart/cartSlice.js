import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-projec";

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
};

// 1st parameter is name of the action
// can call getCartItems() in a useEffect to grab the api data - see App.js
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  // name is passed from the cartItems dispatch in App.js
  // example: you could use this to pass in a user id
  // if the async thunk requested data for a specific user
  async (name, thunkAPI) => {
    try {
      // So cool: you can access the state of the entire app with
      // thunkAPI.getState()
      // Amazing: you can dispatch actions from within an async thunk
      // open modal from cartSlice.js
      //   thunkAPI.dispatch(openModal());
      const response = await axios.get(url);

      return response.data;
    } catch (err) {
      // this error is caught in the extraReducers
      // in .rejected's action.payload
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // reducers are synchronous
  // extraReducers are asynchronous
  // extraReducers are called when the async thunk is dispatched
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItems = state.cartItems.find((item) => item.id === payload);
      cartItems.amount -= 1;
    },
    getTotals: (state, { payload }) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      //   console.log("action.payload: ", action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log("error action", action);
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
