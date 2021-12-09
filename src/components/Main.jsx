// * onChange works when the element that has onChange is clicked
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Main.css'

function Main() {
    const { user, isAuthenticated } = useAuth0();
    const [item, setItem ] = useState({
        _id:'',
        user: isAuthenticated ? user.name : "guest",
        todo:'',
        date: new Date().getTime(),
    });

    const [todo, setTodo] = useState([{
        _id:'',
        user: isAuthenticated ? user.name : "guest",
        todo:'',
        date:'',
    }])

    // ! for debugging
    // console.dir(user, null, 2);

    function handleChange(event) {
        const { name, value } = event.target;
        setItem((prevInput) => {
            return{
                ...prevInput,
                [name]: value,
            }
        });
        // ! for debugging
        // console.log(item);
    }

    useEffect(() => {
        fetch('api/items')
            .then((res) => {if(res.ok) return res.json()})
            .then((jsonRes) => {setTodo(jsonRes)})
            .catch((error) => {console.log(error)});
    },[]);

    function rerender() {
        fetch('api/items')
            .then((res) => {if(res.ok) return res.json()})
            .then((jsonRes) => {setTodo(jsonRes)})
            .catch((error) => {console.log(error)});
    }

    async function findOne() {
        const userName = {
            params:{
            user: isAuthenticated ? user.name : "guest",
        }};
        // ! for debugging
        // console.log('userName: ' + userName.params.user);
        await axios.get('api/user-items', userName)
        // .then((res) => {setTodo(res)})
        .then((res) => {setTodo(res.data)})
        .catch((error) => {console.log(error)});
    }

    findOne();

    async function addItem(event) {
        // ! for debugging
        // console.log("DQN" + user.name);
        const newItem = {
            user: isAuthenticated ? user.name : "guest",
            todo: item.todo,
        };
        try {
            axios.post('api/new-item', newItem);
        } catch(error) {
            console.log("Error");
        }
        alert('Added an item successfully')
        setItem({
            todo: '',
        })
        // ! for debugging
        console.dir(item, null, 2);
    }

    async function deleteItem(id) {
        await axios.delete('api/delete/'+id);
        rerender();
    }

    async function updateItem(id) {
        const x = await prompt("EEeeee","");
        const updateItem = {
            todo: x
        }
        await axios.put('api/update/'+id,updateItem);
        rerender();
    }


    return (
        <>
            <div className="container">
                <div className="contents-left">
                    <div className="contents-fixed">
                        <input
                            className=""
                            onChange={ handleChange }
                            name="todo"
                            type="text"
                            value={item.todo}
                            placeholder="type your schedule"
                        />
                        <div className='center'>
                        <button
                        onClick={ addItem }
                        className="add-btn">ADD</button>
                        </div>
                    </div>
                </div>
                <div className="contents-right">
                    <div>
                    <h1 className="text-center">Todo</h1>
                    {todo.map((Item) => {
                        return(
                        <div className="todo" key={Item._id}>
                            <p>todo: {Item.user}</p>
                            <p>todo: {Item._id}</p>
                            <p>todo: {Item.todo}</p>
                            <p>date: {Item.date}</p>
                            <button onClick={ () => deleteItem(Item._id) }>DELETE</button>
                            <button onClick={ () => updateItem(Item._id) }>UPDATE</button>
                        </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main