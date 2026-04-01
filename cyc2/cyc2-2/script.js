let cart = [];

function addToCart(name , price) {

let item = cart.find(item => item.name === name);

if (item) {

item.quantity += 1;

} else {

cart.push({ name , price , quantity: 1 });

}

updateCart ();

}

function removeFromCart(name) {

cart = cart.filter(item => item.name !== name);

updateCart ();

}

function updateQuantity(name , quantity) {

let item = cart.find(item => item.name === name);

if (item) {

item.quantity =parseInt(quantity);

if (item.quantity <= 0) {

removeFromCart(name);

} else {

updateCart ();

}

}

}

function updateCart () {

let cartItems = document.getElementById('cartItems');

cartItems.innerHTML = '';

cart.forEach(item => {

let li = document.createElement('li');

li.innerHTML = `${item.name} - Rs.${item.price} x ${item.quantity}

<button onclick =" removeFromCart('${item.name}')">Remove </button >

<input type=" number" value="${item.quantity }"

min ="0"

onchange =" updateQuantity('${item.name}', this.value)">`;

cartItems.appendChild(li);

});

let totalPrice = cart.reduce ((total , item) => total + item.price * item.quantity , 0);

document.getElementById('totalPrice').innerHTML = `Total Price: Rs.${totalPrice }`;

}