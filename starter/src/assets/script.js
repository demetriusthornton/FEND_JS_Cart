/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

/* Create a function called emptyCart that empties the products from the cart */

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

// module.exports = {
//   products,
//   cart,
//   addProductToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeProductFromCart,
//   cartTotal,
//   pay,
//   emptyCart,
//   /* Uncomment the following line if completing the currency converter bonus */
//   // currency
// };

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

let totalPaid = 0; // This variable keeps track of the total amount paid by the customer

function emptyCart() {
  // Logic to empty the cart goes here
  console.log("Cart has been emptied.");
}

function pay(amount) {
  totalPaid += amount; // Add the current payment to the total paid amount
  const total = cartTotal(); // Get the total price of items in the cart
  let remaining = totalPaid - total; // Calculate the remaining balance

  if (remaining >= 0) {
    // Payment is sufficient or there's excess money
    totalPaid = 0; // Reset totalPaid as the payment is complete
    emptyCart(); // Empty the cart
    return `Payment complete! Your change is $${remaining.toFixed(2)}.`; // Round change to the nearest tenth place
  } else {
    // Payment is insufficient, return the remaining amount needed
    return `You still need to pay $${Math.abs(remaining).toFixed(2)}.`; // Return the amount still needed
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
