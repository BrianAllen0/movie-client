import { useState } from "react";
export const RegisterView = ({onClickLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }
        fetch("https://ba-movie-api.herokuapp.com/user/register",{
        Method: "POST", 
        body: JSON.stringify(data), 
        headers: {"Content-Type": "application/json"}}).then((response)=>{
            if(response.ok) {
                alert("Registered successfully!");
                window.location.reload();
            } else {
                alert("Registration failed!");
            }
        });
    };
    const changeToLogin = () =>{
        onClickLogin();
    }

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
            <label>
                Email: <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
            </label>
            <br/>
            <label>
                Birthday: <input
                type="date"
                value={birthday}
                onChange={(e)=>setBirthday(e.target.value)}
                required
                />
            </label>
            <br/>
            <button type="submit">Submit</button>
            <br/>
            <button onClick={changeToLogin}>Login Instead</button>
        </form>
    );
}