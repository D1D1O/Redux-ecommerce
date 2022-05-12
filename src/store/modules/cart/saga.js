import { call,put, all, takeLatest, select } from 'redux-saga/effects'
import { toast } from 'react-toastify';
import api from "../../../services/api";
import { addToCartSuccess,updateAmountSuccess } from './actions';
import { formatPrice } from '../../../util/format';

function* addTocart({id}){

  const productExists = yield select(
    state => state.cart.find(p=> p.id === id),
  );

  const stock = yield call(api.get,`/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1 ;

  if (amount > stockAmount){
    console.tron.warn('ERRO');
    toast.error('Quantidade fora do estoque');
    return;
  }


  if (productExists){
    
    yield put(updateAmountSuccess(id,amount));
  } else {
    const response = yield call(api.get,`/products/${id}`);
    const data = {
      ...response.data,
      amount:1,
      priceFormated: formatPrice(response.data.price)
    }
    yield put(addToCartSuccess(data));

  }
}

function* updateAmount({id, amount}){
  if (amount <= 0) return;

  const stock = yield call(api.get,`stock/${id}`);
  const stockAmount = stock.data.amount;
  console.log(stock);
  console.log(stockAmount);
  
  if (amount > stockAmount){
    toast.error('Quantidade fora do estoque');
    return;
  }

  yield put(updateAmountSuccess(id,amount));

}

export default all([
  takeLatest('@cart/ADD_REQUEST',addTocart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST',updateAmount),
]);