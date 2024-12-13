// 初始化用戶資料列表
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

function registerUser() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const messageDiv = document.getElementById("message");

  // 檢查帳號密碼是否為空
  if (!username || !password) {
    messageDiv.textContent = "請輸入帳號和密碼";
    messageDiv.style.color = "red";
    return;
  }

  // 取得現有用戶列表
  let users = JSON.parse(localStorage.getItem("users"));

  // 檢查帳號是否已存在
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    messageDiv.textContent = "此帳號已存在";
    messageDiv.style.color = "red";
    return;
  }

  // 新增用戶
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  messageDiv.textContent = "註冊成功！";
  messageDiv.style.color = "green";
}

function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const messageDiv = document.getElementById("message");

  // 檢查帳號密碼是否為空
  if (!username || !password) {
    messageDiv.textContent = "請輸入帳號和密碼";
    messageDiv.style.color = "red";
    return;
  }

  // 取得現有用戶列表
  let users = JSON.parse(localStorage.getItem("users"));

  // 驗證帳號密碼
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // 登入成功處理
    messageDiv.textContent = "登入成功！";
    messageDiv.style.color = "green";

    // 更新右上角按鈕
    const loginBtn = document.getElementById("loginNav");
    loginBtn.textContent = `Hi! ${username}`;
    loginBtn.style.fontWeight = "bold";

    // 儲存登入狀態
    localStorage.setItem("loggedInUser", username);

    // 關閉模態視窗
    const modal = document.querySelector(".modal-dialog");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-dialog-open");
      const backdrop = document.querySelector(".modal-dialog-backdrop");
      if (backdrop) backdrop.remove();
    }
  } else {
    // 登入失敗處理
    messageDiv.textContent = "帳號或密碼錯誤";
    messageDiv.style.color = "red";
  }
}

// 頁面加載時檢查登入狀態
window.addEventListener("load", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const loginBtn = document.getElementById("loginNav");
    loginBtn.textContent = `Hi! ${loggedInUser}`;
    loginBtn.style.fontWeight = "bold";
  }
});

// 註冊按鈕事件監聽
document
  .getElementById("registerButton")
  .addEventListener("click", registerUser);

// 登入按鈕事件監聽
document.getElementById("loginButton").addEventListener("click", loginUser);
