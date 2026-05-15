/**
 * 长安风物志 - 订单页脚本
 * 依赖：Storage、Auth、Toast 模块
 * 功能：按用户隔离订单 | 状态筛选 | 订单删除 | 颜色区分
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 权限检查 ====================
  if (!Auth.requireAuth('order.html')) return;

  // ==================== 订单数据（按用户隔离） ====================
  function getOrders() {
    return Storage.get(Storage.userKey('orders'), []);
  }

  function saveOrders(orders) {
    Storage.set(Storage.userKey('orders'), orders);
  }

  var currentFilter = 'all';

  var statusMap = {
    pending:   { text: '待付款',  class: 'status-pending' },
    shipped:   { text: '待发货',  class: 'status-shipped' },
    completed: { text: '已完成',  class: 'status-completed' }
  };

  // ==================== 渲染订单列表 ====================
  function renderOrders() {
    var orders = getOrders();
    var listEl = document.getElementById('orderList');
    var emptyEl = document.getElementById('orderEmpty');

    if (currentFilter !== 'all') {
      orders = orders.filter(function (o) { return o.status === currentFilter; });
    }

    if (orders.length === 0) {
      listEl.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }

    emptyEl.style.display = 'none';
    var html = '';

    orders.forEach(function (order, index) {
      var si = statusMap[order.status] || statusMap.pending;
      var itemsHtml = order.items.map(function (item) {
        if (item.id) {
          return '<a href="detail.html?id=' + item.id + '" class="order-item-name order-item-link">' + item.name + ' ×' + item.quantity + '</a>';
        }
        return '<span class="order-item-name">' + item.name + ' ×' + item.quantity + '</span>';
      }).join('');

      html += ''
        + '<div class="order-card">'
        + '  <div class="order-header">'
        + '    <div class="order-header-left">'
        + '      <span class="order-label">订单编号：</span>'
        + '      <span class="order-id">' + order.id + '</span>'
        + '      <span class="order-time">' + order.time + '</span>'
        + '    </div>'
        + '    <div class="order-header-right">'
        + '      <span class="order-status ' + si.class + '">' + si.text + '</span>'
        + '      <button class="order-delete-btn" data-index="' + index + '" title="删除订单">🗑</button>'
        + '    </div>'
        + '  </div>'
        + '  <div class="order-body">'
        + '    <div class="order-items">' + itemsHtml + '</div>'
        + '    <div class="order-meta">'
        + '      <div class="order-meta-item"><span>收货地址</span>' + (order.address || '未填写') + '</div>'
        + '      <div class="order-meta-item"><span>支付方式</span>' + (order.payment || '未选择') + '</div>'
        + '      <div class="order-meta-item order-total"><span>订单总额</span>¥' + order.total.toFixed(2) + '</div>'
        + '    </div>'
        + '  </div>'
        + '</div>';
    });

    listEl.innerHTML = html;

    // 绑定删除按钮
    listEl.querySelectorAll('.order-delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'));
        deleteOrder(idx);
      });
    });
  }

  // ==================== 删除订单 ====================
  function deleteOrder(index) {
    var orders = getOrders();
    // 需要从当前筛选后的列表中定位原始索引
    // 由于筛选可能改变了顺序，统一重新获取全量数据来定位
    var allOrders = Storage.get(Storage.userKey('orders'), []);

    // 按筛选条件找到对应的原始订单
    if (currentFilter !== 'all') {
      var filtered = [];
      var filteredIndex = 0;
      for (var i = 0; i < allOrders.length; i++) {
        if (allOrders[i].status === currentFilter) {
          if (filteredIndex === index) {
            allOrders.splice(i, 1);
            break;
          }
          filteredIndex++;
        }
      }
    } else {
      if (index >= 0 && index < allOrders.length) {
        var orderId = allOrders[index].id;
        allOrders.splice(index, 1);
      }
    }

    saveOrders(allOrders);
    Toast.info('订单已删除');
    renderOrders();
  }

  // ==================== Tab 筛选 ====================
  document.querySelectorAll('.order-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.order-tab').forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      currentFilter = this.getAttribute('data-status');
      renderOrders();
    });
  });

  // ==================== 初始化 ====================
  Auth.updateNav();
  renderOrders();
});
