const storageKey = 'groceryList';
const budgetStorageKey = 'groceryBudget';
const itemForm = document.getElementById('itemForm');
const itemNameInput = document.getElementById('itemName');
const itemPriceInput = document.getElementById('itemPrice');
const budgetInput = document.getElementById('budget');
const groceryList = document.getElementById('groceryList');
const emptyMessage = document.getElementById('emptyMessage');
const itemCount = document.getElementById('itemCount');
const totalExpenseDisplay = document.getElementById('totalExpense');
const budgetMessage = document.getElementById('budgetMessage');

function loadItems() {
    try {
        const savedItems = JSON.parse(localStorage.getItem(storageKey));
        return Array.isArray(savedItems) ? savedItems : [];
    } catch {
        return [];
    }
}

function saveItems() {
    localStorage.setItem(storageKey, JSON.stringify(groceryItems));
}

let groceryItems = loadItems();
const savedBudget = localStorage.getItem(budgetStorageKey);
if (savedBudget) budgetInput.value = savedBudget;

function render() {
    groceryList.innerHTML = '';
    emptyMessage.hidden = groceryItems.length > 0;
    itemCount.textContent = `${groceryItems.length} ${groceryItems.length === 1 ? 'item' : 'items'}`;

    groceryItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = item.bought ? 'bought-item' : '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.bought;
        checkbox.setAttribute('aria-label', `Mark ${item.name} as purchased`);
        checkbox.addEventListener('change', () => toggleBoughtStatus(item.id));

        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(item.id));

        listItem.append(checkbox, itemText, deleteButton);
        groceryList.appendChild(listItem);
    });

    updateTotal();
}

function updateTotal() {
    const total = groceryItems.reduce((sum, item) => sum + item.price, 0);
    const budget = Number(budgetInput.value);
    totalExpenseDisplay.textContent = total.toFixed(2);
    const exceeded = budget > 0 && total > budget;
    totalExpenseDisplay.classList.toggle('budget-exceeded', exceeded);
    budgetMessage.textContent = exceeded ? 'You are over your monthly budget.' : '';
    budgetMessage.classList.toggle('budget-exceeded', exceeded);
}

function addItem(event) {
    event.preventDefault();
    const name = itemNameInput.value.trim();
    const price = Number(itemPriceInput.value);
    if (!name || !Number.isFinite(price) || price <= 0) return;

    groceryItems.push({ id: Date.now(), name, price, bought: false });
    saveItems();
    itemForm.reset();
    itemNameInput.focus();
    render();
}

function toggleBoughtStatus(id) {
    const item = groceryItems.find((entry) => entry.id === id);
    if (item) {
        item.bought = !item.bought;
        saveItems();
        render();
    }
}

function deleteItem(id) {
    groceryItems = groceryItems.filter((item) => item.id !== id);
    saveItems();
    render();
}

itemForm.addEventListener('submit', addItem);
budgetInput.addEventListener('input', () => {
    localStorage.setItem(budgetStorageKey, budgetInput.value);
    updateTotal();
});

render();