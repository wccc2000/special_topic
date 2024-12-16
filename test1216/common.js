window.addEventListener("DOMContentLoaded", function () {
  // 取得 localStorage 中的登入用戶名稱
  const currentUser = localStorage.getItem("currentUser");
  const loginNav = document.getElementById("loginNav");
  const navUser = document.querySelector(".navbar-nav .nav-item:nth-child(3)");
  // const navUser = document.getElementById("navUser");

  // 檢查是否有登入的用戶
  if (currentUser) {
    if (!navUser) {
      // 更新登入按鈕為「登出」，並顯示用戶名稱
      loginNav.textContent = "登出";
      navUser
        .querySelector("a")
        .insertAdjacentText("afterbegin", `Hi! ${currentUser} `);
      // 點擊「登出」按鈕時執行登出邏輯
      loginNav.addEventListener("click", function () {
        localStorage.removeItem("currentUser"); // 清除登入資訊
        window.location.reload(); // 重新加載頁面，恢復初始狀態
      });
    }
  } else {
    // 若無登入，用戶可以登入
    loginNav.textContent = "登入";
  }
});
