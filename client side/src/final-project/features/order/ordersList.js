// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrders } from "./ordersSlice";
// import SingleOrder from "./singleOrder";

// export default function OrdersList() {
//     const dispatch = useDispatch();

//     const fetchAllOrder = async () => {
//         dispatch(fetchAllOrders());
//     };

//     useEffect(() => {
//         fetchAllOrder();
//     }, [dispatch]);

//     const orders = useSelector(s => s.order.arrOrder);
//     const user = useSelector(s => s.user.currentUser);
//     const filteredOrders = user.id === 0 ? orders : orders.filter(order => order.userId === user.id);

//     return (
//         <div>
//             {filteredOrders.length === 0 && user.role !== "admin" ? (
//                 <div style={{ textAlign: "center", margin: "20px 0" }}>
//                     <p style={{ fontSize: "18px", color: "#888" }}>
//                         אין לך הזמנות עדיין. התחל לבצע הזמנות מהאתר!
//                     </p>
//                 </div>
//             ) : (
//                 filteredOrders.map((order) => (
//                     <SingleOrder o={order} u={user} key={order.id} />
//                 ))
//             )}
//         </div>
//     );
// }
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrders } from "./ordersSlice";
// import SingleOrder from "./singleOrder";

// export default function OrdersList({ selectedDate }) {
//     const dispatch = useDispatch();

//     const fetchAllOrder = async () => {
//         dispatch(fetchAllOrders());
//     };

//     useEffect(() => {
//         fetchAllOrder();
//     }, [dispatch]);

//     const orders = useSelector(s => s.order.arrOrder);
//     const user = useSelector(s => s.user.currentUser);
//     const filteredOrders = user.id === 0 ? orders : orders.filter(order => order.userId === user.id);

//     const filteredByDateOrders = selectedDate 
//         ? filteredOrders.filter(order => new Date(order.date).toISOString().split('T')[0] === selectedDate)
//         : filteredOrders;

//     return (
//         <div>
//             {filteredByDateOrders.length === 0 && user.role !== "admin" ? (
//                 <div style={{ textAlign: "center", margin: "20px 0" }}>
//                     <p style={{ fontSize: "18px", color: "#888" }}>
//                         אין לך הזמנות עדיין. התחל לבצע הזמנות מהאתר!
//                     </p>
//                 </div>
//             ) : (
//                 filteredByDateOrders.map((order) => (
//                     <SingleOrder o={order} u={user} key={order.id} />
//                 ))
//             )}
//         </div>
//     );
// }
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "./ordersSlice";
import SingleOrder from "./singleOrder";

export default function OrdersList({ selectedDate }) {
    const dispatch = useDispatch();

    const fetchAllOrder = async () => {
        dispatch(fetchAllOrders());
    };

    useEffect(() => {
        fetchAllOrder();
    }, [dispatch]);

    const orders = useSelector(s => s.order.arrOrder);
    const user = useSelector(s => s.user.currentUser);
    const filteredOrders = user.id === 0 ? orders : orders.filter(order => order.userId === user.id);

    const isValidDate = (date) => {
        return !isNaN(Date.parse(date));
    };

    const filteredByDateOrders = selectedDate && isValidDate(selectedDate)
        ? filteredOrders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate.toISOString().split('T')[0] === selectedDate;
        })
        : filteredOrders;

    return (
        <div>
            {filteredByDateOrders.length === 0 && user.role !== "admin" ? (
                <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <p style={{ fontSize: "18px", color: "#888" }}>
                        אין לך הזמנות עדיין. התחל לבצע הזמנות מהאתר!
                    </p>
                </div>
            ) : (
                filteredByDateOrders.map((order) => (
                    <SingleOrder o={order} u={user} key={order.id} />
                ))
            )}
        </div>
    );
}
