import React from "react";
import "./HomePage.css";
import ProductService from "../../services";
import CategoryPage from "../CategoryPage/CategoryPage";
import ItemComponent from "../ItemComponent/ItemComponent";
import ItemPage from "../ItemPage/ItemPage";

const products = new ProductService();
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      selectedProduct: [],
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

  openItemModal = ({ target: { id } }) => {
    const { products } = this.state;
    const productItem = products.filter((product) => product.id === id);
    console.log(productItem, id);
    this.setState({
      selectedProduct: productItem,
      showItemPage: true,
    });
  };

  render() {
    console.log(this.state.selectedProduct);
    const {
      products,
      loading,
      showCategoryPage,
      showItemPage,
      selectedProduct,
    } = this.state;
    return (
      <section>
        <div>
          <nav>
            <div>
              <ul>
                <li key={1}>Hats</li>
                <li key={2}>Shirts</li>
                <li key={3}>belts</li>
                <li key={4}>pants</li>
                <li key={5}>Footwear</li>
              </ul>
            </div>
            <div>
              <span>0</span>
              <span>img</span>
            </div>
          </nav>
        </div>
        <div className="main-body">
          <div className="specials">
            <div className="specials-title">
              <h2>Specials</h2>
            </div>
            <div className="specials-container">
              {!loading ? (
                products.map((item) =>
                  item.categories[1] === "specials" ? (
                    <ItemComponent
                      img={item.img}
                      title={item.name}
                      price={item.price}
                      id={item.id}
                      openItemPage={this.openItemModal}
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div>
          </div>
          <div className="hats">
            <div className="hat-title">
              <h2>Hats</h2>
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
              <h2>Shirts</h2>
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
              <h2>Belts</h2>
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
              <h2>Pants</h2>
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
              <h2>Footwear</h2>
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
                    />
                  ) : null
                )
              ) : (
                <div>...Loading</div>
              )}
            </div>
          </div>
          {showCategoryPage ? <CategoryPage /> : null}
          {showItemPage ? (
            <ItemPage
              selectedproduct={selectedProduct}
              showItemPage={showItemPage}
            />
          ) : null}
        </div>
      </section>
    );
  }
}

export default HomePage;
