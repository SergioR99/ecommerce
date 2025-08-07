import { useEffect, useState } from "react";

export type ProductItem = {
    itemId: string;
    images: ProductImage[];
    Color: string[];
    Talla: string[];
    sellers: ProductSeller[];
};

export type ProductInfo = {
    productId: string;
    productName: string;
    items: ProductItem[];
    productReference: string;
    brand: string;
    description: string;
};

export type ProductImage = {
    imageId: string;
    imageUrl: string;
    imageText: string;
};

export type ProductSeller = {
    commertialOffer: {
        Price: number;
        PriceWithoutDiscount: number;
        FullSellingPrice: number;
        IsAvailable: boolean;
    };
};


export function useListProducts (url:string) {
    const [listProducts, setListProducts] = useState<ProductInfo[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    fetch (url)
        .then((res: { json: () => any; }) => res.json())
        .then((data: []) => {
            // console.log(data);
            setLoading(false)
            setListProducts(data);
        })
        .catch((err: any) => {
            console.error(err)
            setLoading(false)
        })

    }, [url]);

    return { listProducts, loading }

}
