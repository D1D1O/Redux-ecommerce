import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

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

  handleAddProduct = id =>{
    const {addToCartRequest} = this.props;
    addToCartRequest(id);
  }

  render(){

    const { products } = this.state;
    const { amount } = this.props;

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
            <button type="button" onClick={() => this.handleAddProduct(product.id) }>
              <div>
                <MdAddShoppingCart size={16} color="#FFF"></MdAddShoppingCart>
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions,dispatch);

const mapStatetoprops = state =>({
  amount: state.cart.reduce ((amount,product) =>{
    amount[product.id] = product.amount || 0;
    return amount;
  },{})
});


export default connect(mapStatetoprops,mapDispatchToProps)(Home);