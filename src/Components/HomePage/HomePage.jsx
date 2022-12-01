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
      signInForm: true,
      createAccForm: false,
      loading: false,
      products: [],
      selectedProduct: [],
      selectedCategory: [],
      cartItems: [],
      searchResults: [],
      quantity: [],
      formError: {},
      shippingPageError: {},
      paymentPageError: {},
      selectedCategoryName: "",
      error: false,
      loadingErrorMsg: "",
      showCategoryPage: false,
      showItemPage: false,
      numberOfCartItems: 0,
      index: 0,
      subTotal: 0,
      discounts: 0,
      cartTotal: 0,
      forms: false,
      isLoggedIn: false,
      firstName: "",
      taxRate: 0.09,
      taxes: 0,
      disableBtn: true,
      cardType: "",
      maxLength: OTHERCARDS.length,
      cartPageError: true,
      inventoryError: false,
      accounts: {
        testAccount: {
          confirmPassword: "T@st1970",
          email: "test@test.com",
          firstName: "firstName",
          password: "T@st1970",
          postal: "95674",
          surName: "sureName",
        },
      },
      discountCodes: {
        fiveoff: 5,
        twentyoff: 20,
        fiftyoff: 50,
      },
      shipping: {
        shippingCost: 0,
        shippingTitle: "",
        shippingDescription: "",
      },
      shippingData: {
        addressTitle: "",
        name: "",
        address: "",
        zip: "",
        country: "",
        city: "",
        state: "",
        cellAreaCode: "",
        cellNum: "",
        phoneAreaCode: "",
        phoneNum: "",
      },
      paymentData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
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

  disableBtn = (array) => {
    const { index } = this.state;
    if (array.length === 0) {
      this.setState({ disableBtn: true });
    } else if (index === 6 && array.length === 5) {
      this.setState({ disableBtn: false });
    }
  };

  updatCartIcon = (qty) => {
    const { cartItems } = this.state;
    let newQty = 0;
    const updatedNum = cartItems.map((product) => product.qty + newQty);
    this.setState({
      numberOfCartItems: updatedNum.reduce((accum, val) => accum + val, qty),
    });
  };

  updatProductQty = ({ target: { name, value, id } }) => {
    const { products, cartItems, quantity } = this.state;
    const findProduct = products.filter((product) => product.id === id);
    const findCartProduct = cartItems.filter((product) => product.id === id);
    const productsInventoryLimit = findProduct[0].inventory >= parseInt(value);
    const ProductsNotOutOfStock = findProduct[0].inventory > 0;
    const CartInventoryLimit = findProduct[0].inventory >= parseInt(value);
    const CartNotOutOfStock = findCartProduct.length
      ? findCartProduct[0].inventory > 0
      : null;
    if (
      name === "productQty" &&
      productsInventoryLimit &&
      ProductsNotOutOfStock
    ) {
      parseInt(value) === 0
        ? (findProduct[0].qty = parseInt(value) + 1)
        : (findProduct[0].qty = parseInt(value));
      this.setState({ inventoryError: false });
    } else if (CartInventoryLimit && CartNotOutOfStock) {
      console.log("if else");
      const findProductInProducts = products.filter(
        (product) => product.id === id
      );
      findCartProduct[0].qty = parseInt(value);
      if (parseInt(value) === 0) {
        findProductInProducts[0].qty = parseInt(value) + 1;
      }
      this.setState({ inventoryError: false });
      this.updatCartIcon(0);
      if (parseInt(value) === 0) {
        this.removeFromCart(id);
      }
    } else {
      if (name === "productQty") {
        const isInQuantity = quantity.filter(
          (product) => product.id === findProduct[0].id
        );
        if (!isInQuantity.length) {
          this.setState((prevState) => ({
            quantity: [
              ...prevState.quantity,
              { id: findProduct[0].id, value: findProduct[0].inventory },
            ],
            inventoryError: true,
          }));
        } else {
          this.setState({ inventoryError: true });
        }
      } else {
        const isInQuantity = quantity.filter(
          (product) => product.id === findProduct[0].id
        );
        if (!isInQuantity.length) {
          this.setState((prevState) => ({
            quantity: [
              ...prevState.quantity,
              { id: findProduct[0].id, value: findProduct[0].inventory },
            ],
            inventoryError: true,
          }));
        } else {
          this.setState({ inventoryError: true });
        }
      }
    }
    if (
      !productsInventoryLimit &&
      !ProductsNotOutOfStock &&
      !CartInventoryLimit &&
      !CartNotOutOfStock
    ) {
      this.setState({ addToCartError: true });
    }
  };

  addToCart = ({ target: { id } }) => {
    const { products, cartItems, quantity } = this.state;
    const findIndex = products.findIndex((product) => product.id === id);
    const selectedProduct = products.slice(findIndex, findIndex + 1);
    const addToCurrentArr = selectedProduct.concat(cartItems);
    const cartQuantity = cartItems.some((item) => item.id === id);
    const selectedCartProduct = cartItems.length
      ? cartItems.filter((product) => product.id === id)
      : [{ qty: 1 }];
    const inventoryLimit = selectedCartProduct.length
      ? selectedProduct[0].inventory === selectedCartProduct[0].qty
      : true;
    const notOutOfStock = selectedProduct[0].inventory > 0;
    if (!cartQuantity && notOutOfStock) {
      this.setState({
        cartItems: addToCurrentArr,
        cartPageError: false,
        disableBtn: false,
      });
      this.updatCartIcon(selectedProduct[0].qty);
      this.updateSummaryDetails(selectedProduct, 1);
    } else if (cartQuantity && notOutOfStock && !inventoryLimit) {
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
      this.updatCartIcon(selectedProduct[0].qty);
      this.updateSummaryDetails(selectedProduct, 1);
    } else {
      const isInQuantity = quantity.filter(
        (product) => product.id === selectedProduct[0].id
      );
      if (!isInQuantity.length) {
        this.setState((prevState) => ({
          quantity: [
            ...prevState.quantity,
            {
              id: addToCurrentArr[0].id,
              value: addToCurrentArr[0].inventory,
              reqVal: 1,
            },
          ],
          inventoryError: true,
        }));
      } else {
        this.setState({ inventoryError: true });
      }
    }
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
    console.log(id, newCartList, cartItems);
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
    const { discounts, taxes } = this.state;
    let sum = 0;
    if (codeValue === 0) {
      let interger1 = Math.max(subtotal - discounts);
      let total = Math.max(interger1 + price + Number.parseFloat(taxes));
      sum = total;
    } else {
      let interger1 = Math.max(subtotal - codeValue);
      let total = Math.max(interger1 + price + Number.parseFloat(taxes));
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

  formHandleInputChange = ({ target: { name, value } }) => {
    console.log(name, value);
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

  handleInputChange = ({ target: { name, value } }) => {
    const { index } = this.state;
    this.shippingHandleValidations(name, value);
    if (index === 5) {
      this.setState((prevState) => ({
        shippingData: {
          ...prevState.shippingData,
          [name]: value,
        },
      }));
    } else if (name === "cardNumber") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          paymentData: {
            ...prevState.paymentData,
            [name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          paymentData: {
            ...prevState.paymentData,
            [name]: "",
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        paymentData: {
          ...prevState.paymentData,
          [name]: value,
        },
      }));
    }
  };

  paymentFieldsFilledOut = () => {
    const { paymentData } = this.state;
    let array = [];
    Object.values(paymentData).forEach((val) => {
      if (val === "") {
        return false;
      } else {
        array.push(1);
      }
    });
    if (array.length === 0 || array.length === 5) {
      this.disableBtn(array);
    }
  };

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  cardLength = (cardType) => {
    if (cardType === "AMERICAN_EXPRESS") {
      return AMERICANEXPRESS.length;
    } else {
      return OTHERCARDS.length;
    }
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
      formError: {
        ...prevState.formError,
        [`${name}Error`]: setValidations,
      },
    }));
  };

  shippingHandleValidations = (name, value) => {
    const { index } = this.state;
    if (index === 5) {
      const shippingValidations = {
        addressTitle: (value) => onlyTextValidation(value),
        name: (value) => onlyTextValidation(value),
        address: () => "",
        zip: (value) => onlyNumberValidation(value),
        country: () => "",
        city: () => "",
        state: () => "",
        cellAreaCode: (value) => onlyNumberValidation(value),
        cellNum: (value) => onlyNumberValidation(value),
        phoneAreaCode: (value) => onlyNumberValidation(value),
        phoneNum: (value) => onlyNumberValidation(value),
        shippingOption: () => "",
      };

      let shippingErrortext = shippingValidations[name](value);
      this.setState((prevState) => ({
        shippingPageError: {
          ...prevState.shippingPageError,
          [`${name}Error`]: shippingErrortext,
        },
      }));
    } else {
      const paymentValidations = {
        cardName: (value) => onlyTextValidation(value),
        cardNumber: (value) => cardNumberValidation(value),
        cardMonth: () => "",
        cardYear: () => "",
        cardCvv: (value) =>
          securityCodeValidation(3, value) || onlyNumberValidation(value),
      };

      if (name === "cardNumber") {
        const card = this.findDebitCardType(value);
        const length = this.cardLength(card);
        this.setState({
          cardType: card,
          maxLength: length,
        });
      }
      let paymentErrortext = paymentValidations[name](value);
      this.paymentFieldsFilledOut();
      this.setState((prevState) => ({
        paymentPageError: {
          ...prevState.paymentPageError,
          [`${name}Error`]: paymentErrortext,
        },
      }));
    }
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
    if (index === 5) {
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
    } else if (index === 6) {
      console.log("hit");
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
        index: 0,
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
            index: 0,
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
    this.shippingHandleValidations(name);
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
    this.shippingHandleValidations(name);
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
      index: 3,
    });
  };

  closeAccountForm = () => {
    this.setState({
      index: 0,
    });
  };

  openItemModal = ({ target: { id } }) => {
    const { products } = this.state;
    const productItem = products.filter((product) => product.id === id);
    this.setState({
      selectedProduct: productItem,
      index: 2,
    });
  };

  handleItmeModalClose = () => {
    this.setState({ index: 0 });
  };

  openCategoryModal = ({ target: { id } }) => {
    const { products } = this.state;
    const productItem = products.filter(
      (product) => product.categories[0] === id
    );
    this.setState({
      selectedCategory: productItem,
      selectedCategoryName: id.toUpperCase(),
      index: 1,
    });
  };

  handleCategoryModalClose = () => {
    this.setState({ index: 0 });
  };

  openCartPage = () => {
    this.setState({ index: 4 });
  };

  closeCartPage = () => {
    this.setState({ index: 0 });
  };

  resetState = () => {
    const { cartItems, products } = this.state;
    const updateProducts = products.map((product) => {
      const cartItem = cartItems.filter((item) => item.id === product.id);
      if (cartItem.length ? cartItem[0].id === product.id : false) {
        return { ...product, inventory: product.inventory - cartItem[0].qty };
      }
      return product;
    });
    this.setState({
      products: updateProducts,
      cartItems: [],
    });
  };

  nextPage = () => {
    const { index } = this.state;
    const checkErrors = this.checkErrors();
    if (index === 4) {
      this.setState({ index: 5 });
    } else if (index === 5) {
      if (!checkErrors) {
        this.setState({ index: 6 });
        this.paymentFieldsFilledOut();
      }
    } else if (index === 6) {
      if (!checkErrors) {
        this.setState({
          index: 7,
        });
      }
    }
  };

  backPage = () => {
    const { index } = this.state;
    if (index === 5) {
      this.setState({ index: 4 });
    } else if (index === 6) {
      this.setState({
        index: 5,
        disableBtn: false,
      });
    } else {
      this.setState({
        index: 0,
        subTotal: 0,
        cartTotal: 0,
        discounts: 0,
        cardType: "",
        numberOfCartItems: 0,
        taxes: 0,
        shipping: {
          shippingCost: 0,
          shippingTitle: "",
          ShippingDescription: "",
        },
        paymentData: {
          cardName: "",
          cardNumber: "",
          cardMonth: "",
          cardYear: "",
          cardCvv: "",
        },
      });
      this.resetState();
    }
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
      cartTotal,
      signInForm,
      createAccForm,
      formData,
      signInFormData,
      isLoggedIn,
      firstName,
      taxes,
      shipping,
      shippingPageError,
      formError,
      shippingData,
      cardType,
      disableBtn,
      paymentData,
      cartPageError,
      paymentPageError,
      maxLength,
      inventoryError,
      quantity,
      error,
    } = this.state;
    return (
      <section>
        <div className="navbar-parent-div">
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
                <select
                  className="logged-in-name"
                  name="loggedInName"
                  id=""
                  onChange={this.signOut}
                >
                  <option value="loggedIn">{`Welcome ${firstName}`}</option>
                  <option value="logOut">Log out</option>
                </select>
              </div>
            ) : (
              <div onClick={this.openAccountForm} className="nav-login-btn-div">
                <button onClick={this.openAccountForm}>Login/Signup</button>
              </div>
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
        {index === 0 && !error ? (
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
                        inventoryError={inventoryError}
                        quantity={quantity}
                      />
                    }
                  </div>
                ))
              ) : (
                products.map((item) => (
                  <div
                    className={`${item.categories[0]}-container`}
                    key={item.id}
                  >
                    {
                      <ItemComponent
                        img={item.img}
                        title={item.name}
                        price={item.price}
                        id={item.id}
                        openItemPage={this.openItemModal}
                        addToCart={this.addToCart}
                        inventoryError={inventoryError}
                        quantity={quantity}
                      />
                    }
                  </div>
                ))
              )
            ) : (
              <div className="loading-div">...Loading</div>
            )}
          </div>
        ) : index === 0 && error ? (
          <div className="home-error-div">
            Something Broke Please try to Refresh The Page
          </div>
        ) : null}
        {index >= 4 ? (
          <CartPage
            products={cartItems}
            closeCartPage={this.closeCartPage}
            openItemPage={this.openItemModal}
            updateQty={this.updatProductQty}
            removeFromCart={this.removeFromCartFaClose}
            cartError={cartPageError}
            index={index}
            subTotal={subTotal}
            discount={discounts}
            discountCodes={this.applydiscount}
            cartTotal={cartTotal}
            tax={taxes}
            shipping={shipping}
            cartItems={cartItems}
            next={this.nextPage}
            shippingErrorMsg={shippingPageError}
            backPage={this.backPage}
            handleInputChange={this.handleInputChange}
            expressShipping={this.expressShipping}
            standardShipping={this.standardShipping}
            shippingData={shippingData}
            cardType={cardType}
            disableBtn={disableBtn}
            cardNumber={paymentData}
            paymentErrorMsg={paymentPageError}
            maxLength={maxLength}
            paymentData={paymentData}
            inventoryError={inventoryError}
            quantity={quantity}
          />
        ) : null}
        {index === 1 ? (
          <CategoryPage
            products={selectedCategory}
            showCategoryPage={showCategoryPage}
            handleClose={this.handleCategoryModalClose}
            openItemModal={this.openItemModal}
            title={selectedCategoryName}
            addToCart={this.addToCart}
            inventoryError={inventoryError}
            quantity={quantity}
          />
        ) : null}
        {index === 2 ? (
          <ItemPage
            product={selectedProduct}
            showItemPage={showItemPage}
            handleClose={this.handleItmeModalClose}
            addToCart={this.addToCart}
            updateQty={this.updatProductQty}
            inventoryError={inventoryError}
            quantity={quantity}
          />
        ) : null}
        {index === 3 ? (
          <AccountForms
            forms={forms}
            closeAccForm={this.closeAccountForm}
            signIn={signInForm}
            createAcc={createAccForm}
            signInFormData={signInFormData}
            formData={formData}
            switchForm={this.switchForm}
            handleInputChange={this.formHandleInputChange}
            handleBlur={this.handleBlur}
            handleSignIn={this.handleSignIn}
            handleSubmit={this.handleSubmit}
            formError={formError}
          />
        ) : null}
      </section>
    );
  }
}

export default HomePage;
