const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');
const addProductBtn = document.getElementById('add-product-btn');
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalPriceElem = document.getElementById('total-price');


let products = [];


let cart = JSON.parse(localStorage.getItem('cart')) || [];


addProductBtn.addEventListener('click', () => {
    const title = productTitle.value;
    const price = parseFloat(productPrice.value);
    const description = productDescription.value;

    if (title && price && description) {
        const product = { title, price, description };
        products.push(product);
        displayProducts();
    }
});


function displayProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.addEventListener('click', () => addToCart(product));
        li.appendChild(addToCartBtn);
        productList.appendChild(li);
    });
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.title === product.title);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}


function updateCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - $${item.price} x ${item.quantity}`;
        totalPrice += item.price * item.quantity;

    
        const addQtyBtn = document.createElement('button');
        addQtyBtn.textContent = '+';
        addQtyBtn.addEventListener('click', () => {
            item.quantity++;
            updateCart();
        });
        li.appendChild(addQtyBtn);

    
        const removeQtyBtn = document.createElement('button');
        removeQtyBtn.textContent = '-';
        removeQtyBtn.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });
        li.appendChild(removeQtyBtn);


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCart();
        });8
        li.appendChild(deleteBtn);

        cartList.appendChild(li);
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

updateCart();

