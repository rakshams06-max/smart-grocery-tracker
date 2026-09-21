// DOM Elements
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const addItemBtn = document.getElementById('addItemBtn');
const groceryList = document.getElementById('groceryList');
const totalExpenseDisplay = document.getElementById('totalExpense');// State Data
let groceryItems = [];
let totalExpense = 0;// Core Functions
function addItem() {
    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);

    if (name === '' || isNaN(price) || price <= 0) {
        alert('Please enter a valid item name and price.');
        return;
    }const newItem = { id: Date.now(), name: name, price: price };
    groceryItems.push(newItem);
    totalExpense += price;

    renderList();
    updateTotal();

    itemNameInput.value = '';
    itemPriceInput.value = '';
}function renderList() {
    groceryList.innerHTML = '';
    
    groceryItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        groceryList.appendChild(li);
    });
}function renderList() {
    groceryList.innerHTML = '';
    
    groceryItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        groceryList.appendChild(li);
    });
}function updateTotal() {
    totalExpenseDisplay.textContent = totalExpense.toFixed(2);
}// Event Listeners
addItemBtn.addEventListener('click', addItem);
function toggleBoughtStatus(id) {
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        items[itemIndex].bought = !items[itemIndex].bought;
        renderList();
    }
}

function toggleBoughtStatus(id) {
    // Toggle the bought boolean for checkboxes
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        items[itemIndex].bought = !items[itemIndex].bought;
        renderList();
    }
}
function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    renderList();
}
function updateTotalExpense() {
const total = items.reduce((sum, item) => sum + item.price, 0);
document.getElementById('total-expense').innerText = `$${total.toFixed(2)}`;
}
function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    updateTotalExpense();
    renderList();
}
