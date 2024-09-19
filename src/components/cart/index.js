import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cart({ store, flag, cart, onCloseCart, sum, onDelete }) {

    return (
        (flag && <div className='modal-overlay'>
            <div className="modal">
                <div className="modal-header">
                    <h2>Корзина</h2>
                    <button onClick={onCloseCart}>Закрыть</button>
                </div>

                <ul className="cart-items">
                    {
                        cart.map(item => (
                            <li class="cart-item" key={item.code}>
                                <span>{item.code}</span>
                                <span className="cart-item-name">{item.title}</span>
                                <span className="cart-item-price">{item.price}</span>
                                <span className="cart-item-quantity">{item.quantity + ' шт'}</span>
                                <button onClick={() => onDelete(item.code)}>Удалить</button>
                            </li>
                        ))
                    }
                </ul>

                <div className="cart-total">
                    <span>Итого</span>
                    <span>{sum}</span>
                </div>
            </div>
        </div>)


    );
}

Cart.propTypes = {
    store: PropTypes.object,
    cart: PropTypes.array,
    flag: PropTypes.bool,
    sum: PropTypes.number,
    onCloseCart: PropTypes.func,
    onDelete: PropTypes.func,

};

export default React.memo(Cart);