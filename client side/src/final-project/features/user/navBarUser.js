// import React, { useEffect, useRef, useState } from "react";
// import './navBar.scss';
// import p from '../../app/images/אנימציה.gif';
// import CakeIcon from '@mui/icons-material/Cake';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import HistoryIcon from '@mui/icons-material/History';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import RedoIcon from '@mui/icons-material/Redo';
// import logo from '../../app/images/ביסקוטי.png'
// import { useNavigate } from "react-router-dom";
// import ProductsList from "../product/productsList";
// import OrdersList from "../order/ordersList";
// import ShoppingCart from "../order/shoppingCart";
// import { useDispatch } from "react-redux";
// import { logoutUser } from './usersSlice';
// import { IconButton } from '@mui/material';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import SearchIcon from '@mui/icons-material/Search';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckIcon from '@mui/icons-material/Check';
// import CompletionOrder from "../order/completionOrder"

// export default function NavBarUser() {

//   const [selectedItem, setSelectedItem] = useState('cakes');
//   const [showImage, setShowImage] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cakesIconRef = useRef(null);
//   const [fil, setFil] = useState('');
//   const [sort, setSort] = useState(false);
//   const [milk, setMilk] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setShowImage(false), 4000);
//   }, []);

//   const handleClick = (item) => {
//     setSelectedItem(item);
//   };

//   const go = () => {
//     dispatch(logoutUser());
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   }

//   const renderContent = () => {
//     switch (selectedItem) {
//       case 'cakes':
//         return <ProductsList update={null} fil={fil} sort={sort} milk={milk} />;
//       case 'orders':
//         return <OrdersList />;
//       case 'cart':
//         return <ShoppingCart />;
//       case 'pay':
//         return <CompletionOrder />
//       default:
//         return null;
//     }
//   };
//   if (!showImage)
//     return (
//       <div>
//         <div className="navbar icon__container">
//           <img src={logo} alt="Logo" className="logo" />
//           <div className="box">
//             <div onClick={() => go()} tabIndex="0" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="התנתקות מהמערכת"></p><LogoutIcon></LogoutIcon>
//               </span>
//             </div>
//             <div onClick={() => handleClick('orders')} tabIndex="1" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="הסטוריית הזמנות"></p><HistoryIcon></HistoryIcon>
//               </span>
//             </div>
//             <div onClick={() => handleClick('cart')} tabIndex="2" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="עגלת הקניות"></p><ShoppingCartIcon></ShoppingCartIcon>
//               </span>
//             </div>
//             <div ref={cakesIconRef} onClick={() => handleClick('cakes')} autoFocus tabIndex="3" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="העוגות שלנו"></p><CakeIcon></CakeIcon>
//               </span>
//             </div>
//           </div>
//           {selectedItem == 'cakes' && <div className='n'>
//             <nav className="navigation-bar">
//               <span>
//                 <IconButton onClick={() => setSort(!sort)} aria-label="sale">{!sort ? <CurrencyExchangeIcon /> : <AttachMoneyIcon />}sale</IconButton>
//               </span>
//               <span>
//                 <IconButton onClick={() => setMilk(!milk)}>{!milk ? <CloseIcon /> : <CheckIcon />}פרווה</IconButton>
//               </span>
//               <span>
//                 <SearchIcon style={{ color: "grey" }} /><input type='text' placeholder='חפש' onChange={(e) => setFil(e.target.value)} size="15" />
//               </span>
//             </nav>
//           </div>}
//           {selectedItem == 'cart' && <div className='n'>
//             <nav className="navigation-bar">
//               <span>
//                 <IconButton onClick={() => handleClick('pay')} aria-label="pay"><ArrowBackIcon />סיום ההזמנה</IconButton>
//               </span>
//             </nav>
//           </div>}
//           {selectedItem == 'pay' && <div className='n'>
//             <nav className="navigation-bar">
//               <span>
//                 <IconButton onClick={() => handleClick('cart')} aria-label="cakes"><RedoIcon />חזרה לחנות</IconButton>
//               </span>
//             </nav>
//           </div>}
//           {selectedItem == 'orders' && <div className='n'>
//             <nav className="navigation-bar">
//               <label>סנן הזמנות ע"פ תאריך</label>
//               <input type="date"></input>
//             </nav>
//           </div>}
//         </div>
//         <div className="con">{renderContent()}</div>
//       </div>
//     )
//   return (
//     <div className="pic">
//       <div style={!showImage ? { display: "none" } : {}} className="image-container">
//         <img src={p} alt="Image description" />
//       </div>
//     </div>
//   )
// }
// import React, { useEffect, useRef, useState } from "react";
// import './navBar.scss';
// import p from '../../app/images/אנימציה.gif';
// import CakeIcon from '@mui/icons-material/Cake';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import HistoryIcon from '@mui/icons-material/History';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import RedoIcon from '@mui/icons-material/Redo';
// import logo from '../../app/images/ביסקוטי.png';
// import { useNavigate } from "react-router-dom";
// import ProductsList from "../product/productsList";
// import OrdersList from "../order/ordersList";
// import ShoppingCart from "../order/shoppingCart";
// import { useDispatch } from "react-redux";
// import { logoutUser } from './usersSlice';
// import { IconButton } from '@mui/material';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import SearchIcon from '@mui/icons-material/Search';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckIcon from '@mui/icons-material/Check';
// import CompletionOrder from "../order/completionOrder";

