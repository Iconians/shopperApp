import React from "react";
import "./HomePage.css";
import ProductService from "../../services";
import CategoryPage from "../CategoryPage/CategoryPage";
import ItemComponent from "../ItemComponent/ItemComponent";
import ItemPage from "../ItemPage/ItemPage";
import AccountForms from "../AccountForms/AccountForms";

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
      selectedCategoryName: "",
      error: false,
      showCategoryPage: false,
      showItemPage: false,
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

  render() {
    const heading = ["hats", "shirts", "belts", "pants", "footwear"];
    const {
      products,
      loading,
      showCategoryPage,
      showItemPage,
      selectedProduct,
      selectedCategory,
      selectedCategoryName,
      cartItems,
      signin,
    } = this.state;
    return (
      <section>
        <div>
          <nav className="nav-bar">
            <div className="brand-name">
              <h3>Clothing Essentials</h3>
            </div>
            <div onClick={this.openAccountForm}>Login/Signup</div>
            <div>
              <ul className="nav-list">
                <li id="hats" onClick={this.openCategoryModal} key={1}>
                  HATS
                </li>
                <li id="shirts" onClick={this.openCategoryModal} key={2}>
                  SHIRTS
                </li>
                <li id="belts" onClick={this.openCategoryModal} key={3}>
                  BELTS
                </li>
                <li id="pants" onClick={this.openCategoryModal} key={4}>
                  PANTS
                </li>
                <li id="foot-wear" onClick={this.openCategoryModal} key={5}>
                  FOOT WEAR
                </li>
              </ul>
            </div>
            <div className="cart-container">
              <span className="cart-number">{cartItems.length}</span>
              <span>
                <img className="cart-icon" src="/cart.png" alt="" />
              </span>
            </div>
          </nav>
        </div>
        <div className="main-body">
          {heading.map((heading) => (
            <div className={`${heading}-title`}>
              <h2>{heading.toUpperCase()}</h2>
            </div>
          ))}
          {!loading ? (
            products.map((item) => (
              <div className={`${item.categories[0]}-container`}>
                {item.categories[1] === item ? (
                  <ItemComponent
                    img={item.img}
                    title={item.name}
                    price={item.price}
                    id={item.id}
                    openItemPage={this.openItemModal}
                    addToCart={this.addToCart}
                  />
                ) : null}
              </div>
            ))
          ) : (
            <div>...Loading</div>
          )}

          {/* <div className="hats">
            <div className="hat-title">
              <h2>HATS</h2>
            </div>
            <div className="hat-container">
              {!loading ? (
                products.map((item) =>
                  item.categories[0] === "hats" ? (
                    <ItemComponent
                      img={item.img}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      openItemPage={this.openItemModal}
                      addToCart={this.addToCart}
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div>
          </div>
          <div className="shirts">
            <div className="shirts-title">
              <h2>SHIRTS</h2>
            </div>
            <div className="shirts-container">
              {!loading ? (
                products.map((item) =>
                  item.categories[0] === "shirts" ? (
                    <ItemComponent
                      img={item.img}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      openItemPage={this.openItemModal}
                      addToCart={this.addToCart}
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div>
          </div>
          <div className="belts">
            <div className="belts-title">
              <h2>BELTS</h2>
            </div>
            <div className="belts-container">
              {!loading ? (
                products.map((item) =>
                  item.categories[0] === "belts" ? (
                    <ItemComponent
                      img={item.img}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      openItemPage={this.openItemModal}
                      addToCart={this.addToCart}
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div>
          </div>
          <div className="pants">
            <div className="pants-title">
              <h2>PANTS</h2>
            </div>
            <div className="pants-container">
              {!loading ? (
                products.map((item) =>
                  item.categories[0] === "pants" ? (
                    <ItemComponent
                      img={item.img}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      openItemPage={this.openItemModal}
                      addToCart={this.addToCart}
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div>
          </div>
          <div className="footwear">
            <div className="footwear-title">
              <h2>FOOT WEAR</h2>
            </div>
            <div className="footwear-container">
              {!loading ? (
                products.map((item) =>
                  item.categories[0] === "foot-wear" ? (
                    <ItemComponent
                      img={item.img}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      openItemPage={this.openItemModal}
                      addToCart={this.addToCart}
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div> */}
          {/* </div> */}
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
            />
          ) : null}
          {signin ? <AccountForms /> : null}
        </div>
        <footer>
          <a href="https://iconscout.com/icons/cart">Cart Icon</a> by{" "}
          <a href="https://iconscout.com/contributors/vaadin-icons">
            Vaadin Icons
          </a>{" "}
          on <a href="https://iconscout.com">IconScout</a>
        </footer>
      </section>
    );
  }
}

export default HomePage;
