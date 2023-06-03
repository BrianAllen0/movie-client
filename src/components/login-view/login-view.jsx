import { useState } from "react";
export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            access: username,
            secret: password
        };
        fetch(`https://ba-movie-api.herokuapp.com/user/login?Username=${data.username}&Password=${data.password}`, 
        {method: "POST", headers: {"Content-Type": "application/json"}}).then((response)=>{response.json()}).then((data)=>{
            
        })
    };
    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input 
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                />
            </label>
            <br/>
            <label>
                Password: <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </label>
            <br/>
            <button type="submit">Submit</button>
        </form>
    );
}