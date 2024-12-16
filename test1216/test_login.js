// 初始化用戶資料列表
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// 檢查當前是否已登入，動態調整按鈕狀態
document.addEventListener("DOMContentLoaded", () => {
  const loginNav = document.getElementById("loginNav");
  const navItem = document.querySelector(".navbar-nav .nav-item:nth-child(3)"); // "Hi! 帳號名稱" 的位置
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    // 如果已登入，顯示登出按鈕和用戶名稱
    loginNav.textContent = "登出";
    navItem.querySelector("a").textContent = `Hi! ${currentUser}`;
    navItem.style.fontWeight = "bold";
  } else {
    loginNav.textContent = "登入";
    navItem.querySelector("a").textContent = ""; // 清空帳號名稱
  }

  // 監聽按鈕的動作 (登入/登出)
  loginNav.addEventListener("click", () => {
    if (loginNav.textContent === "登出") {
      logoutUser();
    }
  });
});

// 註冊用戶
function registerUser() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const messageDiv = document.getElementById("registerMessage");

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

  // 清空輸入框
  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";

  // 自動關閉註冊modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("registrationModal")
  );
  setTimeout(() => {
    modal.hide();
  }, 1000);
}

// 登入用戶
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
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (validUser) {
    localStorage.setItem("currentUser", username); // 設定當前用戶
    alert("登入成功！");
    window.location.reload(); // 重新加載頁面以更新登入狀態
  } else {
    alert("帳號或密碼錯誤！");
  }
  //   messageDiv.textContent = "登入成功！";
  //   messageDiv.style.color = "green";

  //   setTimeout(() => {
  //     window.location.reload(); // 重新加載頁面以更新登入狀態
  //   }, 1000);
  // } else {
  //   messageDiv.textContent = "帳號或密碼錯誤";
  //   messageDiv.style.color = "red";
  // }
}

function logoutUser() {
  localStorage.removeItem("currentUser"); // 清除當前用戶
  alert("已登出");
  window.location.reload(); // 重新加載頁面
}

// 頁面加載時檢查登入狀態
window.addEventListener("load", function () {
  // const loggedInUser = localStorage.getItem("loggedInUser");
  // if (loggedInUser) {
  //   const loginBtn = document.getElementById("loginNav");
  //   loginBtn.textContent = `Hi! ${loggedInUser}`;
  //   loginBtn.style.fontWeight = "bold";
  // }

  // 動態添加事件監聽器
  const registerButton = document.querySelector(
    '.createAccount button[data-bs-target="#registrationModal"]'
  );
  if (registerButton) {
    registerButton.addEventListener("click", function () {
      // 清空之前的訊息
      const registerMessage = document.getElementById("registerMessage");
      if (registerMessage) {
        registerMessage.textContent = "";
      }
    });
  }

  // 註冊按鈕事件監聽
  const regButton = document.getElementById("registerButton");
  if (regButton) {
    regButton.addEventListener("click", registerUser);
  }
});
