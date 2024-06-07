import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from './usersSlice';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import "./usersList.scss"

export default function UsersList() {

    let dispatch = useDispatch();

    const fetchAllUser = async () => {
        dispatch(fetchAllUsers());
    };

    useEffect(() => {
        fetchAllUser();
    }, []);

    const users = useSelector(s => s.user.arrUser);
    return (<div className='ul'>
        {users.map((x) => (<>
            <div className='user' key={x?.id}>
                <div className='diitail'>
                    <PersonIcon></PersonIcon>
                    <div>{x?.name}</div>
                </div>
                <div className='diitail'>
                    <EmailIcon></EmailIcon>
                    <div>{x?.email}</div>
                </div>
                <div className='diitail'>
                    <VpnKeyIcon></VpnKeyIcon>
                    <div>{x?.password}</div>
                </div>
                <div className='diitail'>
                    <HomeIcon></HomeIcon>
                    <div>{x?.street}</div>
                    <div className='space'>{x?.houseNumber}</div>
                    <div className='space'>{x?.city}</div>
                </div>
            </div>
        </>))}
    </div>)
}