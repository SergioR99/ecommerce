"use client";
import Image from "next/image";
import { ProductInfo } from "../Hooks/useListProducts";
import "./styles.css";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ImagenProd = ({ product }: { product: ProductInfo }) => {
    const allImages = product.items[0]?.images || [];
    
    const BATCH_SIZE = 1; 
    const [visibleImages, setVisibleImages] = useState(allImages.slice(0, BATCH_SIZE));
    const fetchMoreImages = () => {
        const nextImages = allImages.slice(visibleImages.length, visibleImages.length + BATCH_SIZE);
        setVisibleImages(prev => [...prev, ...nextImages]);
    };

    return (

        <>
            <InfiniteScroll
                dataLength={visibleImages.length}
                next={fetchMoreImages}
                hasMore={visibleImages.length < allImages.length}
                loader={<h4>Cargando más imágenes...</h4>}
            >
            {visibleImages.map((image, index) => (
                <Image
                    key={index}
                    src={image.imageUrl}
                    alt={image.imageText || 'Imagen del producto'}
                    width={200}
                    height={200}
                    className="imageVH"
                    style={{ 
                        width: "100%", 
                        height: '90vh', 
                        objectFit: 'cover',
                        objectPosition: 'bottom',
                    }}
                />
            ))}
            </InfiniteScroll>
        </>
    );
};

export default ImagenProd;
