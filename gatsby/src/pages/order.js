import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });

  const pizzas = data.pizzas.nodes;

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    inputs: values,
  });

  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="Order Pizza" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset className="order" disabled={loading}>
          <legend>Your Info</legend>
          <div className="form-group">
            <label htmlFor="name">
              Name
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={updateValue}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <br />
              <input
                type="email"
                id="email"
                name="email"
                onChange={updateValue}
              />
            </label>
          </div>
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza, index) => (
            <MenuItemStyles className="pizza" key={`${pizza.id}-${index}`}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div className="pizza__body">
                <h2 className="pizza__name">{pizza.name}</h2>
                <div>
                  {['S', 'M', 'L'].map((size) => (
                    <button
                      type="button"
                      onClick={() =>
                        addToOrder({
                          id: pizza.id,
                          size,
                        })
                      }
                      key={`${pizza.id}-${index}-${size}`}
                    >
                      {size}{' '}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
