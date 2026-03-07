// 小型前端資料庫
const menuData = {
  noodle: [
    { name: "番茄白酒海鮮義大利麵", price: 360 },
    { name: "蘿勒青醬海鮮義大利麵", price: 360 },
    { name: "嫩煎雞腿青醬義大利麵", price: 320 },
    { name: "松露奶油鮭魚義大利麵", price: 330 },
    { name: "牛肝菌松露野菇義大利麵", price: 270 },
    { name: "檸香金沙軟殼蟹義大利麵", price: 320 },
    { name: "蒜香清炒中卷墨魚麵", price: 280 },
    { name: "海苔蛋黃肉醬貝殼麵", price: 280 },
    { name: "香菜牛肉河粉", price: 190 },
    { name: "南薑酸辣鮮蝦義大利麵", price: 280 },
    { name: "起司焗烤肉醬斜管麵", price: 280 },
    { name: "起司焗烤鮭魚斜管麵", price: 280 }
  ],
  rice: [
    { name: "咖哩飯", price: 150 },
    { name: "滷肉飯", price: 100 }
  ],
  snack: [
    { name: "炸雞塊", price: 80 },
    { name: "薯條", price: 60 }
  ],
  drink: [
    { name: "紅茶", price: 40 },
    { name: "咖啡", price: 50 },
    { name: "奶茶", price: 60 }
  ]
};

let cart = [];

const overlay = document.getElementById("overlay");
const overlayContent = document.getElementById("overlay-content");

// 顯示 overlay
function showOverlay(category) {
  overlayContent.innerHTML = "";
  menuData[category].forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.textContent = `${item.name} - $${item.price}`;
    div.onclick = () => selectItem(item);
    overlayContent.appendChild(div);
  });
  overlay.classList.remove("hidden");
}

// 點擊背景取消
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});

// 點選餐點 → 套餐選擇
function selectItem(item) {
  const choice = confirm(`是否要加套餐？\n${item.name} - $${item.price}`);
  if (choice) {
    const drink = prompt("選擇飲料：紅茶 / 咖啡 (免加價)，其他需補差額");
    let extra = 0;
    if (drink && drink !== "紅茶" && drink !== "咖啡") {
      extra = 20; // 假設補差額
    }
    cart.push({ ...item, set: true, drink, price: item.price + extra });
  } else {
    cart.push(item);
  }
  updateCart();
  overlay.classList.add("hidden");
}

// 更新購物車
function updateCart() {
  const list = document.getElementById("cart-list");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name}${c.set ? "(套餐)" : ""} - $${c.price}`;
    list.appendChild(li);
    total += c.price;
  });
  document.getElementById("total").textContent = `總金額：$${total}`;
}

// 綁定分類按鈕
document.querySelectorAll(".categories button").forEach(btn => {
  btn.addEventListener("click", () => showOverlay(btn.dataset.category));
});
