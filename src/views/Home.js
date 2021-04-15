
import App from '../layouts/App'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

export default function Home() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");


    const submitHandler = async (e) => {

            await axios.post('/people/create', {
                name, age, city
            });
            history.push('/dashboard');
    }

    return (
        <App title="Screencast" className="container">
            <div className="container">
                <form onSubmit={submitHandler}>
                    
                        <label htmlFor="name">Name</label><br/>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name"/> <br/>

                        <label htmlFor="age">Age</label><br/>
                        <input type="number" value={age} onChange={(e) =>setAge(e.target.value)} name="age" id="age"/><br/>

                        <label htmlFor="city">City</label><br/>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city" id="city"/><br/><br/>
                    
                    <button type="submit" className="btn btn-primary">save</button>
                </form>
            </div>
        </App>
    )
}
