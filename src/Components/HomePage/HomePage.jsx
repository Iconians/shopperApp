import React from "react";
import ProductService from "../../services";
import CategoryPage from "../CategoryPage/CategoryPage";

const products = new ProductService();
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      error: false,
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

  render() {
    const categoryTitles = ["hats", "shirts", "belts", "pants", "footwear"];
    const { products } = this.state;
    return (
      <section>
        <div>
          <nav>
            <div>
              <ul>
                <li>Hats</li>
                <li>Shirts</li>
                <li>belts</li>
                <li>pants</li>
                <li>Footwear</li>
              </ul>
            </div>
            <div>
              <span>0</span>
              <span>img</span>
            </div>
          </nav>
        </div>
        <div className="specials"></div>
        <div className="main-body">
          {categoryTitles.map((item) => (
            <div id={item} className={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default HomePage;
