/**
 * 长安风物志 - 本地存储工具
 * 封装 localStorage 操作，统一读写接口与异常处理
 */

var Storage = (function () {
  'use strict';

  /**
   * 读取数据
   * @param {string} key - 存储键名
   * @param {*} fallback - 数据不存在时的默认值
   * @returns {*} 解析后的数据
   */
  function get(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) {
        return fallback !== undefined ? fallback : null;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage.get 解析失败: ' + key, e);
      return fallback !== undefined ? fallback : null;
    }
  }

  /**
   * 写入数据
   * @param {string} key - 存储键名
   * @param {*} value - 要存储的值（会自动 JSON 序列化）
   */
  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage.set 写入失败: ' + key, e);
      return false;
    }
  }

  /**
   * 删除数据
   * @param {string} key - 存储键名
   */
  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 检查键是否存在
   * @param {string} key
   * @returns {boolean}
   */
  function has(key) {
    return localStorage.getItem(key) !== null;
  }

  /**
   * 获取当前用户的专属键名（带用户ID前缀）
   * @param {string} baseKey - 基础键名
   * @returns {string} 用户专属键名
   */
  function userKey(baseKey) {
    var currentUser = get('currentUser');
    var userId = currentUser ? currentUser.phone : 'guest';
    return baseKey + '_' + userId;
  }

  // 对外暴露
  return {
    get: get,
    set: set,
    remove: remove,
    has: has,
    userKey: userKey
  };

})();
