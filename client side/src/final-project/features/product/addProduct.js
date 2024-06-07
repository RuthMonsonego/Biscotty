// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { IconButton } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { updateOneProduct, addOneProduct } from './productsSlice'; // Assuming update action
// import './addProduct.scss';

// export default function AddProduct({ p }) {

//     const [vegan, setVegan] = useState(false);
//     const [milk, setMilk] = useState(true);
//     const [gluten, setGluten] = useState(true);
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFileName, setImageFileNane] = useState('צרף תמונה של העוגה');
//     const { register, handleSubmit } = useForm();
//     const dispatch = useDispatch();

//     const handleImageChange = (event) => {
//         const newImageFile = event.target.files[0];
//         const fileName = newImageFile.name;
//         setImageFile(newImageFile);
//         setImageFileNane(fileName);
//     };

//     const handleKeyPress = (e) => {
//         const isValidKey = /[0-9.]/.test(e.key);
//         if (!isValidKey) {
//             e.preventDefault();
//         }
//     };

//     useEffect(() => {
//         if (p.id !== -1) {
//             setVegan(p.isVegan === "true");
//             setMilk(p.isMilki === "true");
//             setGluten(p.isGluten === "true");
//             setImageFileNane(p.image ? p.image : 'צרף תמונה של העוגה');
//         }
//     }, [p]);

//     const onSubmit = async (data) => {
//         debugger;
//         const formData = new window.FormData();
//         formData.append('name', data.name);
//         formData.append('price', data.price);
//         formData.append('description', data.description);
//         formData.append('isVegan', vegan ? "true" : "false");
//         formData.append('isMilki', milk ? "true" : "false");
//         formData.append('isGluten', gluten ? "true" : "false");
//         if (imageFile) {
//             formData.append('image', imageFile);
//         }
//         if (p.id === -1) {
//             await dispatch(addOneProduct(formData));
//             alert("העוגה נוספה לאתר בהצלחה!");
//         }
//         else {
//             formData.append('id', p.id);
//             await dispatch(updateOneProduct(formData));
//             alert("העוגה עודכנה באתר בהצלחה!");
//         }
//         setVegan(false);
//         setMilk(true);
//         setGluten(true);
//         setImageFileNane('צרף תמונה של העוגה');
//         document.querySelectorAll('.ss').forEach((element) => { element.value = '' });
//     };

//     return (
//         <>
//             <div className="s">
//                 <div className="container">
//                     <div className="title">{p.id !== -1 ? 'עדכון עוגה' : 'הוספת עוגה'}</div>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="user__details">
//                             <div className="input__box">
//                                 <input
//                                     className="ss"
//                                     type="text"
//                                     placeholder="שם העוגה"
//                                     required
//                                     {...register("name", {
//                                         // Add validation rules if needed
//                                         // ...errors.name && <span>{errors.name.message}</span>
//                                     })}
//                                     defaultValue={p?.name} // Set default value from p if available
//                                 />
//                             </div>
//                             <div className="input__box">
//                                 <input
//                                     className="ss"
//                                     onKeyPress={handleKeyPress}
//                                     type="text"
//                                     placeholder="מחיר העוגה"
//                                     required
//                                     {...register("price", {
//                                         // Add validation rules if needed
//                                         // ...errors.price && <span>{errors.price.message}</span>
//                                     })}
//                                     defaultValue={p?.price} // Set default value from p if available
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <textarea
//                                 className="ss"
//                                 placeholder="תיאור למראה העוגה וטעמה"
//                                 {...register("description", {
//                                     // Add validation rules if needed
//                                     // ...errors.description && <span>{errors.description.message}</span>
//                                 })}
//                                 defaultValue={p?.description} // Set default value from p if available
//                             />
//                         </div>
//                         <div className="image-upload">
//                             <input required type="file" accept="image/*" onChange={handleImageChange} id="image-upload-input" />
//                             <CloudUploadIcon className="CloudUploadIcon" />
//                             <label htmlFor="image-upload-input">{imageFileName}</label>
//                         </div>
//                         <div className="gender__details">
//                             <div className="category">
//                                 <div>
//                                     <IconButton onClick={() => setVegan(!vegan)}>
//                                         {vegan ? <CheckCircleIcon className="CheckCircleIcon" /> : <CancelIcon className="CancelIcon" />}
//                                         <label>העוגה טיבעונית</label>
//                                     </IconButton>
//                                 </div>
//                                 <div>
//                                     <IconButton onClick={() => setMilk(!milk)}>
//                                         {milk ? <CheckCircleIcon className="CheckCircleIcon" /> : <CancelIcon className="CancelIcon" />}
//                                         <label>העוגה מכילה חלב</label>
//                                     </IconButton>
//                                 </div>
//                                 <div>
//                                     <IconButton onClick={() => setGluten(!gluten)}>
//                                         {gluten ? <CheckCircleIcon className="CheckCircleIcon" /> : <CancelIcon className="CancelIcon" />}
//                                         <label>העוגה מכילה גלוטן</label>
//                                     </IconButton>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="button">
//                             <input type="submit" value={p.id !== -1 ? 'עדכן' : 'הוסף'} />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateOneProduct, addOneProduct } from './productsSlice'; // Assuming update action
import './addProduct.scss';

