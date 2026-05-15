/**
 * 长安风物志 - 商品展示页脚本
 * 功能：商品数据 | 分类筛选 | 搜索过滤 | 动态渲染 | 加入购物车
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 商品数据 ====================
  var products = [
    { id: 1,  name: '锦绣团扇 · 花鸟卷',   category: 'fan',       price: 128,  desc: '手工苏绣双面团扇，丝线细腻栩栩如生', img: '../images/products/product1.jpg' },
    { id: 2,  name: '沉香木雕花香囊',       category: 'sachet',    price: 89,   desc: '天然沉香木手工雕刻，暗香浮动安神养心', img: '../images/products/product2.jpg' },
    { id: 3,  name: '白玉兰花发簪',         category: 'hairpin',   price: 156,  desc: '天然白玉精雕兰花，温润典雅步摇生姿', img: '../images/products/product3.jpg' },
    { id: 4,  name: '青瓷茶具套装',         category: 'tea',       price: 268,  desc: '龙泉青瓷一壶四杯，釉色温润如雨后初晴', img: '../images/products/product4.jpg' },
    { id: 5,  name: '宫灯夜明 · 六角纱灯',  category: 'lantern',   price: 198,  desc: '传统六角宫灯造型，柔光映照营造古风意境', img: '../images/products/product5.jpg' },
    { id: 6,  name: '兰亭序黄铜书签',       category: 'bookmark',  price: 58,   desc: '蚀刻《兰亭集序》全文，黄铜做旧古意盎然', img: '../images/products/product6.jpg' },
    { id: 7,  name: '文房四宝礼盒套装',     category: 'stationery',price: 388,  desc: '湖笔徽墨宣纸端砚，雅士书房必备之选', img: '../images/products/product7.jpg' },
    { id: 8,  name: '青花瓷古风摆件',       category: 'ornament',  price: 168,  desc: '景德镇手工青花，案头雅物增添文人气息', img: '../images/products/product8.jpg' },
    { id: 9,  name: '苏绣真丝方巾',         category: 'fan',       price: 238,  desc: '苏州绣娘手工刺绣，百蝶穿花图案', img: '../images/products/product9.jpg' },
    { id: 10, name: '宜兴紫砂西施壶',       category: 'tea',       price: 458,  desc: '原矿紫泥手工拉坯，泡茶隔夜不馊', img: '../images/products/product10.jpg' },
    { id: 11, name: '手工竹编灯笼',         category: 'lantern',   price: 98,   desc: '非遗竹编工艺，暖黄灯光营造中式浪漫', img: '../images/products/product11.jpg' },
    { id: 12, name: '唐风仕女陶俑',         category: 'ornament',  price: 328,  desc: '复刻唐代仕女俑，丰腴华贵尽显盛唐气象', img: '../images/products/product12.jpg' },
    { id: 13, name: '金丝楠木书签',         category: 'bookmark',  price: 78,   desc: '金丝楠木手工打磨，木纹瑰丽温润', img: '../images/products/product13.jpg' },
    { id: 14, name: '翡翠玉兰花发簪',       category: 'hairpin',   price: 298,  desc: '天然翡翠精工细作，冰种飘花雅致动人', img: '../images/products/product14.jpg' },
    { id: 15, name: '徽墨古法松烟墨锭',     category: 'stationery',price: 168,  desc: '古法松烟制墨，墨色乌黑发亮历久弥新', img: '../images/products/product15.jpg' },
    { id: 16, name: '檀香木雕香囊球',       category: 'sachet',    price: 128,  desc: '老山檀香整木镂空雕刻，随身佩戴暗香袭人', img: '../images/products/product16.jpg' }
  ];

  var currentCategory = 'all';
  var currentSearch = '';

  var grid = document.getElementById('productsGrid');
  var resultCount = document.getElementById('resultCount');
  var searchInput = document.getElementById('searchInput');
  var searchBtn = document.getElementById('searchBtn');
  var categoryList = document.getElementById('categoryList');

  if (!grid) return;

  // ==================== 渲染商品列表 ====================
  function renderProducts() {
    // 筛选
    var filtered = products.filter(function (p) {
      var matchCategory = (currentCategory === 'all' || p.category === currentCategory);
      var matchSearch = true;
      if (currentSearch) {
        var keyword = currentSearch.toLowerCase();
        matchSearch = p.name.toLowerCase().indexOf(keyword) !== -1 ||
                      p.desc.toLowerCase().indexOf(keyword) !== -1;
      }
      return matchCategory && matchSearch;
    });

    // 更新计数
    resultCount.textContent = '共 ' + filtered.length + ' 件商品';

    // 无结果
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="no-result"><span class="no-result-icon">📭</span>暂无匹配的商品<br>试试其他关键词吧</div>';
      return;
    }

    // 渲染卡片
    var html = '';
    filtered.forEach(function (p) {
      html += ''
        + '<article class="product-card">'
        + '  <div class="card-img">'
        + '    <img src="' + p.img + '" alt="' + p.name + '"'
        + '      onerror="this.style.display=\'none\'; this.parentElement.style.background=\'linear-gradient(135deg, #F8F3E8, #EBE0CC)\';">'
        + '  </div>'
        + '  <div class="card-info">'
        + '    <h3 class="card-name">' + p.name + '</h3>'
        + '    <p class="card-desc">' + p.desc + '</p>'
        + '    <div class="card-bottom">'
        + '      <span class="card-price"><span class="unit">¥</span>' + p.price + '</span>'
        + '      <button class="card-cart-btn" aria-label="加入购物车" data-id="' + p.id + '">+</button>'
        + '    </div>'
        + '  </div>'
        + '</article>';
    });

    grid.innerHTML = html;

    // 绑定添加购物车事件
    grid.querySelectorAll('.card-cart-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(this.getAttribute('data-id'));
        var product = products.find(function (p) { return p.id === id; });
        if (product && typeof addToCart === 'function') {
          addToCart({ id: product.id, name: product.name, price: product.price });
        }
      });
    });

    // 绑定点击跳转详情
    grid.querySelectorAll('.product-card').forEach(function (card, index) {
      card.addEventListener('click', function () {
        // 找到对应商品 ID 跳转
        var btn = card.querySelector('.card-cart-btn');
        if (btn) {
          var id = btn.getAttribute('data-id');
          window.location.href = 'detail.html?id=' + id;
        }
      });
      card.style.cursor = 'pointer';
    });
  }

  // ==================== 分类筛选 ====================
  if (categoryList) {
    categoryList.addEventListener('click', function (e) {
      e.preventDefault();
      var item = e.target.closest('.category-item');
      if (!item) return;

      // 更新高亮
      categoryList.querySelectorAll('.category-item').forEach(function (el) {
        el.classList.remove('active');
      });
      item.classList.add('active');

      // 更新分类
      currentCategory = item.getAttribute('data-category');
      renderProducts();
    });
  }

  // ==================== 搜索功能 ====================
  function doSearch() {
    currentSearch = searchInput.value.trim();
    renderProducts();
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', doSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  // ==================== 读取 URL 参数（从首页分类进入） ====================
  var urlParams = new URLSearchParams(window.location.search);
  var categoryParam = urlParams.get('category');
  if (categoryParam) {
    currentCategory = categoryParam;
    // 更新侧边栏高亮
    if (categoryList) {
      categoryList.querySelectorAll('.category-item').forEach(function (el) {
        el.classList.remove('active');
        if (el.getAttribute('data-category') === categoryParam) {
          el.classList.add('active');
        }
      });
    }
  }

  // ==================== 首次渲染 ====================
  renderProducts();
  updateCartBadge();
});
