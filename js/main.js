/**
 * 长安风物志 - 全局主脚本
 * 依赖：Storage、Toast、Auth 模块（需先加载）
 * 功能：导航栏滚动吸顶 | 返回顶部 | 倒计时秒杀 | 移动端菜单 | 导航状态
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 导航栏滚动悬浮效果 ====================
  var header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==================== 移动端菜单 ====================
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var mainNav = document.querySelector('.main-nav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      var spans = menuBtn.querySelectorAll('span');
      if (mainNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // 点击导航链接后关闭菜单
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        var spans = menuBtn.querySelectorAll('span');
        if (spans.length >= 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }

  // ==================== 返回顶部按钮 ====================
  var backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== 限时秒杀倒计时 ====================
  var countdownEls = {
    hours:   document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  if (countdownEls.hours && countdownEls.minutes && countdownEls.seconds) {
    function getEndTime() {
      var now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();
    }

    var endTime = getEndTime();

    function updateCountdown() {
      var now = Date.now();
      var diff = endTime - now;
      if (diff <= 0) {
        endTime = getEndTime() + 24 * 60 * 60 * 1000;
        diff = endTime - now;
      }
      var h = Math.floor(diff / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      countdownEls.hours.textContent   = pad(h);
      countdownEls.minutes.textContent = pad(m);
      countdownEls.seconds.textContent = pad(s);
    }

    function pad(n) { return n < 10 ? '0' + n : n; }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ==================== 用户导航状态更新 ====================
  // Auth 模块在 auth.js 中定义，需确保已加载
  if (typeof Auth !== 'undefined' && Auth.updateNav) {
    Auth.updateNav();
  }

  // ==================== 事件委托：商品卡片点击跳转详情 ====================
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.product-card');
    if (!card) return;

    // 不拦截按钮点击（收藏、加购等）
    if (e.target.closest('button') || e.target.closest('a')) return;

    // 从卡片中的加购按钮读取商品ID
    var cartBtn = card.querySelector('.card-cart-btn');
    if (!cartBtn) return;

    var productId = cartBtn.getAttribute('data-id');
    if (!productId) return;

    // 跳转到详情页
    window.location.href = Auth.getBase() + 'detail.html?id=' + productId;
  });

});

// ==================== 全局 addToCart 函数 ====================
// 供所有页面的「加入购物车」按钮调用
function addToCart(product) {
  // 必须登录
  if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
    Toast.warning('请先登录后再添加购物车');
    setTimeout(function () {
      window.location.href = Auth.getBase() + 'login.html';
    }, 800);
    return;
  }

  var cart = Storage.get(Storage.userKey('cart'), []);
  var existing = cart.find(function (item) { return item.id === product.id; });

  if (existing) {
    existing.quantity += (product.quantity || 1);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1
    });
  }

  Storage.set(Storage.userKey('cart'), cart);
  Auth.updateCartBadge();
  Toast.success('"' + product.name + '" 已加入购物车');
}
