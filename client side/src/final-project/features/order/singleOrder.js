import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CakeIcon from '@mui/icons-material/Cake';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../product/productsSlice";
import { fetchUserr } from "../user/usersSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './singleOrder.scss'
import { deleteOneOrder } from "./ordersSlice";

const SingleOrder = ({ o }) => {

    let dispatch = useDispatch();
    const [user, setUser] = useState(null);

    const fetchAllProduct = async () => {
        dispatch(fetchAllProducts());
    };

    const fetchUser = async () => {
        const u = await dispatch(fetchUserr(o.userId));
        console.log(u);
        setUser(u.payload);
    };

    useEffect(() => {
        fetchAllProduct();
        fetchUser();
    }, []);

    const products = useSelector(s => s.product.arrProduct);
    const [day, month, year] = o.dueDate.split('-');
    const dateObject = new Date(year, month - 1, day);
    const currentDate = new Date();
    const status = dateObject < currentDate;

    const orderDelete = () => {
        const userChoice = window.confirm("האם אתה בטוח שאתה רוצה למחוק את ההזמנה?");
        if (userChoice) {
            dispatch(deleteOneOrder(o.id));
        } else {
            console.log("Deletion canceled");
        }
    }

    return (
        <div className="so">
            <div className="container" style={{ color: status ? 'grey' : 'black' }}>
                <div>
                    <div className="con">
                        <div><PersonIcon /></div>
                        <div className="l">{user?.name}</div>
                    </div>
                    <div className="con">
                        <div><AlternateEmailIcon /></div>
                        <div className="l">{user?.email}</div>
                    </div>
                    <div className="con">
                        <div><CalendarMonthIcon /></div>
                        <div className="l">{o.dueDate}</div>
                    </div>
                </div>

                <div>
                    <div>
                        {
                            o.cart && o.cart.map((c) => (
                                <div className="con" key={c.id}>
                                    <div className="cake"><CakeIcon /></div>
                                    <div className="nums">
                                        {c.num}
                                    </div>
                                    <div className="names">
                                        {products.find((x) => x.id === c.id)?.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className="con">
                        <div><TwoWheelerIcon /></div>
                        <div className="l">{o.street} {o.houseNumber}</div>
                    </div>
                    <div className="con">{o.city}</div>
                    <div className="con nums">
                        ₪{
                            o.cart && o.cart.reduce((accumulator, c) => accumulator + products.find((x) => x.id === c.id)?.price * c.num, 0)
                        }
                    </div>
                </div>
                <div className="delete">
                    <div>לבטל את ההזמנה?</div>
                    <IconButton onClick={orderDelete} disabled={status} className="d"><DeleteIcon /></IconButton>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder;