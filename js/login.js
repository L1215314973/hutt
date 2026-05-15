/**
 * 长安风物志 - 登录页脚本
 * 依赖：Storage、Toast、Auth 模块
 * 功能：手机号+密码登录验证 | 登录成功跳转
 */

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('loginForm');
  if (!form) return;

  var phoneInput    = document.getElementById('phone');
  var passwordInput = document.getElementById('password');
  var phoneError    = document.getElementById('phoneError');
  var passwordError = document.getElementById('passwordError');

  var allInputs = form.querySelectorAll('input');

  // ==================== 输入框聚焦效果 ====================
  allInputs.forEach(function (input) {
    input.addEventListener('focus', function () {
      var icon = this.parentElement.querySelector('.input-icon');
      if (icon) { icon.style.opacity = '1'; icon.style.transform = 'scale(1.1)'; }
    });
    input.addEventListener('blur', function () {
      var icon = this.parentElement.querySelector('.input-icon');
      if (icon) { icon.style.opacity = '0.7'; icon.style.transform = 'scale(1)'; }
    });
    input.addEventListener('input', function () {
      this.classList.remove('error');
    });
  });

  // ==================== 表单提交 ====================
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var isValid = true;
    var phone    = phoneInput.value.trim();
    var password = passwordInput.value;

    // 1. 手机号格式验证
    if (phone === '') {
      showError(phoneInput, phoneError, '请输入手机号');
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      showError(phoneInput, phoneError, '请输入正确的11位手机号');
      isValid = false;
    }

    // 2. 密码非空验证
    if (password === '') {
      showError(passwordInput, passwordError, '请输入密码');
      isValid = false;
    } else if (password.length < 6) {
      showError(passwordInput, passwordError, '密码长度不能少于6位');
      isValid = false;
    }

    // ==================== 执行登录 ====================
    if (isValid) {
      var result = Auth.login({ phone: phone, password: password });

      if (result.success) {
        Toast.success('登录成功！欢迎回来，' + result.user.username);

        // 检查是否需要跳回之前拦截的页面
        var urlParams = new URLSearchParams(window.location.search);
        var redirect = urlParams.get('redirect') || '../index.html';

        // 如果 redirect 是从 pages/ 内页来的相对路径，保持原样
        // 如果是 requireAuth 生成的，已经在 getBase() 时处理过

        setTimeout(function () {
          window.location.href = redirect;
        }, 800);
      } else {
        // 显示具体错误（手机号未注册 或 密码错误）
        Toast.error(result.message);
        if (result.field === 'phone') {
          showError(phoneInput, phoneError, result.message);
        } else if (result.field === 'password') {
          showError(passwordInput, passwordError, result.message);
        }
      }
    }
  });

  // ==================== 辅助函数 ====================
  function showError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
  }

  function clearErrors() {
    allInputs.forEach(function (input) {
      input.classList.remove('error', 'success');
    });
    phoneError.textContent = '';
    passwordError.textContent = '';
  }

});
