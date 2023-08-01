import { Component } from "react"
import { BrowserRouter } from "react-router-dom"
import "./style/app.scss"
import Header from "./Header"
import ProductsSection from "./ProductsSection"
import Footer from "./Footer"

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loaded: false,
			lastYOffset: 0,
			headerOnTop: true,
			categories: ["all"],
			products: [],
			filters: {
				maxPrice: 1000,
				category: "all",
				search: ""
			},
			filteredProducts: [],
			cart: [],
			wishes: []
		}
	}

	componentDidMount() {
		this.loadData()
		window.addEventListener("scroll", e => this.setState({
			lastYOffset: e.currentTarget.pageYOffset,
			headerOnTop: e.currentTarget.pageYOffset < 50 || e.currentTarget.pageYOffset < this.state.lastYOffset
		}))
	}

	loadData = async () => {
		let cart = localStorage.getItem("cart") || "[]",
			wishes = localStorage.getItem("wishes") || "[]",
			categories = await fetch("https://fakestoreapi.com/products/categories")
				.then(data => data.json())
				.catch(error => {
					throw error
				}),
			products = await fetch("https://fakestoreapi.com/products")
				.then(data => data.json())
				.catch(error => {
					throw error
				})

		await this.setState({
			loaded: true,
			categories: ["all", ...categories],
			products: products,
			filteredProducts: this.filterProducts(this.state.filters, products),
			cart: JSON.parse(cart),
			wishes: JSON.parse(wishes)
		})
	}

	filterProducts = (filters, products = this.state.products) => {
		let filteredProducts = products.filter(e => (
			e.price < filters.maxPrice
			&& (filters.category === "all" || e.category === filters.category)
			&& (
				filters.search === ""
				|| e.title.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())
				|| e.description.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase())
			)
		))

		return filteredProducts
	}

	setFilter = (key, value) => {
		let newFilters = this.state.filters
		newFilters[key] = value

		this.setState({
			filteredProducts: this.filterProducts(newFilters),
			filters: newFilters
		})
	}

	getProduct = productId => {
		let product = this.state.products.find(e => e.id == productId)

		if (product === undefined) {
			product = {
				image: null,
				title: null,
				price: 0
			}
		}

		return product
	}

	addToCart = productId => {
		let i = this.state.cart.findIndex(e => e.id === productId),
			newCart = this.state.cart

		if (i < 0) {
			newCart.push({
				id: productId,
				quantity: 1
			})
		} else {
			newCart[i].quantity++
		}

		this.setState({ cart: newCart })

		this.saveData("cart", newCart)
	}

	removeFromCart = (productId, all = false) => {
		let i = this.state.cart.findIndex(e => e.id === productId)

		if (i >= 0) {
			let newCart = this.state.cart

			if (newCart[i].quantity < 2 || all) {
				newCart.splice(i, 1)
			} else {
				newCart[i].quantity--
			}

			this.setState({ cart: newCart })

			this.saveData("cart", newCart)
		}
	}

	toggleWishes = productId => {
		let i = this.state.wishes.findIndex(e => e === productId),
			newWishes = this.state.wishes

		if (i < 0) {
			newWishes.push(productId)
		} else {
			newWishes.splice(i, 1)
		}

		this.setState({ wishes: newWishes })
		this.saveData("wishes", newWishes)
	}

	saveData = (key, value) => localStorage.setItem(key, JSON.stringify(value))

	render() {
		return (
			<BrowserRouter>
				<Header
					loaded={this.state.loaded}
					headerOnTop={this.state.headerOnTop}
					cartData={this.state.cart}
					getProduct={this.getProduct}
					addToCart={this.addToCart}
					removeFromCart={this.removeFromCart}
					wishes={this.state.wishes}
					removeFromWishes={this.toggleWishes}
				/>
				<ProductsSection
					loaded={this.state.loaded}
					categories={this.state.categories}
					products={this.state.filteredProducts}
					setFilter={this.setFilter}
					maxPrice={this.state.filters.maxPrice}
					addToCart={this.addToCart}
					wishes={this.state.wishes}
					toggleWishes={this.toggleWishes}
				/>
				<Footer />
			</BrowserRouter>
		)
	}
}

export default App