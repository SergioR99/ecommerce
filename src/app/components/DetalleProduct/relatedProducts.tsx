"use client";
import "./relatedProducts.css";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cardStore";
import { useListProducts } from "../Hooks/useListProducts";

const RelatedProducts = () => {
    const router = useRouter();
    // const carrito = useCartStore((state) => state.carrito);
    const { listProducts, loading } = useListProducts(
        "https://api-frontend-production.up.railway.app/api/products?ft=tenis"
    );
    

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
        <div className="relatedProduct">
            <div className="relatedProduct--content">
                <h1 className="relatedProduct--content__title">Productos relacionados</h1>
            </div>
            <ul className="relatedProductList">
            {listProducts.slice(0, 4).map((product) => {
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
                <li key={product.productId} className="productItemRelate">

                    <div className="productItemRelate--imagen" onClick={handleClick}>
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
                            <div className="productItemRelate__sizes">
                                <p className="productItemRelate__sizes--text">Tallas:</p>
                                {allTallas.map((talla) => (
                                <button className="productItemRelate__sizes--buttons"
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

                        <div className="productItemRelate__info" onClick={handleClick}>
                                <h3 className="productItemRelate__info--name">
                                {product.productName.length > 40
                                    ? product.productName.slice(0, 40) + "..."
                                    : product.productName}
                                </h3>

                            {price && (
                                <p className="productItemRelate__info--price">
                                    {new Intl.NumberFormat("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                        maximumFractionDigits: 0,
                                    }).format(price)}
                                </p>
                            )}
                        </div>
                    </div>
                    
                </li>
                );
            })}
            </ul>
        </div>
        </>
    );
};

export default RelatedProducts;