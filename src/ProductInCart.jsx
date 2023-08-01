import "./style/product-in-cart.scss"
import MinusSvg from "./svg/MinusSvg"
import PlusSvg from "./svg/PlusSvg"

function ProductInCart({ data, add, remove }) {
    return (
        <li className="product-in-cart">
            <div className="img-container"><img src={data.image} alt={data.title} loading="lazy" /></div>
            <div className="info-container">
                <h4>{data.title}</h4>
                <h5 className="price">${data.price}</h5>
                <h5 className="subtotal">Subtotal: ${data.subtotal}</h5>
                <div className="quantity-buttons-container">
                    <button className="decrease-quantity" onClick={remove}><MinusSvg /></button>
                    <h5 className="quantity">{data.quantity}</h5>
                    <button className="increase-quantity" onClick={add}><PlusSvg /></button>
                </div>
            </div>
        </li>
    )
}

export default ProductInCart