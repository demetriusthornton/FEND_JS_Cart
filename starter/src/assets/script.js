/**
 * @desc Array of product objects containing product details
 * @type {Array<Object>}
 */
const products = [
  {
      name: "Cherry",
      price: 5.99,
      quantity: 0,
      productId: 1001,
      image: "images/cherry.jpg",
  },
  {
      name: "Orange",
      price: 3.99,
      quantity: 0,
      productId: 1002,
      image: "images/orange.jpg",
  },
  {
      name: "Strawberry",
      price: 4.99,
      quantity: 0,
      productId: 1003,
      image: "images/strawberry.jpg",
  },
];

/**
* @desc Array to store cart items
* @type {Array<Object>}
*/
let cart = [];

/**
* @desc Adds a product to the shopping cart
* @param {number} productId - The ID of the product to add
* @return {void}
*/
function addProductToCart(productId) {
  const product = products.find((p) => p.productId === productId);
  if (product) {
      const cartItem = cart.find((item) => item.productId === productId);
      if (cartItem) {
          cartItem.quantity++;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      product.quantity++;
  }
}

/**
* @desc Increases the quantity of a product in the cart
* @param {number} productId - The ID of the product to increase
* @return {void}
*/
function increaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
      cartItem.quantity++;
      const product = products.find((p) => p.productId === productId);
      product.quantity++;
  }
}

/**
* @desc Decreases the quantity of a product in the cart
* @param {number} productId - The ID of the product to decrease
* @return {void}
*/
function decreaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
      cartItem.quantity--;
      const product = products.find((p) => p.productId === productId);
      product.quantity--;
      if (cartItem.quantity === 0) {
          removeProductFromCart(productId);
      }
  }
}

/**
* @desc Removes a product from the cart
* @param {number} productId - The ID of the product to remove
* @return {void}
*/
function removeProductFromCart(productId) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
      const product = products.find((p) => p.productId === productId);
      product.quantity = 0;
      cart.splice(index, 1);
  }
}

/**
* @desc Calculates the total cost of items in the cart
* @return {number} The total cost
*/
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

let totalPaid = 0;

/**
* @desc Empties the shopping cart and resets product quantities
* @return {void}
*/
function emptyCart() {
  cart.forEach((item) => {
      const product = products.find((p) => p.productId === item.productId);
      product.quantity = 0;
  });
  cart = [];
  console.log("Cart has been emptied.");
}

/**
* @desc Processes a payment for the cart items
* @param {number} amount - The payment amount
* @return {string} The remaining balance or change amount, formatted to 2 decimal places
*/
function pay(amount) {
  totalPaid += amount;
  let total = cartTotal();
  let remaining = totalPaid - total;
  if (remaining >= 0) {
      totalPaid = remaining;
      emptyCart();
      return remaining.toFixed(2);
  } else {
      return remaining.toFixed(2);
  }
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
};