// export default function NavBarUser() {
//   const [selectedItem, setSelectedItem] = useState('cakes');
//   const [showImage, setShowImage] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cakesIconRef = useRef(null);
//   const [fil, setFil] = useState('');
//   const [sort, setSort] = useState(false);
//   const [milk, setMilk] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');

//   useEffect(() => {
//     setTimeout(() => setShowImage(false), 4000);
//   }, []);

//   const handleClick = (item) => {
//     setSelectedItem(item);
//   };

//   const go = () => {
//     dispatch(logoutUser());
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   }

//   const renderContent = () => {
//     switch (selectedItem) {
//       case 'cakes':
//         return <ProductsList update={null} fil={fil} sort={sort} milk={milk} />;
//       case 'orders':
//         return <OrdersList selectedDate={selectedDate} />;
//       case 'cart':
//         return <ShoppingCart />;
//       case 'pay':
//         return <CompletionOrder />;
//       default:
//         return null;
//     }
//   };

//   if (!showImage) {
//     return (
//       <div>
//         <div className="navbar icon__container">
//           <img src={logo} alt="Logo" className="logo" />
//           <div className="box">
//             <div onClick={go} tabIndex="0" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="התנתקות מהמערכת"></p><LogoutIcon></LogoutIcon>
//               </span>
//             </div>
//             <div onClick={() => handleClick('orders')} tabIndex="1" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="הסטוריית הזמנות"></p><HistoryIcon></HistoryIcon>
//               </span>
//             </div>
//             <div onClick={() => handleClick('cart')} tabIndex="2" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="עגלת הקניות"></p><ShoppingCartIcon></ShoppingCartIcon>
//               </span>
//             </div>
//             <div ref={cakesIconRef} onClick={() => handleClick('cakes')} autoFocus tabIndex="3" className="icon">
//               <span id="icon-content">
//                 <p id="content" data-content="העוגות שלנו"></p><CakeIcon></CakeIcon>
//               </span>
//             </div>
//           </div>
//           {selectedItem === 'cakes' && (
//             <div className='n'>
//               <nav className="navigation-bar">
//                 <span>
//                   <IconButton onClick={() => setSort(!sort)} aria-label="sale">{!sort ? <CurrencyExchangeIcon /> : <AttachMoneyIcon />}sale</IconButton>
//                 </span>
//                 <span>
//                   <IconButton onClick={() => setMilk(!milk)}>{!milk ? <CloseIcon /> : <CheckIcon />}פרווה</IconButton>
//                 </span>
//                 <span>
//                   <SearchIcon style={{ color: "grey" }} /><input type='text' placeholder='חפש' onChange={(e) => setFil(e.target.value)} size="15" />
//                 </span>
//               </nav>
//             </div>
//           )}
//           {selectedItem === 'cart' && (
//             <div className='n'>
//               <nav className="navigation-bar">
//                 <span>
//                   <IconButton onClick={() => handleClick('pay')} aria-label="pay"><ArrowBackIcon />סיום ההזמנה</IconButton>
//                 </span>
//               </nav>
//             </div>
//           )}
//           {selectedItem === 'pay' && (
//             <div className='n'>
//               <nav className="navigation-bar">
//                 <span>
//                   <IconButton onClick={() => handleClick('cart')} aria-label="cakes"><RedoIcon />חזרה לחנות</IconButton>
//                 </span>
//               </nav>
//             </div>
//           )}
//           {selectedItem === 'orders' && (
//             <div className='n'>
//               <nav className="navigation-bar">
//                 <label>סנן הזמנות ע"פ תאריך</label>
//                 <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
//               </nav>
//             </div>
//           )}
//         </div>
//         <div className="con">{renderContent()}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="pic">
//       <div style={!showImage ? { display: "none" } : {}} className="image-container">
//         <img src={p} alt="Image description" />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import './navBar.scss';
import p from '../../app/images/אנימציה.gif';
import CakeIcon from '@mui/icons-material/Cake';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RedoIcon from '@mui/icons-material/Redo';
import logo from '../../app/images/ביסקוטי.png';
import { useNavigate } from "react-router-dom";
import ProductsList from "../product/productsList";
import OrdersList from "../order/ordersList";
import ShoppingCart from "../order/shoppingCart";
import { useDispatch } from "react-redux";
import { logoutUser } from './usersSlice';
import { IconButton } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CompletionOrder from "../order/completionOrder";

