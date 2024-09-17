import React, { useEffect, useState } from 'react';
import reactDom from "react-dom";
import close from "../../img/close.png";

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const [shoreslist, setshoreslist] = useState([]);
    const [todos, setTodos] = useState([])
    

    function datos () {
       
        fetch('https://playground.4geeks.com/todo/users?offset=1&limit=100',{
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => {
              console.log(resp.ok); // Will be true if the response is successful
              console.log(resp.status); // The status code=200 or code=400 etc.
              console.log(resp.text()); // Will try to return the exact result as a string
              return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
          })
          .then(data => {
              // Here is where your code should start after the fetch finishes
              console.log(todos); // This will print on the console the exact object received from the server
          })
          .catch(error => {
              // Error handling
              console.error(error);
          });
      
    }
    
   
    function showValue(e) {
        if (inputValue === "") alert("The input cannot be empty");
        setInputValue(e.target.value);
        console.log(inputValue);
        console.log(shoreslist);
    }

    function addChores(e) {
        e.preventDefault();
        console.log("El dato que quieres agregar es", inputValue);
        //setshoreslist((shoreslist) => [...shoreslist, inputValue]);
        fetch('https://playground.4geeks.com/todo/todos/barbara',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: inputValue
                })
            })
            .then((response) => {
                getAllShores()
            })

        setInputValue("");
    }

    function borrar(index) {
        console.log (index)
        fetch('https://playground.4geeks.com/todo/todos/'+ index,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            getAllShores()
        })
    }

    function getAllShores(){
        console.log('getCharacters')
        fetch('https://playground.4geeks.com/todo/users/barbara')
            .then((response) => {
                return response.json()
            })
            .then((data)=> {
                console.log(data.todos);
                setshoreslist (data.todos)
            })
        console.log ('se cargo dato')
    }

    useEffect(()=> {
        getAllShores()
    },[]) 


    return (

        <>
        
        <div className="container col-6 mb-5" >
            <div className=" border p-3  bg-body rounded">
                <h1>todos</h1>
                <form onSubmit={addChores}>
                    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} type="text" className="form-control" id="name" placeholder="Ingresa tu nombre"/>
                </form>
                {shoreslist.map((item) => (
                    <ul key={item.id}>
                        <li>
                            {item.label}
                            <img onClick={()=> borrar(item.id)}  className="closeButton" src={close} alt="close"/>
                        </li>
                    </ul>
                ))}
                <div>{shoreslist.length} tasks</div>
            </div>
            <div className="box-decoration">
                <span className="mx-1 rounded"></span>
                <span className="mx-2 rounded"></span>
                <span className="mx-3 rounded"></span>
            </div>
        </div>
        </>
    );
};

export default Form;