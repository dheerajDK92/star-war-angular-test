import { Subject } from "rxjs";
import { ActionTypes } from "./action";

interface InitialState {
  peopleList: Array<Object>;
  loginUser: Array<Object>;
  loader: Boolean;
}

let state: InitialState = {
  peopleList: [],
  loginUser: [],
  loader: false,
};

interface Event {
  type: String;
  payload?: Object;
}

export const store = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();

eventDispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionTypes.LOADING:
      state = {
        loginUser: [...state.loginUser],
        peopleList: [...state.peopleList],
        loader: Boolean(data.payload),
      };
      store.next(state);
      break;
    case ActionTypes.LOGIN:
      state = {
        loginUser: [data.payload],
        peopleList: [...state.peopleList],
        loader: false,
      };
      store.next(state);
      break;
    case ActionTypes.GET_PEOPLE:
      state = {
        loginUser: [...state.loginUser],
        peopleList: [data.payload],
        loader: false,
      };
      store.next(state);
      break;
    default:
      state = {
        loginUser: [...state.loginUser],
        peopleList: [...state.peopleList],
        loader: false,
      };
      store.next(state);
      break;
  }
});
