import {configureStore} from "@reduxjs/toolkit"
import budgetReducer from "./budgetSlice";


export const store = configureStore({
    reducer:{budgetReducer}
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch