import { useState } from "react"
import { Link } from "react-router-dom"
import ProductInCart from "./ProductInCart"
import ProductInWishes from "./ProductInWishes"
import CreditCardSvg from "./svg/CreditCardSvg"
import CartShoppingSvg from "./svg/CartShoppingSvg"
import FullHeartSvg from "./svg/FullHeartSvg"
import "./style/cart.scss"

function Cart({ cartState, setCartState, cartData, wishes, getProduct, addToCart, removeFromCart, removeFromWishes }) {
    let totalAmount = 0

    let products = cartData.map(e => {
        let productData = getProduct(e.id),
            quantity = parseInt(e.quantity)

        let subtotal = Number((productData.price * quantity).toFixed(2))

        totalAmount += subtotal

        return {
            ...productData,
            quantity: quantity,
            subtotal: subtotal
        }
    })

    totalAmount = Number(totalAmount.toFixed(2))

    let [mainTab, setTab] = useState(true)

    const closeCart = e => {
        if (e.target.classList.contains("cart-overlay")) {
            setCartState(false)
            setTab(true)
        }
    }

    return (
        <div className={"cart-overlay" + (cartState ? " active" : "")} onClick={e => closeCart(e)}>
            <div className="cart-main-container">
                <ul className="cart-menu">
                    <li>
                        <button className={mainTab ? "active" : ""} onClick={() => setTab(true)}>
                            <CartShoppingSvg />
                            <span className="text">Cart</span>
                        </button>
                    </li>
                    <li>
                        <button className={"wishes-button" + (mainTab ? "" : " active")} onClick={() => setTab(false)}>
                            <FullHeartSvg />
                            <span className="text">Wisheslist</span>
                        </button>
                    </li>
                </ul>
                <section className="tabs-container">
                    <div className={"cart-container" + (mainTab ? " active" : "")}>
                        <ul className="cart-list">
                            {
                                cartData.length > 0 ?
                                    cartData.map((e, i) => <ProductInCart
                                        key={"product-in-cart-" + e.id}
                                        data={products[i]}
                                        add={() => addToCart(e.id)}
                                        remove={() => removeFromCart(e.id)}
                                    />) :
                                    <h5 className="empty-warning">Cart is empty :(</h5>
                            }
                        </ul>
                        <h4 className="total-amount">Total: ${totalAmount}</h4>
                        <Link target="__blank" to="https://kevydev.github.io/portfolio/">
                            <button className="checkout-button">
                                <CreditCardSvg />
                                <span className="text">Checkout</span>
                            </button>
                        </Link>
                    </div>
                    <div className={"wishes-container" + (mainTab ? "" : " active")}>
                        <ul className="wishes-list">
                            {
                                wishes.length > 0 ?
                                    wishes.map(e => <ProductInWishes
                                        key={"product-in-wishes-" + e}
                                        data={getProduct(e)}
                                        isInCart={cartData.find(o => o.id === e) !== undefined}
                                        addToCart={() => addToCart(e)}
                                        removeFromWishes={() => removeFromWishes(e)}
                                    />) :
                                    <h5 className="empty-warning">Wisheslist is empty :(</h5>
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Cart