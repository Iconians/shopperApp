import React from "react";
import "./HomePage.css";
import ProductService from "../../services";
import CategoryPage from "../CategoryPage/CategoryPage";
import ItemComponent from "../ItemComponent/ItemComponent";
import ItemPage from "../ItemPage/ItemPage";
import AccountForms from "../AccountForms/AccountForms";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartPage from "../CartPage/CartPage";

const products = new ProductService();
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: false,
      loading: false,
      products: [],
      selectedProduct: [],
      selectedCategory: [],
      cartItems: [],
      searchResults: [],
      selectedCategoryName: "",
      error: false,
      showCategoryPage: false,
      showItemPage: false,
      numberOfCartItems: 0,
      index: 0,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    products.fetchProducts().then(
      (res) => {
        if (res && res.response.ok) {
          this.setState({
            products: res.products,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
        });
      }
    );
  }

  updatCartIcon = (qty) => {
    const { cartItems } = this.state;
    let newQty = 0;
    const updatedNum = cartItems.map((product) => product.qty + newQty);
    // console.log(cartItems, updatedNum);
    this.setState({
      numberOfCartItems: updatedNum.reduce((accum, val) => accum + val, qty),
    });
  };

  updatProductQty = ({ target: { name, value, id } }) => {
    const { products, cartItems } = this.state;
    if (name === "productQty") {
      const findProduct = products.filter((product) => product.id === id);
      parseInt(value) === 0
        ? (findProduct[0].qty = parseInt(value) + 1)
        : (findProduct[0].qty = parseInt(value));
    } else {
      const findProduct = cartItems.filter((product) => product.id === id);
      const findProductInProducts = products.filter(
        (product) => product.id === id
      );
      findProduct[0].qty = parseInt(value);
      if (parseInt(value) === 0) {
        findProductInProducts[0].qty = parseInt(value) + 1;
      }
      this.updatCartIcon(0);
      if (parseInt(value) === 0) {
        this.removeFromCart(id);
      }
    }
  };

  addToCart = ({ target: { id } }) => {
    const { products, cartItems } = this.state;
    const findIndex = products.findIndex((product) => product.id === id);
    const selectedProduct = products.slice(findIndex, findIndex + 1);
    const addToCurrentArr = selectedProduct.concat(cartItems);
    const quantity = cartItems.some((item) => item.id === id);
    if (!quantity) {
      this.setState({
        cartItems: addToCurrentArr,
      });
    } else {
      const updateProduct = cartItems.map((product) => {
        if (product.id === id) {
          const newQty = product.qty + 1;
          return { ...product, qty: newQty };
        }
        return product;
      });
      this.setState({
        cartItems: updateProduct,
      });
    }
    this.updatCartIcon(selectedProduct[0].qty);
  };

  removeFromCart = (id) => {
    const { cartItems } = this.state;
    let newCartList = cartItems.filter((product) => product.id !== id);
    this.setState({
      cartItems: newCartList,
    });
    console.log(newCartList, cartItems);
    this.updatCartIcon(-1);
  };

  removeFromCartFaClose = ({ target: { id } }) => {
    const { cartItems } = this.state;
    let newCartList = cartItems.filter((product) => product.id !== id);
    this.setState({
      cartItems: cartItems === 1 ? [] : newCartList,
    });
    this.updatCartIcon(-1);
  };

  searchProducts = ({ target: { value } }) => {
    const { products } = this.state;
    const results = products.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    this.setState({
      searchResults: results,
    });
  };

  openAccountForm = () => {
    this.setState({
      signin: true,
    });
  };

  openItemModal = ({ target: { id } }) => {
    const { products } = this.state;
    const productItem = products.filter((product) => product.id === id);
    this.setState({
      selectedProduct: productItem,
      showItemPage: true,
    });
  };

  handleItmeModalClose = () => {
    this.setState({ showItemPage: false });
  };

  openCategoryModal = ({ target: { id } }) => {
    const { products } = this.state;
    const productItem = products.filter(
      (product) => product.categories[0] === id
    );
    this.setState({
      selectedCategory: productItem,
      selectedCategoryName: id.toUpperCase(),
      showCategoryPage: true,
    });
  };

  handleCategoryModalClose = () => {
    this.setState({ showCategoryPage: false });
  };

  openCartPage = () => {
    this.setState({ index: 1 });
  };

  closeCartPage = () => {
    this.setState({ index: 0 });
  };

  render() {
    const navHeadings = [
      {
        heading: "HATS",
        key: 1,
      },
      {
        heading: "SHIRTS",
        key: 2,
      },
      { heading: "BELTS", key: 3 },
      { heading: "PANTS", key: 4 },
      { heading: "FOOT WEAR", key: 5 },
    ];
    const {
      products,
      loading,
      showCategoryPage,
      showItemPage,
      selectedProduct,
      selectedCategory,
      selectedCategoryName,
      numberOfCartItems,
      cartItems,
      signin,
      index,
      searchResults,
    } = this.state;
    return (
      <section>
        <div>
          <nav className="nav-bar">
            <div className="brand-name">
              <h3>Clothing Essentials</h3>
            </div>
            <div className="search-div">
              <input
                type="text"
                placeholder="Search"
                onChange={this.searchProducts}
              />
            </div>
            <div onClick={this.openAccountForm}>Login/Signup</div>
            <div>
              <ul className="nav-list">
                {navHeadings.map((heading) => (
                  <li
                    id={heading.heading.toLowerCase().replace(" ", "-")}
                    onClick={this.openCategoryModal}
                    key={heading.key}
                  >
                    {heading.heading}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart-container" onClick={this.openCartPage}>
              <span className="cart-number">{numberOfCartItems}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="cart-icon"
                  />
                }
              </span>
            </div>
          </nav>
        </div>
        {index === 0 ? (
          <div className="main-body">
            {!loading ? (
              searchResults[0] ? (
                searchResults.map((item) => (
                  <div className={`${item.categories[0]}-container`}>
                    {
                      <ItemComponent
                        img={item.img}
                        title={item.name}
                        price={item.price}
                        id={item.id}
                        openItemPage={this.openItemModal}
                        addToCart={this.addToCart}
                      />
                    }
                  </div>
                ))
              ) : (
                products.map((item) => (
                  <div className={`${item.categories[0]}-container`}>
                    {
                      <ItemComponent
                        img={item.img}
                        title={item.name}
                        price={item.price}
                        id={item.id}
                        openItemPage={this.openItemModal}
                        addToCart={this.addToCart}
                      />
                    }
                  </div>
                ))
              )
            ) : (
              <div className="loading-div">...Loading</div>
            )}
          </div>
        ) : null}

        {index === 1 ? (
          <CartPage
            products={cartItems}
            closeCartPage={this.closeCartPage}
            openItemPage={this.openItemModal}
            updateQty={this.updatProductQty}
            removeFromCart={this.removeFromCartFaClose}
          />
        ) : null}
        {showCategoryPage ? (
          <CategoryPage
            products={selectedCategory}
            showCategoryPage={showCategoryPage}
            handleClose={this.handleCategoryModalClose}
            openItemModal={this.openItemModal}
            title={selectedCategoryName}
            addToCart={this.addToCart}
          />
        ) : null}
        {showItemPage ? (
          <ItemPage
            product={selectedProduct}
            showItemPage={showItemPage}
            handleClose={this.handleItmeModalClose}
            addToCart={this.addToCart}
            updateQty={this.updatProductQty}
          />
        ) : null}
        {signin ? <AccountForms /> : null}
      </section>
    );
  }
}

export default HomePage;
