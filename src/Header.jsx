import { useState } from "react"
import Cart from "./Cart"
import CartShoppingSvg from "./svg/CartShoppingSvg"
import "./style/header.scss"

function Header({ loaded, headerOnTop, cartData, wishes, getProduct, addToCart, removeFromCart, removeFromWishes }) {
    let [cartState, setCartState] = useState(false)

    return (
        <>
            <header className={headerOnTop ? "on-top" : ""}>
                <div className="header-container">
                    <div className="logo">MyShoppy</div>
                    <button className="cart-button" onClick={() => loaded && setCartState(true)}>
                        <CartShoppingSvg />
                    </button>
                </div>
            </header>
            <Cart
                cartState={cartState}
                setCartState={setCartState}
                cartData={cartData}
                wishes={wishes}
                getProduct={getProduct}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeFromWishes={removeFromWishes}
            />
        </>
    )
}

export default Header