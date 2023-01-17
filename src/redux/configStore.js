import {applyMiddleware,combineReducers,createStore} from "redux";
import reduxThunk from "redux-thunk"
import { FilmReducer } from "./Reducer/FilmReducer";
import { GioHangReducer } from "./Reducer/GioHangReducer";
import { UserReducer } from "./Reducer/UserReducer";


const rootReducer = combineReducers(
    {
        FilmReducer,
        UserReducer,
        GioHangReducer,
    }
);

export const store = createStore(
    rootReducer,applyMiddleware(reduxThunk)
);