import React, { useEffect, useRef, useState } from "react";
import './navBar.scss';
import p from '../../app/images/אנימציה.gif';
import CakeIcon from '@mui/icons-material/Cake';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../app/images/ביסקוטי.png'
import { useNavigate } from "react-router-dom";
import ProductsList from "../product/productsList";
import OrdersList from "../order/ordersList";
import UsersList from "../user/usersList"
import { useDispatch } from "react-redux";
import { logoutUser } from './usersSlice';
import { IconButton } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import AddProduct from "../product/addProduct";
import AddUser from "./addUser";
import { fetchProductt } from "../product/productsSlice"

export default function NavBarManager() {

  const [selectedItem, setSelectedItem] = useState('cakes');
  const [showImage, setShowImage] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cakesIconRef = useRef(null);
  const [fil, setFil] = useState('');
  const [sort, setSort] = useState(false);
  const [milk, setMilk] = useState(false);
  const [forUpdate, setForUpdate] = useState(null);

  const setUpdate = async(id) => {
    debugger;
    const res = await dispatch(fetchProductt(id));
    setForUpdate(res.payload);
  }

  const updateProduct = async(idProduct) => {
    debugger;
    console.log("id product"+idProduct);
    await setUpdate(idProduct);
    setSelectedItem('updateCake');
  }

  useEffect(() => {
    setTimeout(() => setShowImage(false), 4000);
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const go = () => {
    setTimeout(() => {
      navigate('/');
      dispatch(logoutUser());
    }, 1000);
  }

  const renderContent = () => {
    switch (selectedItem) {
      case 'cakes':
        return <ProductsList update={updateProduct} fil={fil} sort={sort} milk={milk} />
      case 'orders':
        return <OrdersList />;
      case 'users':
        return <UsersList />;
      case 'addCake':
        return <AddProduct p={{"id":-1}} />;
      case 'addUser':
        return <AddUser />;
      case 'updateCake':
        return <AddProduct p={forUpdate} />
      default:
        return null;
    }
  };

  if (!showImage)
    return (
      <div>
        <div className="navbar icon__container">
          <img src={logo} alt="Logo" className="logo" />
          <div className="box">
            <div onClick={() => go()} tabIndex="0" className="icon">
              <span id="icon-content">
                <p id="content" data-content="התנתקות מהמערכת"></p><LogoutIcon></LogoutIcon>
              </span>
            </div>
            <div onClick={() => handleClick('orders')} tabIndex="1" className="icon">
              <span id="icon-content">
                <p id="content" data-content="הסטוריית הזמנות"></p><HistoryIcon></HistoryIcon>
              </span>
            </div>
            {selectedItem==='users'||selectedItem==='addUser'?<div onClick={() => handleClick('addUser')} tabIndex="2" className="icon">
              <span id="icon-content">
                <p id="content" data-content="הוספת משתמש"></p><AddIcon></AddIcon>
              </span>
            </div>:null}
            <div onClick={() => handleClick('users')} tabIndex="3" className="icon">
              <span id="icon-content">
                <p id="content" data-content="רשימת משתמשים"></p><PersonIcon></PersonIcon>
              </span>
            </div>
            {selectedItem==='cakes'||selectedItem==='addCake'?<div onClick={() => handleClick('addCake')} tabIndex="4" className="icon">
              <span id="icon-content">
                <p id="content" data-content="הוספת עוגה"></p><AddIcon></AddIcon>
              </span>
            </div>:null}
            <div ref={cakesIconRef} onClick={() => handleClick('cakes')} autoFocus tabIndex="5" className="icon">
              <span id="icon-content">
                <p id="content" data-content="העוגות שלנו"></p><CakeIcon></CakeIcon>
              </span>
            </div>
          </div>
          {selectedItem == 'cakes' && <div className='n'>
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
          </div>}
        </div>
        <div className="con">{renderContent()}</div>
      </div>
    )
  return (
    <div className="pic">
      <div style={!showImage ? { display: "none" } : {}} className="image-container">
        <img src={p} alt="Image description" />
      </div>
    </div>
  )
}