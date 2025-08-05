import React,{useState} from 'react'

function Initialisaiton(){
  console.log("running initialisation");
  return 1;
}
function UseState() {
  // 1. const [count, setCount] = useState(0);
  // 2. const [count, setCount] = useState(Initialisaiton());   //this show whenver the setCount run the initialisation run again and again

  //better way to do when initialisation occur only 1 time {function version of initalisation}
  // 3. 
  const [count,setCount]=useState(()=>{
    console.log("running only 1 time")
    return 1;
  })

  const [state,setState]=useState(()=>{return {count:0,theme:"blue"}})
  const objCount = state.count;
  const objTheme = state.theme;
  function handleIncrement() {
    // setState(prev =>{ return {count: prev.count + 1}});  //it will make theme as null it override the theme
    // setState(prev=> {return {...prev, count: prev.count+1}})   //this won't override because we are using spread operator to make it same
    setState(prev=> {return {...prev, count: prev.count+1, theme:"blue"}})
  }
  function handleDecrement() {
    // setState(prev =>{ return {count: prev.count + 1}});
    setState(prev=> {return {...prev, count: prev.count-1, theme: "red"}})
  }

  // function handleIncrement() {
  //   // setCount(count+1);     //wrong way to do 
  //   setCount(prev => (prev + 1));
  // }
  // function handleDecrement() {
  //   setCount(prev => (prev - 1));
  //   setCount(prev => (prev - 1));

  //   //this won't work 
  //   //setCont(count-1)
  //   //setCount(count-1)
  // }
  return (
      <div>
        <button onClick={handleDecrement}>-</button>
        {objCount} , {objTheme}
        <button onClick={handleIncrement}>+</button>
      </div>
  );
}
export default UseState;