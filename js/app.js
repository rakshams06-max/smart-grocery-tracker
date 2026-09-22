const budgetInput = document.getElementById("budget");
budgetInput.addEventListener("input", checkBudget);

// --- Local Storage Module ---
// Converts grocery array to string and saves to browser storage
function saveToLocalStorage(items) {
    const stringifiedData = JSON.stringify(items);
    // Retrieves and parses data from storage, returns empty array if none exists

    function loadFromLocalStorage() {
    const savedData = localStorage.getItem('groceryList');
        const savedData = localStorage.getItem('groceryList');
        if (savedData) {return JSON.parse(savedData);
            return [];
    }
}
// --- End Local Storage Module ---
// // DOM Elements
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const addItemBtn = document.getElementById('addItemBtn');
const groceryList = document.getElementById('groceryList');
const totalExpenseDisplay = document.getElementById('totalExpense');// State Data
let groceryItems = loadFromLocalStorage();
// Display saved items immediately when the app opens
renderList(groceryItems);
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
    // Persist data after adding new item
    saveToLocalStorage(groceryItems);
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
        const cssClass = item.bought ? 'bought-item' : '';
        const li = document.createElement('li');
        li.className = cssClass;
        li.innerHTML = `
            <input type="checkbox" ${item.bought ? 'checked' : ''} onchange="toggleBoughtStatus(${item.id})">
            <span>${item.name} - ₹${item.price.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        `;
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
    const itemIndex = groceryItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        groceryItems[itemIndex].bought = !groceryItems[itemIndex].bought;
        renderList();
    }
}

function deleteItem(id) {
    groceryItems = groceryItems.filter(item => item.id !== id);
    updateTotalExpense();
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
function checkBudget() {
    const budget = Number(budgetInput.value);

    if (budget > 0 && totalExpense > budget) {
        document.getElementById("totalExpense").classList.add("budget-exceeded");
    } else {
        document.getElementById("totalExpense").classList.remove("budget-exceeded");
    }
}
}