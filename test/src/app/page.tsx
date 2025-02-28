function MyButton(){
  return(
    <button>I'm a button</button>
  ); 
}

export default function Page(){
  return(
    <div>
      <h1>My Page</h1>
      <MyButton />
    </div>
  );
}