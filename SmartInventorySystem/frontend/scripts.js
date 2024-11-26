const API_BASE_URL = "http://127.0.0.1:8000";

// Fetch and display inventory items
async function fetchInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/items/`);
        if (!response.ok) throw new Error("Failed to fetch inventory.");
        const items = await response.json();
        const inventoryList = document.getElementById("inventory-list");
        inventoryList.innerHTML = "";

        items.forEach(item => {
            const li = document.createElement("li");
            li.className = "inventory-item";
            li.innerHTML = `
                <span>${item.name} - ${item.quantity} units - $${item.price.toFixed(2)}</span>
                <div class="inventory-actions">
                    <button class="edit" onclick="editItem(${item.id})">Edit</button>
                    <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                </div>
            `;
            inventoryList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        alert("Error loading inventory items.");
    }
}

// Add a new inventory item
document.getElementById("add-item-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("item-name").value;
    const description = document.getElementById("item-description").value;
    const quantity = parseInt(document.getElementById("item-quantity").value, 10);
    const price = parseFloat(document.getElementById("item-price").value);

    const newItem = { name, description, quantity, price };

    try {
        const response = await fetch(`${API_BASE_URL}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });
        if (!response.ok) throw new Error("Failed to add item.");
        alert("Item added successfully!");
        fetchInventory();
        document.getElementById("add-item-form").reset();
    } catch (error) {
        console.error(error);
        alert("Error adding item.");
    }
});

// Delete an inventory item
async function deleteItem(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete item.");
        alert("Item deleted successfully!");
        fetchInventory();
    } catch (error) {
        console.error(error);
        alert("Error deleting item.");
    }
}

// Placeholder for edit functionality
function editItem(id) {
    alert(`Edit functionality not yet implemented. Item ID: ${id}`);
}

// Initialize the inventory list
fetchInventory();
