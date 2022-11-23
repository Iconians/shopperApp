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
import {
  emailValidation,
  passwordValidation,
  onlyTextValidation,
  onlyNumberValidation,
  cardNumberValidation,
  securityCodeValidation,
} from "../../validations";
import { AMERICANEXPRESS, OTHERCARDS } from "../../constants";
import ShippingComponent from "../ShippingComponent/ShippingComponent";
import ShippingPage from "../ShippingPage/ShippingPage";

const INIT_FORM = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  surName: "",
  postal: "",
};

const SIGN_IN_FORM = {
  email: "",
  password: "",
};

const products = new ProductService();
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: INIT_FORM,
      signInFormData: SIGN_IN_FORM,
      signinForm: false,
      createAccForm: true,
      loading: false,
      products: [],
      selectedProduct: [],
      selectedCategory: [],
      cartItems: [],
      searchResults: [],
      accounts: {},
      formError: {},
      shippingPageErrors: {},
      selectedCategoryName: "",
      error: false,
      showCategoryPage: false,
      showItemPage: false,
      numberOfCartItems: 0,
      index: 0,
      subTotal: 0,
      discounts: 0,
      discountCodes: {
        fiveoff: 5,
        twentyoff: 20,
        fiftyoff: 50,
      },
      shipping: {
        shippingCost: 0,
        shippingTitle: "Standard",
        shippingDescription: "Delivery in 4-6 Business Days",
      },
      cartTotal: 0,
      forms: false,
      isLoggedIn: false,
      firstName: "",
      taxRate: 0.09,
      taxes: 0,
      shippingPrice: 0,
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
    this.updateSummaryDetails(selectedProduct, 1);
  };

  removeFromCart = (id) => {
    const { cartItems } = this.state;
    let newCartList = cartItems.filter((product) => product.id !== id);
    const deletedItem = cartItems.filter((product) => product.id === id);
    this.setState({
      cartItems: newCartList,
    });
    if (newCartList.length === 0) {
      this.updateSummaryDetails([{ price2: 0, qty: 0 }]);
    } else {
      this.updateSummaryDetails(deletedItem, 0);
    }
    this.updatCartIcon(-1);
  };

  removeFromCartFaClose = ({ target: { id } }) => {
    const { cartItems } = this.state;
    const newCartList = cartItems.filter((product) => product.id !== id);
    const deletedItem = cartItems.filter((product) => product.id === id);
    this.setState({
      cartItems: cartItems === 1 ? [] : newCartList,
    });
    if (newCartList.length === 0) {
      this.updateSummaryDetails([{ price2: 0, qty: 0 }]);
    } else {
      this.updateSummaryDetails(deletedItem, 0);
    }
    this.updatCartIcon(-1);
  };

  updateSummaryDetails = (products, num) => {
    const { subTotal, taxRate } = this.state;
    let sum = 0;
    const newItemPrice = products.map((product) => {
      const findCost = product.price2 * product.qty;
      return (sum = findCost);
    });
    if (num === 1) {
      const total = subTotal + newItemPrice[0];
      const findTaxes = total * taxRate;
      const addtaxes = findTaxes + total;
      this.setState({
        subTotal: parseFloat(total.toFixed(2)),
        taxes: findTaxes.toFixed(2),
        cartTotal: addtaxes.toFixed(2),
      });
    } else {
      const total = subTotal - newItemPrice[0];
      const findTaxes = total * taxRate;
      const addtaxes = findTaxes + total;
      this.setState({
        subTotal: sum === 0 ? sum : parseFloat(total.toFixed(2)),
        taxes: findTaxes,
        cartTotal: addtaxes.toFixed(2),
      });
    }
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

  applydiscount = (code) => {
    let codeValue = 0;
    const { discountCodes, subTotal } = this.state;
    Object.keys(discountCodes).forEach((val) => {
      if (val === code) {
        this.setState({ discounts: discountCodes[val] });
        codeValue = discountCodes[val];
      }
      console.log(codeValue);
    });
    this.updateTotal(subTotal, 0, codeValue);
  };

  updateTotal = (subtotal, price, codeValue) => {
    const { discounts } = this.state;
    let sum = 0;
    if (codeValue === 0) {
      let interger1 = Math.max(subtotal - discounts);
      let total = Math.max(interger1 + price);
      sum = total;
    } else {
      let interger1 = Math.max(subtotal - codeValue);
      let total = Math.max(interger1 + price);
      sum = total;
    }
    this.setState({
      cartTotal: sum.toFixed(2),
    });
  };

  switchForm = ({ target: { value } }) => {
    const signIn = value;
    if (signIn === "true") {
      this.setState({
        signInForm: true,
        createAccForm: false,
      });
    } else {
      this.setState({
        signInForm: false,
        createAccForm: true,
      });
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    const { signInForm } = this.state;
    signInForm
      ? this.setState((prevState) => ({
          signInFormData: {
            ...prevState.signInFormData,
            [name]: value,
          },
        }))
      : this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            [name]: value,
          },
        }));
  };

  confirmPasswordValidation = (value) => {
    const password = this.state.formData.password;
    if (value) {
      if (value === `${password}`) {
        return "";
      } else {
        return "passwords don't match";
      }
    } else {
      return undefined;
    }
  };

  handleValidations = (name, value) => {
    const validations = {
      email: (value) => emailValidation(value),
      password: (value) => passwordValidation(value),
      confirmPassword: (value) => this.confirmPasswordValidation(value),
      firstName: (value) => onlyTextValidation(value),
      surName: (value) => onlyTextValidation(value),
      postal: (value) => onlyNumberValidation(value),
    };

    let setValidations = validations[name](value);
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [`${name}Error`]: setValidations,
      },
    }));
  };

  checkErrors = () => {
    const {
      index,
      shippingData,
      shippingPageError,
      paymentPageError,
      paymentData,
      shipping,
    } = this.state;
    let errorValue = {};
    let isError = false;
    if (index === 2) {
      Object.keys(shippingData).forEach((val) => {
        if (!shippingData[val].length) {
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
          isError = true;
        }
      });
      Object.keys(shippingPageError).forEach((val) => {
        if (shippingPageError[val].length) {
          errorValue = { ...errorValue, [`${val}`]: "Required" };
          isError = true;
        }
      });
      if (!shipping.shippingTitle.length) {
        errorValue = { ...errorValue, shippingOptionError: "Required" };
        isError = true;
      }
      this.setState({ shippingPageError: errorValue });
    } else if (index === 3) {
      Object.keys(paymentData).forEach((val) => {
        if (!paymentData[val].length) {
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
          isError = true;
        }
      });
      Object.keys(paymentPageError).forEach((val) => {
        if (paymentPageError[val].length) {
          errorValue = { ...errorValue, [`${val}`]: "Required" };
          isError = true;
        }
      });
      this.setState({ paymentPageError: errorValue });
    }
    return isError;
  };

  handleBlur = ({ target: { name, value } }) =>
    this.handleValidations(name, value);

  checkErrorBeforeSave = () => {
    const { formData, formError, accounts } = this.state;
    let errorValue = {};
    let isError = false;
    let data = accounts;
    let keys = Object.keys(data);
    Object.keys(formData).forEach((val) => {
      if (!formData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });
    Object.keys(formError).forEach((val) => {
      if (formError[val].length) {
        errorValue = { ...errorValue, [`${val}`]: "Required" };
        isError = true;
      }
    });
    keys.forEach((key) => {
      let values = accounts[key];
      if (formData.email === values.email) {
        errorValue = {
          ...errorValue,
          emailError: "There is already an account with this email",
        };
        isError = true;
      }
    });
    this.setState({ formError: errorValue });
    return isError;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const checkErrors = this.checkErrorBeforeSave();
    if (!checkErrors) {
      this.setState((prevState) => ({
        accounts: {
          ...prevState.accounts,
          [`${formData.firstName}account`]: formData,
        },
        formData: INIT_FORM,
        firstName: formData.firstName,
        isLoggedIn: true,
        forms: false,
      }));
    }
  };

  checkErrorsBeforeSignIn = () => {
    const { signInFormData, accounts } = this.state;
    let errorValue = {};
    let isError = false;
    let data = accounts;
    let keys = Object.keys(data);
    if (keys.length) {
      keys.forEach((key) => {
        let values = accounts[key];
        if (
          signInFormData.email === values.email &&
          signInFormData.password === values.password
        ) {
        } else {
          errorValue = {
            ...errorValue,
            emailError: "No account with this email",
          };
          isError = true;
        }
      });
    } else {
      errorValue = { ...errorValue, emailError: "No account with this email" };
      isError = true;
    }
    this.setState({ formError: errorValue });
    return isError;
  };

  handleSignIn = (e) => {
    const { signInFormData, accounts } = this.state;
    e.preventDefault();
    const checkErrors = this.checkErrorsBeforeSignIn();
    if (!checkErrors) {
      let data = accounts;
      let keys = Object.keys(data);
      keys.forEach((key) => {
        let values = accounts[key];
        if (signInFormData.email === values.email) {
          this.setState({
            firstName: values.firstName,
            isLoggedIn: true,
            forms: false,
          });
        }
      });
    }
  };

  signOut = () => {
    this.setState({
      isLoggedIn: false,
    });
  };

  expressShipping = ({ target: { name } }) => {
    const { subTotal } = this.state;
    this.handleValidations(name);
    this.setState({
      shipping: {
        shippingCost: 5,
        shippingTitle: "Express",
        shippingDescription: "Delivery in 1-3 Business Days",
      },
    });
    this.updateTotal(subTotal, 5, 0);
  };

  standardShipping = ({ target: { name } }) => {
    const { subTotal } = this.state;
    this.handleValidations(name);
    if (subTotal >= 40) {
      this.setState({
        shipping: {
          shippingCost: 0,
          shippingTitle: "Standard",
          shippingDescription: "Delivery in 4-6 Business Days",
        },
      });
      this.updateTotal(subTotal, 0, 0);
    } else if (subTotal < 40) {
      this.setState({
        shipping: {
          shippingCost: 10,
          shippingTitle: "Standard",
          shippingDescription: "Delivery in 4-6 Business Days",
        },
      });
      this.updateTotal(subTotal, 10, 0);
    }
  };

  openAccountForm = () => {
    this.setState({
      forms: true,
    });
  };

  closeAccountForm = () => {
    this.setState({
      forms: false,
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

  nextPage = () => {
    const { index, cartTotal } = this.state;
    const checkErrors = this.checkErrors();
    if (index === 1) {
      if (cartTotal === 0) {
        this.setState({ cartPageError: true });
      } else {
        this.setState({ index: 2 });
      }
    } else if (index === 2) {
      if (!checkErrors) {
        this.setState({ index: 3 });
        this.paymentFieldsFilledOut();
      }
    } else if (index === 3) {
      if (!checkErrors) {
        this.setState({
          index: 4,
        });
      }
    }
  };

  backPage = () => {
    const { index } = this.state;
    if (index === 2) {
      this.setState({ cartIndex: 1 });
    } else if (index === 3) {
      this.setState({
        cartIndex: 2,
        // disableBtn: false,
      });
    }
    // else {
    //   this.setState({
    //     cartIndex: 0,
    //     cartData: INIT_CARTDATA,
    //     subTotal: 0,
    //     total: 0,
    //     discounts: 0,
    //     cardType: "",
    //     shipping: {
    //       shippingCost: 0,
    //       shippingTitle: "",
    //       ShippingDescription: "",
    //     },
    //     paymentData: {
    //       cardName: "",
    //       cardNumber: "",
    //       cardMonth: "",
    //       cardYear: "",
    //       cardCvv: "",
    //     },
    //   });
    // }
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
      forms,
      index,
      searchResults,
      subTotal,
      discounts,
      discountCodes,
      cartTotal,
      signInForm,
      createAccForm,
      formData,
      signInFormData,
      isLoggedIn,
      firstName,
      taxes,
      shippingPrice,
      shippingPageErrors,
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
            {isLoggedIn ? (
              <div>
                <select name="loggedInName" id="" onChange={this.signOut}>
                  <option value="loggedIn">{`Welcome ${firstName}`}</option>
                  <option value="logOut">Log out</option>
                </select>
              </div>
            ) : (
              <div onClick={this.openAccountForm}>Login/Signup</div>
            )}
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
            index={index}
            subTotal={subTotal}
            discount={discounts}
            discountCodes={this.applydiscount}
            cartTotal={cartTotal}
            tax={taxes}
            shipping={shippingPrice}
            cartItems={cartItems}
            next={this.nextPage}
          />
        ) : null}
        {index === 2 ? (
          <ShippingPage
            index={index}
            handleInputChange={this.handleInputChange}
            expressShipping={this.expressShipping}
            standardShipping={this.standardShipping}
            errorMsg={shippingPageErrors}
            subTotal={subTotal}
            discount={discounts}
            discountCodes={this.applydiscount}
            cartTotal={cartTotal}
            tax={taxes}
            shipping={shippingPrice}
            next={this.nextPage}
            cartItems={cartItems}
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
        {forms ? (
          <AccountForms
            forms={forms}
            closeAccForm={this.closeAccountForm}
            signIn={signInForm}
            createAcc={createAccForm}
            signInFormData={signInFormData}
            formData={formData}
            switchForm={this.switchForm}
            handleInputChange={this.handleInputChange}
            handleBlur={this.handleBlur}
            handleSignIn={this.handleSignIn}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </section>
    );
  }
}

export default HomePage;
