/**
 * 长安风物志 - 用户中心脚本
 * 依赖：Storage、Auth、Toast 模块
 * 功能：展示用户信息 | 统计数据 | 退出登录
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 权限检查 ====================
  if (!Auth.requireAuth('profile.html')) return;

  // ==================== 渲染用户信息 ====================
  function renderProfile() {
    var user = Auth.getCurrentUser();
    if (!user) return;

    // 头像文字
    var avatarText = document.getElementById('avatarText');
    if (avatarText) {
      avatarText.textContent = (user.username || '用').charAt(0);
    }

    // 用户名
    var profileName = document.getElementById('profileName');
    if (profileName) profileName.textContent = user.username || '未设置';

    // 手机号
    var profilePhone = document.getElementById('profilePhone');
    if (profilePhone) profilePhone.textContent = (user.phone || '').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

    // 注册时间
    var profileDate = document.getElementById('profileDate');
    if (profileDate) {
      var dateStr = user.createdAt || '';
      if (dateStr.length >= 10) {
        profileDate.textContent = '注册于 ' + dateStr.substring(0, 10);
      }
    }

    // 统计：订单数
    var orders = Storage.get(Storage.userKey('orders'), []);
    var statOrders = document.getElementById('statOrders');
    if (statOrders) statOrders.textContent = orders.length;

    // 统计：收藏数
    var favorites = Storage.get(Storage.userKey('favorites'), []);
    var statFavorites = document.getElementById('statFavorites');
    if (statFavorites) statFavorites.textContent = favorites.length;

    // 统计：购物车商品数
    var cart = Storage.get(Storage.userKey('cart'), []);
    var totalCart = cart.reduce(function (s, i) { return s + i.quantity; }, 0);
    var statCart = document.getElementById('statCart');
    if (statCart) statCart.textContent = totalCart;
  }

  // ==================== 退出登录 ====================
  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      Auth.logout();
      Toast.success('已退出登录');
      setTimeout(function () {
        window.location.href = '../index.html';
      }, 600);
    });
  }

  // ==================== 初始化 ====================
  Auth.updateNav();
  renderProfile();
});
