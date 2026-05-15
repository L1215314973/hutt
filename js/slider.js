/**
 * 长安风物志 - 轮播图脚本
 * 功能：自动轮播 | 左右切换 | 圆点切换 | 触摸滑动
 */

document.addEventListener('DOMContentLoaded', function () {

  var banner = document.querySelector('.hero-banner');
  if (!banner) return;

  var track = banner.querySelector('.banner-track');
  var slides = banner.querySelectorAll('.banner-slide');
  var dotsContainer = banner.querySelector('.banner-dots');
  var prevBtn = banner.querySelector('.banner-arrow.prev');
  var nextBtn = banner.querySelector('.banner-arrow.next');

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var slideCount = slides.length;
  var autoTimer = null;
  var isTransitioning = false;

  // ==================== 创建小圆点 ====================
  if (dotsContainer) {
    for (var i = 0; i < slideCount; i++) {
      var dot = document.createElement('span');
      dot.className = 'banner-dot';
      dot.setAttribute('data-index', i);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        var index = parseInt(this.getAttribute('data-index'));
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    }
  }

  var dots = banner.querySelectorAll('.banner-dot');

  // ==================== 跳转到指定幻灯片 ====================
  function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    isTransitioning = true;

    // 循环处理
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    currentIndex = index;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

    // 更新圆点状态
    updateDots();

    // 过渡完成后解锁
    setTimeout(function () {
      isTransitioning = false;
    }, 600);
  }

  // ==================== 更新圆点状态 ====================
  function updateDots() {
    dots.forEach(function (dot, i) {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // ==================== 自动轮播 ====================
  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, 4000);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  startAutoPlay();

  // 鼠标悬停暂停
  banner.addEventListener('mouseenter', stopAutoPlay);
  banner.addEventListener('mouseleave', startAutoPlay);

  // ==================== 左右按钮 ====================
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentIndex + 1);
    });
  }

  // ==================== 触摸滑动支持 ====================
  var touchStartX = 0;
  var touchEndX = 0;

  banner.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  banner.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    var diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // 左滑 -> 下一张
        goToSlide(currentIndex + 1);
      } else {
        // 右滑 -> 上一张
        goToSlide(currentIndex - 1);
      }
    }

    startAutoPlay();
  });

});
