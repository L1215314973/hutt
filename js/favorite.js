/**
 * 长安风物志 - 收藏页脚本
 * 依赖：Storage、Auth、Toast 模块
 * 功能：加载收藏列表 | 移除收藏 | 加入购物车 | 权限拦截
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 权限检查 ====================
  if (!Auth.requireAuth('favorite.html')) return;

  // ==================== 收藏数据操作 ====================
  function getFavorites() {
    return Storage.get(Storage.userKey('favorites'), []);
  }

  function saveFavorites(list) {
    Storage.set(Storage.userKey('favorites'), list);
  }

  // ==================== 产品信息查询（精简版，与 products.js 对应） ====================
  var productInfo = {
    1:  { name: '锦绣团扇 · 花鸟卷',   price: 128, img: '../images/products/product1.jpg' },
    2:  { name: '沉香木雕花香囊',       price: 89,  img: '../images/products/product2.jpg' },
    3:  { name: '白玉兰花发簪',         price: 156, img: '../images/products/product3.jpg' },
    4:  { name: '青瓷茶具套装',         price: 268, img: '../images/products/product4.jpg' },
    5:  { name: '宫灯夜明 · 六角纱灯',  price: 198, img: '../images/products/product5.jpg' },
    6:  { name: '兰亭序黄铜书签',       price: 58,  img: '../images/products/product6.jpg' },
    7:  { name: '文房四宝礼盒套装',     price: 388, img: '../images/products/product7.jpg' },
    8:  { name: '青花瓷古风摆件',       price: 168, img: '../images/products/product8.jpg' },
    9:  { name: '苏绣真丝方巾',         price: 238, img: '../images/products/product9.jpg' },
    10: { name: '宜兴紫砂西施壶',       price: 458, img: '../images/products/product10.jpg' },
    11: { name: '手工竹编灯笼',         price: 98,  img: '../images/products/product11.jpg' },
    12: { name: '唐风仕女陶俑',         price: 328, img: '../images/products/product12.jpg' }
  };

  // ==================== 渲染收藏列表 ====================
  function renderFavorites() {
    var favorites = getFavorites();
    var grid = document.getElementById('favoriteGrid');
    var emptyEl = document.getElementById('favoriteEmpty');

    if (favorites.length === 0) {
      grid.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }

    emptyEl.style.display = 'none';
    var html = '';

    favorites.forEach(function (productId) {
      var info = productInfo[productId];
      if (!info) return;

      html += ''
        + '<div class="favorite-card">'
        + '  <div class="card-img">'
        + '    <a href="detail.html?id=' + productId + '">'
        + '      <img src="' + info.img + '" alt="' + info.name + '"'
        + '        onerror="this.style.display=\'none\'; this.parentElement.parentElement.style.background=\'linear-gradient(135deg, #F8F3E8, #EBE0CC)\';">'
        + '    </a>'
        + '    <button class="card-remove" data-id="' + productId + '" title="取消收藏">✕</button>'
        + '  </div>'
        + '  <div class="card-info">'
        + '    <div class="card-name">' + info.name + '</div>'
        + '    <div class="card-price">¥' + info.price + '</div>'
        + '  </div>'
        + '  <div class="card-action">'
        + '    <button class="btn btn-primary btn-sm add-cart-btn" data-id="' + productId + '">加入购物车</button>'
        + '  </div>'
        + '</div>';
    });

    grid.innerHTML = html;

    // 绑定取消收藏
    grid.querySelectorAll('.card-remove').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = parseInt(this.getAttribute('data-id'));
        removeFavorite(id);
      });
    });

    // 绑定加入购物车
    grid.querySelectorAll('.add-cart-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(this.getAttribute('data-id'));
        var info = productInfo[id];
        if (info && typeof addToCart === 'function') {
          addToCart({ id: id, name: info.name, price: info.price });
        }
      });
    });
  }

  // ==================== 移除收藏 ====================
  function removeFavorite(productId) {
    var favorites = getFavorites();
    var index = favorites.indexOf(productId);
    if (index > -1) {
      favorites.splice(index, 1);
      saveFavorites(favorites);
      Toast.info('已取消收藏');
      renderFavorites();
    }
  }

  // ==================== 初始化 ====================
  Auth.updateNav();
  renderFavorites();
});
