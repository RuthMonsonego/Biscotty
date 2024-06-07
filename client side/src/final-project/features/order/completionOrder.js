import React, { useEffect, useState } from "react";
import "./completionOrder.scss"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../product/productsSlice";
import { fetchUserr, updateOneUser } from "../user/usersSlice";
import { addOneOrder, deleteCart } from "./ordersSlice"
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

export default function CompletionOrder() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const order = useSelector(s => s.order.newOrder);
    let dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [user, setUser] = useState(null);

    const handleChangePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    };

    const fetchAllProduct = async () => {
        dispatch(fetchAllProducts());
    };

    const fetchUser = async () => {
        const u = await dispatch(fetchUserr(order.userId));
        console.log(u);
        setUser(u.payload);
    };

    useEffect(() => {
        fetchAllProduct();
        fetchUser();
    }, []);

    const products = useSelector(s => s.product.arrProduct);
    const currentDate = new Date().toISOString().substring(0, 10);

    const onSubmit = async (data) => {
        let dateString = data.dueDate;
        let parts = dateString.split('-');
        let newDateString = parts[2] + '-' + parts[1] + '-' + parts[0];
        console.log(newDateString);
        console.log(data);
        data.dueDate = newDateString;
        data.orderDate = order.orderDate;
        data.userId = order.userId;
        data.cart = order.cart;
        data.street = data.street !== "" ? data.street : user.street;
        data.city = data.city !== "" ? data.city : user.city;
        data.houseNumber = data.houseNumber !== "" ? data.houseNumber : user.houseNumber;
        console.log(data);
        await dispatch(addOneOrder(data));
        await dispatch(deleteCart());
        if (user.city == undefined || user.city == "")
            user.city = data.city;
        if (user.street == undefined || user.street == "")
            user.street = data.street;
        if (user.houseNumber == undefined || user.houseNumber == "")
            user.houseNumber = data.houseNumber;
        debugger;
        await dispatch(updateOneUser(user));
        const ob = {
            "to_email": user.email,
            "to_name": user.name,
            "cakes": order.cart && order.cart.reduce((accumulator, c) => accumulator + c.num.toString() + " " + products.find((x) => x.id === c.id)?.name + "\n", ""),
            "date": newDateString,
            "addres": data.street + " " + data.houseNumber + "  " + data.city,
            "price": order.cart && order.cart.reduce((accumulator, c) => accumulator + products.find((x) => x.id === c.id)?.price * c.num, 0)
        }
        console.log(ob);
        emailjs.send("service_za2xx49", "template_8bvtduk", ob, "Nu4sadVOCbd50j0jl");
        alert("ההזמנה בוצעה בהצלחה!");
    }

    return (<div className="comOrder" dir="rtl">
        <div dir="rtl">
            <form dir="rtl" onSubmit={handleSubmit(onSubmit)} >
                <div dir="rtl" className="classs">
                    <fieldset dir="rtl" style={{ position: "relative" }}>
                        <legend>העוגות שהוזמנו</legend>
                        <div dir="rtl" className="con">
                            <div dir="rtl"><label dir="rtl" style={{ fontWeight: "bold" }}>העוגה</label></div>
                            <div dir="rtl"><label dir="rtl" style={{ fontWeight: "bold" }}>כמות</label></div>
                            <div dir="rtl"><label dir="rtl" style={{ fontWeight: "bold" }}>מחיר ליחידה</label></div>
                            <div dir="rtl"><label dir="rtl" style={{ fontWeight: "bold" }}>סה"כ</label></div>
                        </div>
                        {order.cart && order.cart.map((c) => (
                            <div dir="rtl" className="ccake" key={c.id}>
                                <hr class="separator"></hr>
                                <div className="con">
                                    <div className="names" dir="rtl">
                                        <label dir="rtl">{products.find((x) => x.id === c.id)?.name}</label>
                                    </div>
                                    <div className="nums" dir="rtl">
                                        <label dir="rtl">{c.num}</label>
                                    </div>
                                    <div className="price" dir="rtl">
                                        <label dir="rtl">₪{products.find((x) => x.id === c.id)?.price}</label>
                                    </div>
                                    <div className="sum" dir="rtl">
                                        <label dir="rtl">₪{products.find((x) => x.id === c.id)?.price * c.num}</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div dir="rtl" className="bottomm">
                            <div className="generalNum">
                                <label dir="rtl" style={{ fontWeight: "bold" }}>כמות המוצרים:
                                    {
                                        order.cart && order.cart.reduce((accumulator, c) => accumulator + c.num, 0)
                                    }
                                </label></div>
                            <div className="generalSum">
                                <label dir="rtl" style={{ fontWeight: "bold" }}>סכום לתשלום:
                                    ₪{
                                        order.cart && order.cart.reduce((accumulator, c) => accumulator + products.find((x) => x.id === c.id)?.price * c.num, 0)
                                    }
                                </label></div>
                        </div>
                    </fieldset>
                    <fieldset dir="rtl">
                        <legend>פרטי ההזמנה</legend>
                        <label htmlFor="date">תאריך להגעת ההזמנה:  </label>
                        <input
                            type="date"
                            id="dateInput"
                            name="dateInput"
                            defaultValue={currentDate}
                            {...register("dueDate", { required: "תאריך הוא שדה חובה" })}
                        />
                        {errors.dueDate && <span className="error">{errors.dueDate.message}</span>}

                        <label htmlFor="city">עיר:</label>
                        <input
                            className="in"
                            defaultValue={user?.city != undefined ? user.city : ''}
                            type="text"
                            id="city"
                            name="city"
                            {...register("city", {
                                required: "עיר היא שדה חובה",
                                maxLength: { value: 50, message: "שם העיר יכול להכיל עד 50 תווים" }
                            })}
                        />
                        {errors.city && <span className="error">{errors.city.message}</span>}

                        <label htmlFor="street">רחוב:</label>
                        <input
                            className="in"
                            defaultValue={user?.street != undefined ? user.street : ''}
                            type="text"
                            id="street"
                            name="street"
                            {...register("street", {
                                required: "רחוב הוא שדה חובה",
                                maxLength: { value: 50, message: "שם הרחוב יכול להכיל עד 50 תווים" }
                            })}
                        />
                        {errors.street && <span className="error">{errors.street.message}</span>}

                        <label htmlFor="house-number">מספר בית:</label>
                        <input
                            className="in"
                            defaultValue={user?.houseNumber != undefined ? user.houseNumber : ''}
                            type="number"
                            id="house-number"
                            name="house-number"
                            {...register("houseNumber", {
                                required: "מספר בית הוא שדה חובה",
                                min: { value: 1, message: "מספר בית חייב להיות גדול מ-0" }
                            })}
                        />
                        {errors.houseNumber && <span className="error">{errors.houseNumber.message}</span>}

                        <label htmlFor="letter">תרצה להוסיף מכתב או ברכה?</label>
                        <textarea
                            className="in"
                            id="letter"
                            name="letter"
                            {...register("letter")}
                        ></textarea>
                    </fieldset>
                    <fieldset dir="rtl">
                        <legend>פרטי תשלום</legend>
                        <label style={{ fontWeight: "bold" }}>איך תרצו לשלם?</label>
                        <div className="payment-options" dir="rtl">
                            <label dir="rtl" htmlFor="r1"><input
                                type="radio"
                                id="r1"
                                name="payment-method"
                                value="cash"
                                checked={paymentMethod === '                                cash'}
                                onChange={handleChangePaymentMethod}
                            />
                                מזומן במועד ההספקה</label>
                            <label dir="rtl" htmlFor="r2"><input
                                type="radio"
                                id="r2"
                                name="payment-method"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={handleChangePaymentMethod}
                            />
                                אשראי עכשיו</label>
                        </div>

                        {paymentMethod === 'credit' && (
                            <div className="credit-details" dir="rtl">
                                <label dir="rtl" htmlFor="credit-num">מספר כרטיס אשראי:</label>
                                <input
                                    dir="rtl"
                                    className="in move"
                                    type="text"
                                    id="credit-num"
                                    name="credit-num"
                                    {...register("creditNum", {
                                        required: "מספר כרטיס אשראי הוא שדה חובה",
                                        pattern: {
                                            value: /^[0-9]{16}$/,
                                            message: "מספר כרטיס אשראי לא תקין"
                                        }
                                    })}
                                />
                                {errors.creditNum && <span className="error">{errors.creditNum.message}</span>}

                                <label dir="rtl" htmlFor="credit-validity">תאריך תוקף:</label>
                                <input
                                    dir="rtl"
                                    className="in move"
                                    type="text"
                                    id="credit-validity"
                                    name="credit-validity"
                                    {...register("creditValidity", {
                                        required: "תאריך תוקף הוא שדה חובה",
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                                            message: "תאריך תוקף לא תקין, פורמט MM/YY"
                                        }
                                    })}
                                />
                                {errors.creditValidity && <span className="error">{errors.creditValidity.message}</span>}

                                <label dir="rtl" htmlFor="back-digits">קוד CVC:</label>
                                <input
                                    dir="rtl"
                                    className="in move"
                                    type="number"
                                    id="back-digits"
                                    name="back-digits"
                                    {...register("backDigits", {
                                        required: "קוד CVC הוא שדה חובה",
                                        pattern: {
                                            value: /^[0-9]{3,4}$/,
                                            message: "קוד CVC לא תקין"
                                        }
                                    })}
                                />
                                {errors.backDigits && <span className="error">{errors.backDigits.message}</span>}
                            </div>
                        )}
                        <h2>סה"כ לתשלום:  ₪{
                            order.cart && order.cart.reduce((accumulator, c) => accumulator + products.find((x) => x.id === c.id)?.price * c.num, 0)
                        }</h2>
                    </fieldset>
                </div>
                <div className="but">
                    <input type="submit" value={"ביצוע ההזמנה"} />
                </div>
            </form>
        </div>
    </div>)
}