export default function NavBarUser() {
  const [selectedItem, setSelectedItem] = useState('cakes');
  const [showImage, setShowImage] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cakesIconRef = useRef(null);
  const [fil, setFil] = useState('');
  const [sort, setSort] = useState(false);
  const [milk, setMilk] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    setTimeout(() => setShowImage(false), 4000);
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const go = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  const renderContent = () => {
    switch (selectedItem) {
      case 'cakes':
        return <ProductsList update={null} fil={fil} sort={sort} milk={milk} />;
      case 'orders':
        return <OrdersList selectedDate={selectedDate} />;
      case 'cart':
        return <ShoppingCart />;
      case 'pay':
        return <CompletionOrder />;
      default:
        return null;
    }
  };

  if (!showImage) {
    return (
      <div>
        <div className="navbar icon__container">
          <img src={logo} alt="Logo" className="logo" />
          <div className="box">
            <div onClick={go} tabIndex="0" className="icon">
              <span id="icon-content">
                <p id="content" data-content="התנתקות מהמערכת"></p><LogoutIcon></LogoutIcon>
              </span>
            </div>
            <div onClick={() => handleClick('orders')} tabIndex="1" className="icon">
              <span id="icon-content">
                <p id="content" data-content="הסטוריית הזמנות"></p><HistoryIcon></HistoryIcon>
              </span>
            </div>
            <div onClick={() => handleClick('cart')} tabIndex="2" className="icon">
              <span id="icon-content">
                <p id="content" data-content="עגלת הקניות"></p><ShoppingCartIcon></ShoppingCartIcon>
              </span>
            </div>
            <div ref={cakesIconRef} onClick={() => handleClick('cakes')} autoFocus tabIndex="3" className="icon">
              <span id="icon-content">
                <p id="content" data-content="העוגות שלנו"></p><CakeIcon></CakeIcon>
              </span>
            </div>
          </div>
          {selectedItem === 'cakes' && (
            <div className='n'>
              <nav className="navigation-bar">
                <span>
                  <IconButton onClick={() => setSort(!sort)} aria-label="sale">{!sort ? <CurrencyExchangeIcon /> : <AttachMoneyIcon />}sale</IconButton>
                </span>
                <span>
                  <IconButton onClick={() => setMilk(!milk)}>{!milk ? <CloseIcon /> : <CheckIcon />}פרווה</IconButton>
                </span>
                <span>
                  <SearchIcon style={{ color: "grey" }} /><input type='text' placeholder='חפש' onChange={(e) => setFil(e.target.value)} size="15" />
                </span>
              </nav>
            </div>
          )}
          {selectedItem === 'cart' && (
            <div className='n'>
              <nav className="navigation-bar">
                <span>
                  <IconButton onClick={() => handleClick('pay')} aria-label="pay"><ArrowBackIcon />סיום ההזמנה</IconButton>
                </span>
              </nav>
            </div>
          )}
          {selectedItem === 'pay' && (
            <div className='n'>
              <nav className="navigation-bar">
                <span>
                  <IconButton onClick={() => handleClick('cart')} aria-label="cakes"><RedoIcon />חזרה לחנות</IconButton>
                </span>
              </nav>
            </div>
          )}
          {selectedItem === 'orders' && (
            <div className='n'>
              <nav className="navigation-bar">
                <label>סנן הזמנות ע"פ תאריך</label>
                <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
              </nav>
            </div>
          )}
        </div>
        <div className="con">{renderContent()}</div>
      </div>
    );
  }

  return (
    <div className="pic">
      <div style={!showImage ? { display: "none" } : {}} className="image-container">
        <img src={p} alt="Image description" />
      </div>
    </div>
  );
}
