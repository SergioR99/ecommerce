"use client"
import { useCartStore } from "@/app/store/cardStore";
import LogoVelez from "../util/logoVelez";
import CarritoIco from "../util/carrito";
import CartItems from "./cart";
import "./styles.css"
import { useState } from "react";
import Link from "next/link";

const Header = () => {
    const [openCart, setopenCart] = useState<boolean>(false)

    const carrito = useCartStore((state) => state.carrito);

    return (
        <>
            <header>
                <div className="header--logo">
                    <p className="header--logo__text">VÉLEZ</p>
                    <LogoVelez/>
                </div>
                <div className="header--items">
                    <Link href="/" className="header--items__link">Productos</Link>
                    <div className="header--carrito" onClick={() => setopenCart(true)}>
                        <p className="header--carrito__text">Carrito de compra</p>
                        <span>
                            <CarritoIco/>
                        </span>
                        <span className="header--carrito__counter">
                            {carrito.reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    </div>
                </div>
            </header>
            <CartItems setopenCart={setopenCart} openCart={openCart}></CartItems>
        </>
    )
}

export default Header