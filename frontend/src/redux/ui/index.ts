import { createSlice } from "@reduxjs/toolkit";
import { UI, IUIPayload } from "./interfaces";

const initialState: UI = {
  exploreIsOpened: false,
  createIsOpened: false,
  homeIsOpened: true,
  moreIsOpened: false,
  notificationsAreOpened: false,
  profileIsOpened: false,
  reelsAreOpened: false,
  searchIsOpened: false,
  messagesAreOpened: false,
  shrinkLeftMenu: false,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHomeIsOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.homeIsOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setSearchIsOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.searchIsOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setExploreIsOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.exploreIsOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setReelsAreOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.reelsAreOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setMessagesAreOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.messagesAreOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setNotificationsAreOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.notificationsAreOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setCreateIsOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.createIsOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setProfileIsOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.profileIsOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setMoreIsOpened: (state, action: IUIPayload) => {
      const { showField, shrinkLeftMenu } = action.payload;
      state.moreIsOpened = showField;
      state.shrinkLeftMenu = shrinkLeftMenu;
    },
    setCloseAll: (state) => {
      for (const key in state) {
        console.log(key);
      }
    },
  },
});

export default UISlice.reducer;
export const {
  setCreateIsOpened,
  setExploreIsOpened,
  setHomeIsOpened,
  setMessagesAreOpened,
  setMoreIsOpened,
  setNotificationsAreOpened,
  setProfileIsOpened,
  setReelsAreOpened,
  setSearchIsOpened,
  setCloseAll,
} = UISlice.actions;
