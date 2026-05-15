/**
 * 长安风物志 - Toast 消息提示模块
 * 全局可用，支持 success / error / info / warning 四种类型
 */

var Toast = (function () {
  'use strict';

  var defaults = {
    duration: 2000,   // 显示时长（毫秒）
    position: 'top'   // top | center | bottom
  };

  /**
   * 显示 Toast 提示
   * @param {string} message - 提示文字
   * @param {string} type - 类型：success | error | info | warning
   * @param {number} [duration] - 自定义显示时长
   */
  function show(message, type, duration) {
    type = type || 'info';
    duration = duration || defaults.duration;

    // 移除已有 toast
    var existing = document.querySelector('.toast-overlay');
    if (existing) { existing.remove(); }

    // 创建容器
    var overlay = document.createElement('div');
    overlay.className = 'toast-overlay';

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    overlay.appendChild(toast);
    document.body.appendChild(overlay);

    // 入场动画
    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    // 自动隐藏
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        if (overlay.parentNode) {
          overlay.remove();
        }
      }, 300);
    }, duration);
  }

  function success(msg, dur) { show(msg, 'success', dur); }
  function error(msg, dur)   { show(msg, 'error', dur); }
  function info(msg, dur)    { show(msg, 'info', dur); }
  function warning(msg, dur) { show(msg, 'warning', dur); }

  return {
    show: show,
    success: success,
    error: error,
    info: info,
    warning: warning
  };

})();
