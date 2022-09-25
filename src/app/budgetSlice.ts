import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface transactionInterface {
    type: string,
    amount: number
}

interface balanceInterface {
    currentBalance: number,
    accountHistory: transactionInterface[]
}


const initialState : balanceInterface  = {
    currentBalance: 0,
    accountHistory : []
}



const budgetSlice = createSlice({
    name: "budget",
    initialState: initialState,
    reducers: {
        deposit: (state, action: PayloadAction<transactionInterface>) : void => {
            state.currentBalance += action.payload.amount;
            state.accountHistory.push(action.payload);
        },
        withdraw: (state, action: PayloadAction<transactionInterface>) : void=> {
            if(action.payload.amount >state.currentBalance ){
                state.currentBalance -= 0;
            }else{
                state.currentBalance -= action.payload.amount;
            }
            state.accountHistory.push(action.payload);
        },
    }

})

export const { deposit, withdraw } = budgetSlice.actions;
export default budgetSlice.reducer