import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.cart = []
    this.sum = 0
    this.flag = false
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  getCart() {
    return this.cart
  }
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
  addToCart(code) {
    const product = this.state.list.find(item => item.code === code);
    if (product) {
      const cartItem = this.cart.find(item => item.code === code);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    }
    this.updateCart()
  }
  makeSum() {
    this.sum = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.setState({
      ...this.state,
      ...this.cart,
      ...this.flag,
      sum: this.sum,
    });
  }
  removeFromCart(code) {
    this.cart = this.cart.filter(item => item.code !== code);
    this.updateCart()
  }
  onOpenCart() {
    this.flag = true
    this.setState({
      ...this.state,
      ...this.sum,
      ...this.cart,
      flag: this.flag
    })
  }
  onCloseCart() {
    this.flag = false
    this.setState({
      ...this.state,
      ...this.sum,
      ...this.cart,
      flag: this.flag
    })
  }
  updateCart() {
    this.setState({
      ...this.state,
      ...this.sum,
      ...this.flag,
      cart: this.cart
    });
  }
}

export default Store;
