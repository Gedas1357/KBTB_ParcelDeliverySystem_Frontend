import {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import "../App.css"

const LoginPage = () => {

    return (
        <div className="flex flex-col w-screen h-screen justify-center">
            <div className="flex flex-col justify-evenly self-center basis-2/5 w-1/6 border-2 border-black">
                <label>Username</label>
                <input
                    type="text"
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    required
                />
                <Link to="/homepage" className="self-center w-10/12">
                    <button id="loginButton">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage;