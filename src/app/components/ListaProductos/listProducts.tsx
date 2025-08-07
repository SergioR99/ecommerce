"use client";
import "./styles.css";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cardStore";
import { useListProducts } from "../Hooks/useListProducts";

const ListProducts = () => {
    const router = useRouter();
    // const carrito = useCartStore((state) => state.carrito);
    const { listProducts, loading } = useListProducts(
        "https://api-frontend-production.up.railway.app/api/products?ft=tenis"
    );

    // console.log(listProducts);

    // useEffect(() => {
    //     console.log(carrito);
    // }, [carrito])
    

    if (loading) return (
        <>
            <div className="loadingPage">
                <span className="loadingPage--loader"></span>
                <p className="loadingPage--copy">Cargando contenido</p>
            </div>
        </>
    );


    return (
        <>
        <div className="category">
            <div className="category--content">
                <h1 className="category--content__title">Tenis Vélez</h1>
                <p className="category--content__copy">Diseños modernos adaptados a tu ritmo diarío, nuestros tenis para hombre, propuestas que se adaptan a tu esencia.</p>
            </div>
            <ul className="categoryList">
            <li className="-brand-content -half productItem">
                <Image 
                    src={"/catalog-image.webp"} 
                    alt={""} 
                    priority={true}
                    width={690} 
                    height={505}
                    style={{ width: "100%", height: "auto" }}>

                </Image>
            </li>
            {listProducts.map((product) => {
                const items = product.items || [];

                const allColors = Array.from(
                    new Set(
                    items.flatMap((item) => item.Color || [])
                    )
                );

                const allTallas = Array.from(
                    new Set(
                    items.flatMap((item) => item.Talla || [])
                    )
                );

                const price = items[0]?.sellers?.[0]?.commertialOffer?.Price;
                const firstImage = product.items[0]?.images?.[0];

                const handleClick = () => {
                    router.push(`/product/${product.productId}`);
                };

                return (
                <li key={product.productId} className="productItem">

                    <div className="productItem--imagen" onClick={handleClick}>
                        {firstImage?.imageUrl && (
                            <img
                            src={firstImage.imageUrl}
                            alt={firstImage.imageText || product.productName}
                            width='100%'
                            />
                        )}
                    </div>

                    <div className="contInfo">
                        {allTallas.length > 0 && (
                            <div className="productItem__sizes">
                                <p className="productItem__sizes--text">Tallas:</p>
                                {allTallas.map((talla) => (
                                <button className="productItem__sizes--buttons"
                                    key={talla}
                                    onClick={() => {
                                    useCartStore.getState().addCart({
                                        idProduct: product.productId,
                                        productName: product.productName,
                                        size: talla,
                                        color: allColors[0] || "Sin color",
                                        price: price?.toString() || "0",
                                        image: firstImage?.imageUrl || ""
                                    });
                                    }}
                                >
                                    {talla}
                                </button>
                                ))}
                            </div>
                        )}

                        <div className="productItem__info" onClick={handleClick}>
                                <h3 className="productItem__info--name">
                                {product.productName.length > 40
                                    ? product.productName.slice(0, 40) + "..."
                                    : product.productName}
                                </h3>

                            {price && (
                                <p className="productItem__info--price">
                                    {new Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        maximumFractionDigits: 0,
                                    }).format(price)}
                                </p>
                            )}
                        </div>
                    </div>



                    {/* {allColors.length > 0 && (
                        <div className="lv-product-list__item_div_buttons">
                            {allColors.map((color) => (
                            <button className="lv-product-list__item__buttons"
                                key={color}
                            >
                                {color}
                            </button>
                            ))}
                        </div>
                    )} */}
                    
                </li>
                );
            })}
            </ul>
        </div>
        </>
    );
};

export default ListProducts;
