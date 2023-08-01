import { useState } from "react"
import CartShoppingSvg from "./svg/CartShoppingSvg.jsx"
import EmptyHeartSvg from "./svg/EmptyHeartSvg.jsx"
import FullHeartSvg from "./svg/FullHeartSvg.jsx"
import "./style/product.scss"

function Product({ data, isInWishes, addToCart, toggleWishes }) {
    let [newUnits, setUnits] = useState(0),
        [timer, setTimer] = useState(null)

    const newUnit = () => {
        addToCart()

        setUnits(newUnits + 1)

        newUnits > 0 && clearTimeout(timer)

        setTimer(setTimeout(() => setUnits(0), 2000))
    }

    return (
        <li className="product-container">
            <div className="img-container">
                <img src={data.image} alt={data.title} loading="lazy" />
            </div>
            <h4 className="title">{data.title}</h4>
            <h5 className="price">${data.price}</h5>
            <div className="buttons-container">
                <button className={"wishes-button" + (isInWishes ? " active" : "")} onClick={() => toggleWishes()}>
                    {
                        isInWishes ? <FullHeartSvg /> : <EmptyHeartSvg />
                    }
                </button>
                <button className="cart-button" onClick={newUnit}>
                    <CartShoppingSvg />
                    <span className="text">Add to cart</span>
                    <span className={"new-units" + (newUnits > 0 ? " active" : "")}>+{newUnits}</span>
                </button>
            </div>
        </li >
    )
}

export default Product