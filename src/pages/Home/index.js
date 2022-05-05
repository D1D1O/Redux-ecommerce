import React, {Component} from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

class Home extends Component {
  state ={
    products: [],
  };

  async componentDidMount(){
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data})

    //console.log(this.state.products);
  }

  render(){

    const { products } = this.state;
    console.log(products);

    return (
      <ProductList>

        {
        products.map(product =>(
          <li key={product.id}>
            <img
            src={product.image}
            alt={product.title}
            />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted} </span>
            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="#FFF"></MdAddShoppingCart>
                3
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

export default Home;