/**
 * 长安风物志 - 注册页脚本
 * 依赖：Storage、Toast、Auth 模块
 * 功能：表单验证 | 手机号唯一性检查 | 注册并跳转登录
 */

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('registerForm');
  if (!form) return;

  var usernameInput = document.getElementById('username');
  var phoneInput    = document.getElementById('phone');
  var passwordInput = document.getElementById('password');
  var confirmInput  = document.getElementById('confirmPassword');

  var usernameError = document.getElementById('usernameError');
  var phoneError    = document.getElementById('phoneError');
  var passwordError = document.getElementById('passwordError');
  var confirmError  = document.getElementById('confirmError');

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
    // 输入时清除错误
    input.addEventListener('input', function () {
      this.classList.remove('error');
    });
  });

  // ==================== 表单提交 ====================
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var isValid = true;
    var username = usernameInput.value.trim();
    var phone    = phoneInput.value.trim();
    var password = passwordInput.value;
    var confirm  = confirmInput.value;

    // 1. 用户名验证
    if (username === '') {
      showError(usernameInput, usernameError, '请输入用户名');
      isValid = false;
    } else if (username.length < 2 || username.length > 12) {
      showError(usernameInput, usernameError, '用户名长度应为2-12个字符');
      isValid = false;
    } else if (!/^[一-龥a-zA-Z0-9]+$/.test(username)) {
      showError(usernameInput, usernameError, '用户名只能包含中文、英文或数字');
      isValid = false;
    }

    // 2. 手机号验证（格式 + 唯一性）
    if (phone === '') {
      showError(phoneInput, phoneError, '请输入手机号');
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      showError(phoneInput, phoneError, '请输入正确的11位手机号');
      isValid = false;
    } else if (Auth.findUserByPhone(phone)) {
      showError(phoneInput, phoneError, '该手机号已被注册，请直接登录');
      isValid = false;
    }

    // 3. 密码验证
    if (password === '') {
      showError(passwordInput, passwordError, '请输入密码');
      isValid = false;
    } else if (password.length < 6) {
      showError(passwordInput, passwordError, '密码长度不能少于6位');
      isValid = false;
    } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      showError(passwordInput, passwordError, '密码需同时包含字母和数字');
      isValid = false;
    }

    // 4. 确认密码验证
    if (confirm === '') {
      showError(confirmInput, confirmError, '请再次输入密码');
      isValid = false;
    } else if (confirm !== password) {
      showError(confirmInput, confirmError, '两次输入的密码不一致');
      isValid = false;
    }

    // ==================== 执行注册 ====================
    if (isValid) {
      var result = Auth.register({
        username: username,
        phone: phone,
        password: password
      });

      if (result.success) {
        Toast.success('注册成功！即将跳转登录页...');
        setTimeout(function () {
          window.location.href = 'login.html';
        }, 1200);
      } else {
        Toast.error(result.message);
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
    usernameError.textContent = '';
    phoneError.textContent = '';
    passwordError.textContent = '';
    confirmError.textContent = '';
  }

});
