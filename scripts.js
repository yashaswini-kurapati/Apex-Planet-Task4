// To-Do List Logic
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}

addTaskBtn.addEventListener("click", addTask);
loadTasks();

// Product Listing Logic
const products = [
  { name: "Laptop", category: "electronics", price: 800 },
  { name: "T-shirt", category: "clothing", price: 20 },
  { name: "Headphones", category: "electronics", price: 150 },
  { name: "Jeans", category: "clothing", price: 40 }
];

const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const productList = document.getElementById("productList");

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <img src="${getImageForProduct(p.name)}" alt="${p.name}" style="width:100%; border-radius: 8px; margin-top: 8px;" />
    `;
    productList.appendChild(div);
  });
}

function getImageForProduct(name) {
  switch(name.toLowerCase()) {
    case "laptop":
      return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80";
    case "t-shirt":
      return "https://cdn.pixabay.com/photo/2017/03/30/12/15/t-shirt-2186858_1280.png";
    case "headphones":
      return "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80";
    case "jeans":
      return "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80";
    default:
      return "https://via.placeholder.com/400x300?text=Product+Image";
  }
}

function updateProductList() {
  const filter = categoryFilter.value;
  const sortValue = sortPrice.value;
  let filtered = [...products];

  if (filter !== "all") {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (sortValue === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

categoryFilter.addEventListener("change", updateProductList);
sortPrice.addEventListener("change", updateProductList);

displayProducts(products);
