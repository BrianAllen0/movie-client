import { useState } from "react";
export const LoginView = ({onLoggedIn, onClickRegister}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            access: username,
            secret: password
        };
        fetch(`https://ba-movie-api.herokuapp.com/user/login?Username=${data.access}&Password=${data.secret}`,
        {method: "POST", headers: {"Content-Type": "application/json"}}).then((response)=>response.json()).then((data)=>{
            console.log(data);
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user!");
            }
        }).catch((e)=>{
            alert("Something went wrong!");
        });
    };
    const changeToRegister = () =>{
        onClickRegister();
    };
    return(
        <div>
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
            <br/>
            <button onClick={changeToRegister}>Register Instead</button>
        </div>
    );
}