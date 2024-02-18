import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, exhaustMap } from "rxjs";
import { FetchService } from "../../services/fetch.service";
import * as CommerceActions from "../actions/commerce.action";
import { Commerce } from "../../services/fetch.interface";

@Injectable()
export class CommerceEffects {
    constructor(private actions$: Actions, private commerceService: FetchService){}

    loadCommerces$ = createEffect(() => 
    this.actions$.pipe(
        ofType(CommerceActions.loadCommerces),
        exhaustMap(() => 
            this.commerceService
                .getCommerces(100)
                .pipe(map((commerces: Commerce[]) => CommerceActions.loadCommerces({ commerces })))
        )
    )
    );
}