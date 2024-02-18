import { createReducer, on } from "@ngrx/store";
import { loadCommerces } from "../actions/commerce.action";
import { Commerce } from "../../services/fetch.interface";

export interface CommercesState {
    commerces: Commerce[];
}

export const initialState: CommercesState = {
    commerces: []
}

export const CommercesReducer = createReducer (
    initialState,
    on(loadCommerces, (state, { commerces }) => ({...state, commerces}))
)