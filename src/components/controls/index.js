import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ store, length, onOpenCart }) {
  function plural(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'товаров';
    }

    if (lastDigit === 1) {
      return 'товар'; // для чисел, оканчивающихся на 1 (кроме 11)
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'товара';
    }

    return 'товаров';
  }

  return (
    <div className="Controls">
      <div className='Cart'>В корзине:</div>
      <span className='Status'>{store.cart.length > 0 ? `${store.cart.length} ${plural(store.cart.length, 'товар', 'товара', 'товаров')} / ${store.sum} ₽ ` : 'пусто'}</span>
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  store: PropTypes.object,
  length: PropTypes.number,
  onOpenCart: PropTypes.func,
};

Controls.defaultProps = {
  onOpenCart: () => { },
};

export default React.memo(Controls);
