"use client"
import { use } from "react";
import Header from "@/app/components/Header/header";
import { useListProducts } from "@/app/components/Hooks/useListProducts";
import InfoProduct from "@/app/components/DetalleProduct/infoProduct";
import "../../pageDetail.css";
import ImagenProd from "@/app/components/DetalleProduct/imageProduct";
import RelatedProducts from "@/app/components/DetalleProduct/relatedProducts";


export default function ProductDetail(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params);
    const { listProducts, loading } = useListProducts(
        `https://api-frontend-production.up.railway.app/api/products/${id}`
    );

    // console.log(listProducts);
    

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
        <Header></Header>
        <div className="detailProduct">
            <div className="detailProduct__images">
                <ImagenProd product={listProducts[0]} />
            </div>
            <div className="detailProduct__info">
                <InfoProduct product={listProducts[0]} />
            </div>
        </div>
        <RelatedProducts/>
        </>
    );
}