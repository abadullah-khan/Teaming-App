import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "../data/data.json";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return data;
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    pageSize: 20,
    currentPage: 1,
    totalPages: null,
    search: "",
    domain: "",
    gender: "",
    availability: "",
    players: [],
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAvailability: (state, action) => {
      state.availability = action.payload;
    },
    addToTeam: (state, action) => {
      const clickedItem = state.items.find(
        (item) => item.id === action.payload
      );
      const isUnique = !state.players.some(
        (player) => player.domain === clickedItem.domain
      );
      if (isUnique && clickedItem.available) {
        state.players.push(clickedItem);
      }
    },
    removeFromTeam: (state, action) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.pageSize);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = " failed";
        state.error = action.error.message;
      });
  },
});
export const {
  setCurrentPage,
  setSearch,
  setDomain,
  setGender,
  setAvailability,
  addToTeam,
  removeFromTeam,
} = dataSlice.actions;
export default dataSlice.reducer;
