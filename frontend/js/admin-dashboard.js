const api = "http://localhost:3000/api";

// Add product
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", document.getElementById("productName").value);
    formData.append("price", document.getElementById("productPrice").value);
    formData.append("description", document.getElementById("productDescription").value); // if used
    formData.append("image", document.getElementById("productImage").files[0]);
  
    const res = await fetch(`${api}/admin/product`, {
      method: "POST",
      body: formData, // do not set Content-Type, browser handles it
    });
  
    if (res.ok) {
      alert("Product added");
      loadProducts();
      document.getElementById("addProductForm").reset();
    } else {
      const err = await res.text();
      console.error(err);
      alert("Failed to add product");
    }
  });
  

// Fetch and display products
async function loadProducts() {
  const res = await fetch(`${api}/admin/product`);
  const products = await res.json();

  const container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach((p) => {
    container.innerHTML += `
      <div>
        <img src="${p.image}" width="100">
        <p><strong>${p.name}</strong></p>
        <p>Rs. ${p.price}</p>
        <p>${p.description}</p>
        <button onclick="deleteProduct(${p.id})">Delete</button>
        <button onclick="showUpdateForm(${p.id}, '${p.name}', '${p.description}', ${p.price})">Update</button>
      </div>
    `;
  });
  
}

async function deleteProduct(id) {
  const res = await fetch(`${api}/admin/product/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Product deleted");
    loadProducts();
  } else {
    alert("Failed to delete product");
  }
}


// Load orders
async function loadOrders() {
    const res = await fetch(`${api}/admin/orders`);
    const orders = await res.json();
  
    const container = document.getElementById("orderList");
    container.innerHTML = "";
  
    orders.forEach((order) => {
      const items = order.items
        .map(item => `${item.name} (x${item.qty})`)
        .join(", ");
  
      container.innerHTML += `
        <div class="order-card">
          <h4>Order #${order.order_id}</h4>
          <p><strong>Customer:</strong> ${order.customer}</p>
          <p><strong>Total:</strong> Rs. ${order.total_amount}</p>
          <p><strong>Placed on:</strong> ${new Date(order.created_at).toLocaleString()}</p>
          <p><strong>Items:</strong> ${items}</p>
          <hr>
        </div>
      `;
    });
  }
  
  

// Initialize
loadProducts();
loadOrders();


function showUpdateForm(id, name, description, price) {
    document.getElementById("updateProductId").value = id;
    document.getElementById("updateProductName").value = name;
    document.getElementById("updateProductDescription").value = description;
    document.getElementById("updateProductPrice").value = price;
    document.getElementById("updateProductForm").style.display = "block";
}

  
  document.getElementById("updateProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = document.getElementById("updateProductId").value;
    const updatedData = {
      name: document.getElementById("updateProductName").value,
      description: document.getElementById("updateProductDescription").value,
      price: document.getElementById("updateProductPrice").value,
    };
  
    const res = await fetch(`${api}/admin/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  
    if (res.ok) {
      alert("Product updated");
      document.getElementById("updateProductForm").reset();
      document.getElementById("updateProductForm").style.display = "none";
      loadProducts();
    } else {
      const err = await res.text();
      alert("Failed to update product: " + err);
    }
  });
  
  document.getElementById("logoutBtn").addEventListener("click", () => {
    // Redirect to login
    window.location.href = "admin-login.html";
  });
  