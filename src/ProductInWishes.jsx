import HeartBrokenSvg from "./svg/HeartBrokenSvg"
import CartShoppingSvg from "./svg/CartShoppingSvg"
import "./style/product-in-cart.scss"

function ProductInWishes({ data, isInCart, addToCart, removeFromWishes }) {
    return (
        <li className="product-in-wishes">
            <div className="img-container"><img src={data.image} alt={data.title} loading="lazy" /></div>
            <div className="info-container">
                <h4>{data.title}</h4>
                <h5 className="price">${data.price}</h5>
                <div className="wishes-buttons-container">
                    {
                        !isInCart &&
                        <button className="add-to-cart" onClick={addToCart}>
                            <CartShoppingSvg />
                        </button>
                    }
                    <button className="remove-from-wishes" onClick={removeFromWishes}>
                        <HeartBrokenSvg />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default ProductInWishes