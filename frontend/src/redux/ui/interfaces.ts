export type IUIState =  null | UI;

export interface UI {
  searchIsOpened: boolean,
  exploreIsOpened: boolean,
  reelsAreOpened: boolean,
  messagesAreOpened: boolean,
  notificationsAreOpened: boolean;
  createIsOpened: boolean;
  profileIsOpened: boolean
  moreIsOpened: boolean;
  homeIsOpened: boolean
  shrinkLeftMenu: boolean,
}

export interface IUIPayload {
  payload: {
    shrinkLeftMenu: boolean,
    showField: boolean,
  }
}