import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart'
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.cart
  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.removeFromCart(code);
        store.makeSum()
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addToCart(code);
        store.makeSum()
      },
      [store],
    ),

    onOpenCart: useCallback(() => {
      store.onOpenCart()
    }, []),
    onCloseCart: useCallback(() => {
      store.onCloseCart()

    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />

      <Controls store={store} length={store.cart.length} sum={store.sum} onOpenCart={callbacks.onOpenCart} onDeleteItem={callbacks.onDeleteItem} />
      <Cart flag={store.flag} store={store} onCloseCart={callbacks.onCloseCart} onDelete={callbacks.onDeleteItem} cart={cart} length={store.cart.length} sum={store.sum} />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