export default function AddProduct({ p }) {
    const [vegan, setVegan] = useState(false);
    const [milk, setMilk] = useState(true);
    const [gluten, setGluten] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileNane] = useState('צרף תמונה של העוגה');

    // Define the validation schema with Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('שם העוגה הוא שדה חובה')
            .min(2, 'שם העוגה חייב להיות לפחות באורך 2 תווים')
            .max(30, 'שם העוגה לא יכול להיות יותר מ-30 תווים'),
        price: Yup.number()
            .typeError('מחיר העוגה חייב להיות מספר')
            .required('מחיר העוגה הוא שדה חובה')
            .positive('מחיר העוגה חייב להיות חיובי'),
        description: Yup.string()
            .max(200, 'תיאור העוגה לא יכול להיות יותר מ-200 תווים')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch();

    const handleImageChange = (event) => {
        const newImageFile = event.target.files[0];
        const fileName = newImageFile.name;
        setImageFile(newImageFile);
        setImageFileNane(fileName);
    };

    const handleKeyPress = (e) => {
        const isValidKey = /[0-9.]/.test(e.key);
        if (!isValidKey) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (p.id !== -1) {
            setVegan(p.isVegan === "true");
            setMilk(p.isMilki === "true");
            setGluten(p.isGluten === "true");
            setImageFileNane(p.image ? p.image : 'צרף תמונה של העוגה');
        }
    }, [p]);

    const onSubmit = async (data) => {
        debugger;
        const formData = new window.FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('isVegan', vegan ? "true" : "false");
        formData.append('isMilki', milk ? "true" : "false");
        formData.append('isGluten', gluten ? "true" : "false");
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (p.id === -1) {
            await dispatch(addOneProduct(formData));
            alert("העוגה נוספה לאתר בהצלחה!");
        } else {
            formData.append('id', p.id);
            await dispatch(updateOneProduct(formData));
            alert("העוגה עודכנה באתר בהצלחה!");
        }
        setVegan(false);
        setMilk(true);
        setGluten(true);
        setImageFileNane('צרף תמונה של העוגה');
        document.querySelectorAll('.ss').forEach((element) => { element.value = '' });
    };

    return (
        <>
            <div className="s">
                <div className="container">
                    <div className="title">{p.id !== -1 ? 'עדכון עוגה' : 'הוספת עוגה'}</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="user__details">
                            <div className="input__box">
                                <input
                                    className="ss"
                                    type="text"
                                    placeholder="שם העוגה"
                                    {...register("name")}
                                    defaultValue={p?.name} // Set default value from p if available
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>
                            <div className="input__box">
                                <input
                                    className="ss"
                                    onKeyPress={handleKeyPress}
                                    type="text"
                                    placeholder="מחיר העוגה"
                                    {...register("price")}
                                    defaultValue={p?.price} // Set default value from p if available
                                />
                                {errors.price && <span className="error-message">{errors.price.message}</span>}
                            </div>
                        </div>
                        <div>
                            <textarea
                                className="ss"
                                placeholder="תיאור למראה העוגה וטעמה"
                                {...register("description")}
                                defaultValue={p?.description} // Set default value from p if available
                            />
                            {errors.description && <span className="error-message">{errors.description.message}</span>}
                        </div>
                        <div className="image-upload">
                            <input required type="file" accept="image/*" onChange={handleImageChange} id="image-upload-input" />
                            <CloudUploadIcon className="CloudUploadIcon" />
                            <label htmlFor="image-upload-input">{imageFileName}</label>
                        </div>
                        <div className="gender__details">
                            <div className="category">
                                <div>
                                    <IconButton onClick={() => setVegan(!vegan)}>
                                        {vegan ? <CheckCircleIcon className="CheckCircleIcon" /> : <CancelIcon className="CancelIcon" />}
                                        <label>העוגה טיבעונית</label>
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton onClick={() => setMilk(!milk)}>
                                        {milk ? <CheckCircleIcon className="CheckCircleIcon" /> : <CancelIcon className="CancelIcon" />}
                                        <label>העוגה מכילה חלב</label>
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton onClick={() => setGluten(!gluten)}>
                                        {gluten ? <CheckCircleIcon className="CheckCircleIcon" /> : <CancelIcon className="CancelIcon" />}
                                        <label>העוגה מכילה גלוטן</label>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div className="button">
                            <input type="submit" value={p.id !== -1 ? 'עדכן' : 'הוסף'} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
