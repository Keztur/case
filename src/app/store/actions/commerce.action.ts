import { createAction, props } from "@ngrx/store";
import { Commerce } from "../../services/fetch.interface";

export const loadCommerces = createAction (
    '[Commerces] Load Commerces',
    props<{ commerces: Commerce[]}>()
)