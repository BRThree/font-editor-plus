interface Listener {
  (...args: any[]): void;
  fn?: Listener;
}
interface Events {
  [eventName: string]: Listener[];
}

class EventEmitter {
  protected events: Events = {};

  /**
   * 订阅事件
   * @param {string} eventName 事件名称
   * @param {Listener} listener 要添加绑定的监听器
   * @returns {EventEmitter}
   */
  on(eventName: string, listener: Listener): EventEmitter {
    if (!this.events[eventName]) {
      this.events[eventName] = [listener];
    } else {
      this.events[eventName].push(listener);
    }
    return this;
  }

  /**
   * 触发指定事件
   *
   * @public
   * @param {string} eventName 事件类型
   * @param {Object} args 透传的事件数据对象
   * @return {EventEmitter}
   */
  emit(eventName: string, ...args: any[]): boolean {
    if (!this.events[eventName]) return false;
    this.events[eventName].forEach((listener: Listener) => listener(...args));
    return true;
  }

  /**
   * 解除事件绑定
   *
   * @public
   * @param {string} eventName 事件类型
   * @param {Listener} listener 要解除绑定的监听器
   * @return {EventEmitter}
   */
  off(eventName: string, listener: Listener): EventEmitter {
    const listeners = this.events[eventName];
    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener || listeners[i] === listener.fn) {
          listeners.splice(i, 1);
        }
      }
    }
    return this;
  }

  /**
   * 添加单次事件绑定
   *
   * @public
   * @param {string} eventName 事件类型
   * @param {Listener} listener 要绑定的监听器
   * @return {EventEmitter}
   */
  once(eventName: string, listener: Listener): EventEmitter {
    const on: Listener = (...args) => {
      listener(...args);
      this.off(eventName, on);
    };
    listener.fn = on;
    this.on(eventName, on);
    return this;
  }
}

export default EventEmitter;
