/**
 * 长安风物志 - 购物车页脚本
 * 依赖：Storage、Auth、Toast 模块
 * 功能：按用户隔离购物车 | 数量增减 | 删除 | 总价计算 | 结算生成订单
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 权限检查 ====================
  if (!Auth.requireAuth('cart.html')) return;

  var cartList    = document.getElementById('cartList');
  var cartEmpty   = document.getElementById('cartEmpty');
  var cartSummary = document.getElementById('cartSummary');
  if (!cartList) return;

  // ==================== 购物车数据（按用户隔离） ====================
  function getCart() {
    return Storage.get(Storage.userKey('cart'), []);
  }

  function saveCart(cart) {
    Storage.set(Storage.userKey('cart'), cart);
  }

  // ==================== 渲染购物车 ====================
  function renderCart() {
    var cart = getCart();

    if (cart.length === 0) {
      cartList.innerHTML = '';
      cartEmpty.style.display = 'block';
      if (cartSummary) cartSummary.style.display = 'none';
      return;
    }

    cartEmpty.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';

    var html = '';
    cart.forEach(function (item, index) {
      var subtotal = item.price * item.quantity;
      html += ''
        + '<div class="cart-item" data-index="' + index + '">'
        + '  <span class="col-check"></span>'
        + '  <div class="cart-product col-product">'
        + '    <div class="cart-product-img">'
        + '      <img src="../images/products/product' + (item.id || 1) + '.jpg" alt="' + item.name + '"'
        + '        onerror="this.parentElement.style.background=\'linear-gradient(135deg, #F8F3E8, #EBE0CC)\'; this.remove();">'
        + '    </div>'
        + '    <span class="cart-product-name">' + item.name + '</span>'
        + '  </div>'
        + '  <span class="cart-item-price col-price">¥' + item.price.toFixed(2) + '</span>'
        + '  <div class="cart-qty-control col-qty">'
        + '    <button class="qty-btn qty-minus" data-index="' + index + '">−</button>'
        + '    <input type="text" class="qty-input" value="' + item.quantity + '" readonly>'
        + '    <button class="qty-btn qty-plus" data-index="' + index + '">+</button>'
        + '  </div>'
        + '  <span class="cart-item-subtotal col-subtotal">¥' + subtotal.toFixed(2) + '</span>'
        + '  <button class="cart-delete-btn col-action" data-index="' + index + '" title="删除">🗑</button>'
        + '</div>';
    });

    cartList.innerHTML = html;
    bindEvents();
    updateSummary();
    Auth.updateCartBadge();
  }

  // ==================== 事件绑定 ====================
  function bindEvents() {
    cartList.querySelectorAll('.qty-minus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        changeQuantity(parseInt(this.getAttribute('data-index')), -1);
      });
    });
    cartList.querySelectorAll('.qty-plus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        changeQuantity(parseInt(this.getAttribute('data-index')), 1);
      });
    });
    cartList.querySelectorAll('.cart-delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        deleteItem(parseInt(this.getAttribute('data-index')));
      });
    });
  }

  function changeQuantity(index, delta) {
    var cart = getCart();
    if (index < 0 || index >= cart.length) return;
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    if (cart[index].quantity > 99) cart[index].quantity = 99;
    saveCart(cart);
    renderCart();
  }

  function deleteItem(index) {
    var cart = getCart();
    if (index < 0 || index >= cart.length) return;
    var itemName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    Toast.info('"' + itemName + '" 已移除');
  }

  // ==================== 汇总 ====================
  function updateSummary() {
    var cart = getCart();
    var totalCount = 0;
    var subtotal = 0;
    cart.forEach(function (item) {
      totalCount += item.quantity;
      subtotal += item.price * item.quantity;
    });

    var freight = subtotal >= 299 ? 0 : 15;
    var total = subtotal + freight;

    var el = function (id) { return document.getElementById(id); };
    if (el('summaryCount'))    el('summaryCount').textContent = totalCount + ' 件';
    if (el('summarySubtotal')) el('summarySubtotal').textContent = '¥' + subtotal.toFixed(2);
    if (el('summaryFreight'))  el('summaryFreight').textContent = freight === 0 ? '免运费' : '¥' + freight.toFixed(2);
    if (el('summaryTotal'))    el('summaryTotal').textContent = '¥' + total.toFixed(2);

    var hint = el('freightHint');
    if (hint) {
      if (freight === 0) {
        hint.textContent = '✓ 已满足包邮条件';
        hint.style.color = 'var(--success)';
      } else {
        hint.textContent = '还差 ¥' + (299 - subtotal).toFixed(2) + ' 即可免运费';
        hint.style.color = 'var(--warning)';
      }
    }
  }

  // ==================== 结算 ====================
  var checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      var cart = getCart();
      if (cart.length === 0) {
        Toast.warning('购物车是空的，请先添加商品');
        return;
      }

      // 生成订单
      var total = cart.reduce(function (s, i) { return s + i.price * i.quantity; }, 0);
      var freight = total >= 299 ? 0 : 15;
      var order = {
        id: 'CF' + Date.now().toString(36).toUpperCase(),
        items: cart,
        total: total + freight,
        status: 'shipped',
        time: new Date().toLocaleString('zh-CN'),
        address: '长安城朱雀大街188号',
        payment: '微信支付'
      };

      var orders = Storage.get(Storage.userKey('orders'), []);
      orders.unshift(order);
      Storage.set(Storage.userKey('orders'), orders);

      // 清空购物车
      Storage.set(Storage.userKey('cart'), []);
      Toast.success('订单提交成功！');
      setTimeout(function () {
        window.location.href = 'order.html';
      }, 1000);
    });
  }

  // ==================== 初始化 ====================
  Auth.updateNav();
  renderCart();
});
