import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
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
    const customerNav = () => {
        navigate('/customers');
    };

    return (
        <div className="flex flex-row w-screen h-14 justify-evenly items-center border-2 border-black">
            <button className='basis-2/12 h-5/6' onClick={parcelNav}>Parcels</button>
            <button className='basis-2/12 h-5/6' onClick={editNav}>Edit profile</button>
            {username == 'admin' && <button className='basis-2/12 h-5/6' onClick={customerNav}>Customers</button>}
            <button className='basis-2/12 h-5/6' onClick={logOut}>Log Out</button>
        </div>
    )
}

export default NavBar;