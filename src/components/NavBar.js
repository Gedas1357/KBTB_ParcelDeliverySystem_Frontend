import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const parcelNav = () => {
        navigate('/homepage');
    };
    const editNav = () => {
        navigate('/edit-info');
    };
    const logOut = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="flex flex-row w-screen h-14 justify-evenly items-center border-2 border-black">
            <button className='basis-2/12 h-5/6' onClick={parcelNav}>Parcels</button>
            <button className='basis-2/12 h-5/6' onClick={editNav}>Edit profile</button>
            <button className='basis-2/12 h-5/6' onClick={logOut}>Log Out</button>
        </div>
    )
}

export default NavBar;