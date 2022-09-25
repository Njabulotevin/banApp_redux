import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useAppSelector, useAppDispatch } from './app/hooks'
import { deposit, withdraw } from './app/budgetSlice';

function App() {
  const [type, setType] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [isSelectAmount, setIsSelectAmount] = React.useState(true)

  const amountsRow1 = [{amount: "100"}, {amount: "200"}, {amount: "300"},]
  const amountsRow2 = [{amount: "150"}, {amount: "1000"}, {amount: "Other Amount"},]

  const types = ["deposit", "withdraw"];

   const balance = useAppSelector((state) => state.budgetReducer.currentBalance)
   const transaction = useAppSelector((state) => state.budgetReducer.accountHistory)
  const dispatch = useAppDispatch()

  const handleTransaction = (enteredAmount ? : number)=>{
    if(type === "deposit"){
      dispatch(deposit({amount: enteredAmount?enteredAmount:amount, type: type}));
      setIsSelectAmount(true)
      setType("")
      setAmount(0)
    }
    if (type === "withdraw"){
      if(amount > balance){
        alert("Insufficient Funds!!")
      }else{
        dispatch(withdraw({amount: enteredAmount?enteredAmount:amount, type: type}));
        setIsSelectAmount(true)
        setType("")
        setAmount(0)
      }
    }
  }

  const findTotals = (type : string)=>{
    let amount : number = 0;
    const filtered = transaction.filter((transaction)=>{
        return transaction.type === type;
    })

    filtered.map((transaction)=>{
      amount += transaction.amount
    });

    return {total: filtered.length, amount: amount}
  }
  return (
 
    <div className="App p-12">
      <h1 className='text-2xl font-semibold text-blue-700'>VEEN<span className='font-normal text-black'>Bank</span></h1>
      <p>Welcome back, John Doe</p>
      <p className='text-xs'>Account Number: 5784144723</p>
      <div className="bg-blue-700 flex gap-8 text-white p-8 max-w-[450px] mx-auto rounded-lg my-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z"/>
</svg>
        <div className="flex flex-col gap-2 items-start">
        <h1 className=''>Current Balance: </h1>
        <h2 className='text-4xl font-semibold'><span className='text-lg'>R </span>{balance.toFixed(2)}</h2>
        </div>
        </div>
        <div className="">
        {isSelectAmount && !type &&<div className="bg-slate-100 flex justify-center gap-4 max-w-[700px] mx-auto rounded-lg my-4 p-8">
           <div className="flex justify-between gap-2">
              {types.map((item, i)=>{
                return <div onClick={()=>{setType(item)}} className={`bg-blue-600 cursor-pointer text-white font-semibold p-6 rounded w-[250px]`} key={i} >{item.toUpperCase()}</div>
              })}
            </div>
            </div>}
        {isSelectAmount && type &&  <div className="bg-slate-100 flex justify-between gap-4 max-w-[700px] mx-auto rounded-lg my-4 p-8">
            <div className="flex flex-col gap-2">
              {amountsRow1.map((amoun, i)=>{
                return <div onClick={()=>{
                  // setAmount(parseFloat(amoun.amount))
                  handleTransaction(parseFloat(amoun.amount))
                }} className="bg-blue-600  cursor-pointer text-white p-6 rounded w-[250px]" key={i} >R{amoun.amount}</div>
              })}
            </div>
            <div className="flex flex-col gap-2">
              {amountsRow2.map((amoun, i)=>{
                return <div className="bg-blue-600 cursor-pointer text-white p-6 rounded w-[250px]" key={i} onClick={()=>{

                  if(amoun.amount==="Other Amount"){
                    setIsSelectAmount(false)
                  }
                  else{
                    // setAmount(parseFloat(amoun.amount))
                    handleTransaction(parseFloat(amoun.amount))
                  }
                }} >{amoun.amount !== "Other Amount"? "R": ""}{amoun.amount}</div>
              })}
            </div>

          </div>}
          {!isSelectAmount && <div className="bg-slate-100 flex flex-col gap-4 max-w-[450px] mx-auto rounded-lg my-4 p-8">
          {/* <select className='bg-slate-200 px-4 py-2' value={type} name="" id="" onChange={(e)=>{setType(e.target.value)}}>
              <option value="">Select Transaction</option>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </select> */}
           {type && 
           <div className="">
            <label htmlFor="">{type} Amount </label>
           <input className='bg-slate-200 px-2 py-2 text-2xl font-semibold focus:outline-none'  type="number"  onChange={(e)=>{setAmount(parseFloat(e.target.value))}}/>
           </div>}
          
           <button className='bg-blue-700 text-white px-4 py-2 rounded ' onClick={()=>{handleTransaction()}}>{type.toUpperCase()} Amount</button>
          </div>}
          <hr className='max-w-[450px] mx-auto'/>

          <div className="my-6 mx-auto max-w-[450px] flex flex-col gap-4">
            <h1 className='my-4'>Transaction History</h1>
            <div className="flex justify-between bg-slate-100 rounded p-8">
              <div className="text-green-600 font-semibold flex gap-4 pr-2">
                <p className="text-3xl">{findTotals("deposit").total}</p>
                <div className="text-left"><h2 className='text-xs'>Total Deposits: </h2>
                <p>+ R {findTotals("deposit").amount}</p></div>
                
              </div>
              <div className="text-red-600 font-semibold flex gap-4 border-l border-slate-300 pl-4">
              <p className="text-3xl">{findTotals("withdraw").total}</p>
                <div className="text-left"><h2 className='text-xs'>Total withdrawals: </h2>
                <p>- R {findTotals("withdraw").amount}</p></div>
              </div>
            </div>
            {transaction.map((transact)=>{
              return <div className={` shadow flex justify-between p-4 ${transact.type === "deposit"? "border-l-2 border-green-600": "border-l-2 border-red-600"}`} >
                  <span>{transact.type.toUpperCase()}</span>
                   <span className={`font-semibold ${transact.type === "deposit"? "text-green-600": " text-red-600"}`}> {transact.type === "deposit"? " + " : "-"} R{transact.amount}</span>
              </div>
            })}
          </div>
        </div>
    </div>

  );
}

export default App;
