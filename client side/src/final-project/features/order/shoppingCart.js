import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../product/singleProduct";

export default function ShoppingCart() {
    const cart = useSelector(s => s.order.newOrder.cart);

    return (
        <>
            {cart.length === 0 ? (
                <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <p style={{ fontSize: "18px", color: "#888" }}>
                        העגלה שלך ריקה. הוסף מוצרים לעגלה והתחל לקנות!
                    </p>
                </div>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", padding: "0 20px" }}>
                    {cart.map((c) => (
                        <div key={c.id} style={{ margin: "10px" }}>
                            <SingleProduct product={c.id} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
