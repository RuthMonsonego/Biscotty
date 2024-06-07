import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOneUser, login } from './usersSlice';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import logo from '../../app/images/ביסקוטי.png';
import './logIn.scss';
import { startNewOrder } from '../order/ordersSlice';
import emailjs from '@emailjs/browser';

export default function LogIn() {

    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ClickEnrollment = async (event) => {
        event.preventDefault();
        debugger;
        let user = { name: name, password: password, email: email };
        await dispatch(addOneUser(user));
        const res = await dispatch(login(user));
        if (res.payload == undefined)
            setStatus(1);
        else {
            const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()).replace(/\//g, '-');
            let order = {
                "cart": [],
                "orderDate": formattedDate,
                "userId": res.payload.id
            }
            dispatch(startNewOrder(order));
            navigate('/navbaruser');
        }
        const ob = {
            name: name,
            reply_email: "rut65756@gmail.com",
            to_email: email
        }
        console.log(ob);
        emailjs.send("service_za2xx49", "template_8soef3f", ob ,"Nu4sadVOCbd50j0jl");   
    };


    const ClickConnection = async (event) => {
        event.preventDefault();
        debugger;
        let user = { name: name, password: password };
        const res = await dispatch(login(user));
        if (res.payload == undefined)
            setStatus(1);
        else if (res.payload.id == 0) {
            const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()).replace(/\//g, '-');
            let order = {
                "cart": [],
                "orderDate": formattedDate,
                "userId": res.payload.id
            }
            dispatch(startNewOrder(order));
            navigate('/navbarmanager');
        }
        else {
            const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()).replace(/\//g, '-');
            let order = {
                "cart": [],
                "orderDate": formattedDate,
                "userId": res.payload.id
            }
            dispatch(startNewOrder(order));
            navigate('/navbaruser');
        }
    };

    return (<>
        <div className="login">
            <img src={logo} alt="Logo" className="logo" />
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1 style={{ color: "#eea6d2", textShadow: "1px 1px 0 black" }}>הרשמה למועדון</h1>
                        <div className="social-container">
                            <IconButton aria-label="facebook"><FacebookIcon /></IconButton>
                            <IconButton aria-label="instagram"><InstagramIcon /></IconButton>
                            <IconButton aria-label="twitter"><TwitterIcon /></IconButton>
                        </div>
                        <span>or use your email for registration</span>
                        <input required type="text" placeholder="User Name" onChange={(e) => setname(e.target.value)} inputMode="decimal" required />
                        <input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <button className="button" onClick={ClickEnrollment}>הרשמה</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1 style={{ color: "#eea6d2", textShadow: "1px 1px 0 black" }}>התחברות למערכת</h1>
                        <div className="social-container">
                            <IconButton aria-label="facebook"><FacebookIcon /></IconButton>
                            <IconButton aria-label="instagram"><InstagramIcon /></IconButton>
                            <IconButton aria-label="twitter"><TwitterIcon /></IconButton>
                        </div>
                        <span>or use your account</span>
                        <input required type="text" placeholder="User Name" onChange={(e) => setname(e.target.value)} inputMode="decimal" required />
                        <input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <a href="#">שכחת את הסיסמה?</a>
                        <button className="button" onClick={ClickConnection}>התחברות</button>
                        {status == 1 && <p style={{ color: "red" }}>שם המשתמש ו/או הסיסמה אינם תקינים, אנא ודאו כי הנכם רשומים לאתר או נסו להזין את פרטיכם שנית</p>}
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>?כבר יש לך חשבון</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost button" id="signIn" onClick={() => { document.getElementById('container').classList.remove("right-panel-active"); }}>התחברות</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>?אין לך חשבון</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost button" id="signUp" onClick={() => { document.getElementById('container').classList.add("right-panel-active"); }}>הרשמה</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}