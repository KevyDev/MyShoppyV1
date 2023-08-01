import Product from "./Product"
import SpinnerSvg from "./svg/SpinnerSvg"
import "./style/products-section.scss"

function ProductsSection({ loaded, categories, products, setFilter, maxPrice, addToCart, wishes, toggleWishes }) {
    return (
        <section className="products-section">
            <form className="filters-container" action="/" method="POST">
                <div className="search-container">
                    <label htmlFor="search">Search</label>
                    <input type="search" name="search" id="search" placeholder="Type..." onChange={e => setFilter("search", e.target.value.toString().trim())} />
                </div>

                <div className="price-container">
                    <label htmlFor="price">Max price</label>
                    <input type="range" name="price" id="price" min="0" max="1000" value={maxPrice} step="10" onChange={e => setFilter("maxPrice", e.target.value)} />
                    <span>${maxPrice}</span>
                </div>

                <div className="category-container">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" onChange={e => setFilter("category", e.target.value)}>
                        {categories.map(e => <option key={"category-" + e} value={e}>{e}</option>)}
                    </select>
                </div>
            </form>
            <ul className={"products-container" + (!loaded || products.length === 0 ? " flex" : "")}>
                {
                    loaded ?
                        (
                            products.length > 0 ?
                                products.map(e => <Product
                                    key={"product-" + e.id}
                                    data={e}
                                    addToCart={() => addToCart(e.id)}
                                    isInWishes={wishes.find(o => o === e.id) !== undefined}
                                    toggleWishes={() => toggleWishes(e.id)}
                                />) :
                                <h5 className="empty-warning">No products :(</h5>
                        ) :
                        <div className="loading-spinner"><SpinnerSvg /></div>
                }
            </ul>
        </section >
    )
}

export default ProductsSection