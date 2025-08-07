import { useCartStore } from "@/app/store/cardStore";
import "./cart.css"
import CloseIco from "../util/close";
import TrashIco from "../util/trash";

const CartItems = ({openCart, setopenCart}: {openCart: Boolean, setopenCart: any}) => {
    const carrito = useCartStore((state) => state.carrito);
    const deleteCart = useCartStore(state => state.deleteCart);
    

    const total = carrito.reduce((acc, item) => {
        const priceNum = parseFloat(item.price);
        return acc + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
    }, 0);
    
    return (
        <>
        <div className={openCart ? 'carrtioCont active' : 'carrtioCont'}>
            <div className="carrtioCont--body">
                <div className="carrtioCont--title" onClick={() => {setopenCart(false)}}>
                    <h2 className="carrtioCont--title__copy">Carrito</h2>
                    <CloseIco/>
                </div>
                {carrito.length === 0 && <p>Todavía no hay productos</p>}
                <ul className="carrtioCont--list">
                    {carrito.map((e) => (
                        <li key={`${e.idProduct}-${e.color}-${e.size}`} className="carrtioCont--items">
                            <div className="carrtioCont--items__image">
                                <img src={e.image} alt={e.productName}/>
                            </div>
                            <div>
                                <h3 className="carrtioCont--items__title">{e.productName}</h3>
                                <div className="carrtioCont--items__info">
                                    <div>
                                        <p className="carrtioCont--items__title__copy">Color: {e.color} / Talla {e.size}</p>
                                        <p className="carrtioCont--items__title__copy">Cantidad: {e.quantity}</p>
                                        <p className="carrtioCont--items__title__copy">Valor: {new Intl.NumberFormat("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            maximumFractionDigits: 0,
                                            }).format(parseFloat(e.price))}
                                        </p>
                                    </div>
                                    <div onClick={() => deleteCart(e.idProduct, e.size)}><TrashIco/></div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="carrtioCont--total">
                <p className="carrtioCont--total__copy">Total</p>
                <h3 className="carrtioCont--total__price">
                {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                }).format(total)}
                </h3>
            </div>
        </div>
        <div onClick={() => {setopenCart(false)}} className={openCart ? 'generalCarrito active' : 'generalCarrito'}></div>
        </>
    )
}

export default CartItems