// Product array
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

// Cart array
let cart = [];

// Function to add product to cart
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

// Function to increase quantity
function increaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity++;
    const product = products.find((p) => p.productId === productId);
    product.quantity++;
  }
}

// Function to decrease quantity
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

// Function to remove product from cart
function removeProductFromCart(productId) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    const product = products.find((p) => p.productId === productId);
    product.quantity = 0;
    cart.splice(index, 1);
  }
}

// Function to calculate cart total
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to empty cart
function emptyCart() {
  cart.forEach((item) => {
    const product = products.find((p) => p.productId === item.productId);
    product.quantity = 0;
  });
  cart = [];
}
let totalPaid = 0;

function emptyCart() {
  // Logic to empty the cart goes here
  console.log("Cart has been emptied.");
}

function pay(amount) {
  totalPaid += amount; // Add the current payment to totalPaid
  let total = cartTotal(); // adds the total price of items in the cart
  let remaining = totalPaid - total; // shows the remaining balance after payment

  if (remaining >= 0) {
    totalPaid = remaining; // Update totalPaid to store any excess payment (change)
    emptyCart(); // Empty the cart since payment is sufficient
    return remaining.toFixed(2); // Return the change (remaining balance with the correct cents calc)
  } else {
    // Payment is insufficient
    return remaining.toFixed(2); // Return the negative remaining amount (still needed)
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
