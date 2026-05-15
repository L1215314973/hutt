/**
 * 长安风物志 - 用户认证模块
 * 功能：注册 | 登录 | 登出 | 状态检查 | 权限拦截 | 导航更新
 * 依赖：Storage（storage.js）、Toast（toast.js）
 */

var Auth = (function () {
  'use strict';

  var USERS_KEY = 'chang_an_users';
  var CURRENT_USER_KEY = 'currentUser';

  /**
   * 智能路径解析：自动检测当前页面位置
   * 在 pages/ 目录下返回 ''，在根目录返回 'pages/'
   * 确保从首页和子页面都能正确跳转
   */
  function getBase() {
    var path = window.location.pathname;
    // 如果路径中包含 /pages/，说明当前在子目录中
    if (path.indexOf('/pages/') !== -1) {
      return '';
    }
    // 否则在根目录
    return 'pages/';
  }

  // ==================== 用户数据操作 ====================

  /**
   * 获取所有注册用户
   * @returns {Array} 用户对象数组
   */
  function getUsers() {
    return Storage.get(USERS_KEY, []);
  }

  /**
   * 按手机号查找用户
   * @param {string} phone
   * @returns {Object|null}
   */
  function findUserByPhone(phone) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].phone === phone) {
        return users[i];
      }
    }
    return null;
  }

  // ==================== 注册 ====================

  /**
   * 用户注册
   * @param {Object} formData - { username, phone, password }
   * @returns {Object} { success: boolean, message: string }
   */
  function register(formData) {
    var users = getUsers();
    var username = (formData.username || '').trim();
    var phone = (formData.phone || '').trim();
    var password = formData.password || '';

    // 检查手机号是否已注册
    if (findUserByPhone(phone)) {
      return { success: false, message: '该手机号已被注册', field: 'phone' };
    }

    // 创建用户
    var newUser = {
      username: username,
      phone: phone,
      password: password,       // 注意：教学项目明文存储，实际项目应加密
      createdAt: new Date().toISOString(),
      avatar: ''
    };

    users.push(newUser);
    Storage.set(USERS_KEY, users);

    return { success: true, message: '注册成功' };
  }

  // ==================== 登录 ====================

  /**
   * 用户登录：手机号 + 密码
   * @param {Object} formData - { phone, password }
   * @returns {Object} { success: boolean, message: string }
   */
  function login(formData) {
    var phone = (formData.phone || '').trim();
    var password = formData.password || '';

    // 查找用户
    var user = findUserByPhone(phone);
    if (!user) {
      return { success: false, message: '该手机号尚未注册', field: 'phone' };
    }

    // 验证密码
    if (user.password !== password) {
      return { success: false, message: '密码错误，请重新输入', field: 'password' };
    }

    // 保存登录状态
    var session = {
      username: user.username,
      phone: user.phone,
      createdAt: user.createdAt,
      avatar: user.avatar,
      loginTime: new Date().toISOString()
    };
    Storage.set(CURRENT_USER_KEY, session);

    return { success: true, message: '登录成功', user: session };
  }

  // ==================== 登出 ====================

  function logout() {
    Storage.remove(CURRENT_USER_KEY);
  }

  // ==================== 状态查询 ====================

  /**
   * 获取当前登录用户
   * @returns {Object|null}
   */
  function getCurrentUser() {
    return Storage.get(CURRENT_USER_KEY, null);
  }

  /**
   * 是否已登录
   * @returns {boolean}
   */
  function isLoggedIn() {
    return getCurrentUser() !== null;
  }

  // ==================== 权限拦截 ====================

  /**
   * 需要登录才能访问的页面
   * 未登录自动跳转到 login.html
   * @param {string} [redirectUrl] - 登录后回跳的页面
   */
  function requireAuth(redirectUrl) {
    if (!isLoggedIn()) {
      Toast.warning('请先登录后再访问');
      var target = getBase() + 'login.html';
      if (redirectUrl) {
        target += '?redirect=' + encodeURIComponent(redirectUrl);
      }
      // 延迟跳转让用户看到提示
      setTimeout(function () {
        window.location.href = target;
      }, 800);
      return false;
    }
    return true;
  }

  // ==================== 导航栏更新 ====================

  /**
   * 根据登录状态更新页面导航栏
   * 在页面加载时调用
   */
  function updateNav() {
    var currentUser = getCurrentUser();
    var navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    // 查找登录/用户入口
    var userLink = navActions.querySelector('.nav-user-area');

    if (currentUser) {
      // 已登录：显示用户菜单
      if (!userLink) {
        // 将第二个图标（原登录按钮）替换为用户菜单
        var loginIcon = navActions.querySelector('a[href*="login.html"]');
        if (loginIcon) {
          var base = getBase();
          loginIcon.outerHTML = ''
            + '<div class="nav-user-area">'
            + '  <a href="' + base + 'profile.html" class="nav-icon nav-user-icon" title="' + currentUser.username + '">'
            + '    <span class="user-avatar-text">' + (currentUser.username || '用').charAt(0) + '</span>'
            + '  </a>'
            + '  <div class="user-dropdown">'
            + '    <span class="dropdown-greeting">你好，' + (currentUser.username || '用户') + '</span>'
            + '    <a href="' + base + 'favorite.html">♥ 我的收藏</a>'
            + '    <a href="' + base + 'order.html">📋 我的订单</a>'
            + '    <a href="' + base + 'profile.html">👤 用户中心</a>'
            + '    <a href="#" class="logout-link">🚪 退出登录</a>'
            + '  </div>'
            + '</div>';
        }
      }

      // 绑定退出登录
      var logoutLink = document.querySelector('.logout-link');
      if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
          e.preventDefault();
          logout();
          Toast.success('已退出登录');
          setTimeout(function () { window.location.reload(); }, 600);
        });
      }
    } else {
      // 未登录：显示登录链接
      if (userLink) {
        userLink.outerHTML = '<a href="' + getBase() + 'login.html" class="nav-icon" title="登录">👤</a>';
      }
    }

    // 更新购物车角标
    updateCartBadge();
  }

  /**
   * 更新购物车角标
   * 根据当前登录用户从 localStorage 中读取购物车数据
   */
  function updateCartBadge() {
    var badge = document.getElementById('cart-count');
    if (!badge) return;

    var cart = Storage.get(Storage.userKey('cart'), []);
    var total = cart.reduce(function (sum, item) {
      return sum + (item.quantity || 0);
    }, 0);

    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }

  // ==================== 对外暴露 ====================
  return {
    register: register,
    login: login,
    logout: logout,
    getCurrentUser: getCurrentUser,
    isLoggedIn: isLoggedIn,
    requireAuth: requireAuth,
    updateNav: updateNav,
    updateCartBadge: updateCartBadge,
    findUserByPhone: findUserByPhone,
    getBase: getBase
  };

})();
