"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cardStore";
import { ProductInfo } from "../Hooks/useListProducts";

const InfoProduct = ({ product }: { product: ProductInfo }) => {
    // console.log(product);
    const addCart = useCartStore((state) => state.addCart);
    const carrito = useCartStore((state) => state.carrito);
    const [selectedTalla, setSelectedTalla] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    
    const price = product.items[0].sellers[0].commertialOffer.Price;
    const image = product.items[0].images[0]?.imageUrl;
    
    const allTallas = Array.from( new Set( product.items.flatMap((item) => item.Talla || [])));
    const allColors = Array.from( new Set( product.items.flatMap((item) => item.Color || [])));

    useEffect(() => {
        console.log(carrito);
    }, [carrito])

    const handleAddToCart = () => {
        setSubmitAttempted(true);
        if (!selectedTalla || !selectedColor) {
            return;
        }

        addCart({
            idProduct: product.productId,
            productName: product.productName,
            color: selectedColor,
            size: selectedTalla,
            price: price.toString(),
            image: image
        });
    };

    return (

        <>
            <h1 className="detailProduct__info--title">{product.productName}</h1>
            <p className="detailProduct__info--brand">{product.brand} / {product.productReference}</p>
            <p className="detailProduct__info--price">
                {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                }).format(price)}
            </p>

            <div className="detailProduct__tallas">
                <p className="detailProduct__tallas--copy">Tallas:</p>
                {allTallas.length > 0 && (
                    (allTallas.map((talla) => (
                        <button 
                            key={talla}
                            className={`productItem__sizes--buttonsDetail ${selectedTalla === talla ? "productItem__sizes--buttonsDetailActive" : ""}`} 
                            onClick={() => setSelectedTalla(talla)}
                        >
                            {talla}
                        </button>
                    )))
                )}
                {submitAttempted && !selectedTalla && (
                    <p className="detailProduct__tallas--alert">Selecciona una talla</p>
                )}
            </div>

            <div className="detailProduct__tallas">
                <p className="detailProduct__tallas--copy">Colores:</p>
                {allColors.length > 0 && (
                    (allColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`productItem__sizes--buttonsDetail ${selectedColor === color ? "productItem__sizes--buttonsDetailActive" : ""}`}
                        >
                            {color}
                        </button>
                    )))
                )}
                {submitAttempted && !selectedColor && (
                    <p className="detailProduct__tallas--alert">Selecciona un color</p>
                )}
            </div>

            <button 
                className="detailProduct__add" 
                onClick={handleAddToCart}
            >
                Agregar al carrito
            </button>

            <div className="detailProduct__info--descrip">
                <h3 className="detailProduct__info--descrip--title">Descripción</h3>
                <p>{product.description}</p>
            </div>
        </>
    );
};

export default InfoProduct;
function addCart(arg0: { idProduct: string; productName: string; color: string; size: string; price: string; quantity: number; }) {
    throw new Error("Function not implemented.");
}

