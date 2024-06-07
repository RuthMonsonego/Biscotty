// import React from "react";
// import "./addUser.scss";
// import { useForm } from 'react-hook-form';
// import { useDispatch } from "react-redux";
// import { addOneUser } from "./usersSlice";

// export default function AddUser() {

//     const { register, handleSubmit } = useForm();
//     const dispatch = useDispatch()

//     const onSubmit = (data) => {
//         debugger;
//         dispatch(addOneUser(data));
//         alert("הלקוח נוסף בהצחה!");
//         document.querySelectorAll('.in').forEach((element) => { element.value = '' });

//     }

//     return (
//         <div className="au">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <fieldset>
//                     <legend>מידע אישי</legend>
//                     <label htmlFor="name">שם:</label>
//                     <input className="in" type="text" id="name" name="name" {...register("name")}/>
//                     <label htmlFor="password">סיסמה:</label>
//                     <input className="in" type="password" id="password" name="password" {...register("password")}/>
//                     <label htmlFor="email">אימייל:</label>
//                     <input className="in" type="email" id="email" name="email" {...register("email")}/>
//                 </fieldset>
//                 <fieldset>
//                     <legend>פרטי כתובת</legend>
//                     <label htmlFor="city">עיר:</label>
//                     <input className="in" type="text" id="city" name="city" {...register("city")}/>
//                     <label htmlFor="street">רחוב:</label>
//                     <input className="in" type="text" id="street" name="street" {...register("street")}/>
//                     <label htmlFor="house-number">מספר בית:</label>
//                     <input className="in" type="number" id="house-number" name="house-number" {...register("houseNumber")}/>
//                 </fieldset>
//                 <div>
//                     <input type="submit" value="הוסף משתמש" />
//                 </div>
//             </form>
//         </div>
//     )
// }
import React from "react";
import "./addUser.scss";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addOneUser } from "./usersSlice";

export default function AddUser() {

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('שם הוא שדה חובה')
            .min(2, 'שם חייב להיות לפחות באורך 2 תווים')
            .max(30, 'שם לא יכול להיות יותר מ-30 תווים'),
        password: Yup.string()
            .required('סיסמה היא שדה חובה')
            .min(6, 'סיסמה חייבת להיות לפחות באורך 6 תווים'),
        email: Yup.string()
            .required('אימייל הוא שדה חובה')
            .email('אימייל לא תקין'),
        city: Yup.string()
            .required('עיר היא שדה חובה')
            .min(2, 'עיר חייבת להיות לפחות באורך 2 תווים')
            .max(50, 'עיר לא יכולה להיות יותר מ-50 תווים'),
        street: Yup.string()
            .required('רחוב הוא שדה חובה')
            .min(2, 'רחוב חייב להיות לפחות באורך 2 תווים')
            .max(50, 'רחוב לא יכול להיות יותר מ-50 תווים'),
        houseNumber: Yup.number()
            .required('מספר בית הוא שדה חובה')
            .positive('מספר בית חייב להיות חיובי')
            .integer('מספר בית חייב להיות מספר שלם')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        debugger;
        dispatch(addOneUser(data));
        alert("הלקוח נוסף בהצלחה!");
        document.querySelectorAll('.in').forEach((element) => { element.value = '' });
    }

    return (
        <div className="au">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>מידע אישי</legend>
                    <label htmlFor="name">שם:</label>
                    <input className="in" type="text" id="name" name="name" {...register("name")} />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                    
                    <label htmlFor="password">סיסמה:</label>
                    <input className="in" type="password" id="password" name="password" {...register("password")} />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                    
                    <label htmlFor="email">אימייל:</label>
                    <input className="in" type="email" id="email" name="email" {...register("email")} />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </fieldset>
                <fieldset>
                    <legend>פרטי כתובת</legend>
                    <label htmlFor="city">עיר:</label>
                    <input className="in" type="text" id="city" name="city" {...register("city")} />
                    {errors.city && <span className="error-message">{errors.city.message}</span>}
                    
                    <label htmlFor="street">רחוב:</label>
                    <input className="in" type="text" id="street" name="street" {...register("street")} />
                    {errors.street && <span className="error-message">{errors.street.message}</span>}
                    
                    <label htmlFor="house-number">מספר בית:</label>
                    <input className="in" type="number" id="house-number" name="house-number" {...register("houseNumber")} />
                    {errors.houseNumber && <span className="error-message">{errors.houseNumber.message}</span>}
                </fieldset>
                <div>
                    <input type="submit" value="הוסף משתמש" />
                </div>
            </form>
        </div>
    );
}
