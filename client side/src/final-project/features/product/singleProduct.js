import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import milki from '../../app/images/חלבי.jpg'
import vegan from '../../app/images/טבעוני.png'
import gluten from '../../app/images/ללאגלוטן.png'
import empty from '../../app/images/e.png'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneProduct, fetchProductt } from './productsSlice';
import { updateCart } from '../order/ordersSlice'

export default function SingleProduct({ up, product }) {

  const cart = useSelector(s => s.order.newOrder.cart).filter(x=>x.id===product);
  const dispatch = useDispatch();
  const user = useSelector(s => s.user.currentUser);
  const [inCart, setInCart] = React.useState(cart.length!==0);
  const [p, setP] = React.useState({});

  const fetchProduct = async () => {
    const u = await dispatch(fetchProductt(product));
    setP(u.payload);
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = () => {
    debugger;
    const pp = { "id": p.id, "num": 1 }
    dispatch(updateCart(pp));
    setInCart(true);
  }

  const deleteFromCart = () => {
    debugger;
    const pp = { "id": p.id, "num": 0 }
    dispatch(updateCart(pp));
    setInCart(false);
  }

  const changeAmount = (event) => {
    debugger;
    const pp = { "id": p.id, "num": parseInt(event.target.value) }
    dispatch(updateCart(pp));
  }

  const deleteCake = () => {
    const res = window.confirm("האם אתה בטוח שברצונך למחוק את העוגה " + p.name + " מהאתר?");
    if (res)
      dispatch(deleteOneProduct(p.id));
    else
      console.log("Deletion canceled");
  }

  const editCake = () => {
    up(p.id);
  }

  return (
    <Card sx={{ maxWidth: 300, direction: 'rtl' }}>
      <div style={{ marginLeft: '10px', direction: 'ltr', display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap' }}>
        {p.isMilki && p.isMilki !== "false" ? <CardMedia sx={{ height: 35, width: 35 }} component="img" image={milki} title="milki" /> : null}
        {p.isVegan && p.isVegan !== "false" ? <CardMedia sx={{ height: 35, width: 35 }} component="img" image={vegan} title="vegan" /> : null}
        {p.isGluten && p.isGluten === "false" ? <CardMedia sx={{ height: 35, width: 35 }} component="img" image={gluten} title="gluten" /> : null}
        {p.isMilki === "false" && p.isVegan === "false" && p.isGluten !== "false" ? <CardMedia sx={{ height: 35, width: 35 }} component="img" image={empty} title="null" /> : null}
      </div>
      <CardMedia
        sx={{ height: 200, width: 'auto' }}
        component="img"
        image={"http://localhost:4000/" + p.image}
        title={p.name}
      />
      <CardHeader
        title={p.name}
        subheader={p.description}
      ></CardHeader>
      <CardActions disableSpacing>
        <CardHeader title={p.price + "₪"} />
        {user.id !== 0 ?
          (!inCart ?
            (<IconButton onClick={addToCart} aria-label="add to cart"><AddShoppingCartIcon /></IconButton>)
            : (<><IconButton onClick={deleteFromCart} aria-label="delete from cart"><RemoveShoppingCartIcon /></IconButton><input onChange={changeAmount} type='number' size={5} defaultValue={cart[0].num} max={10} min={1} /></>))
          : (<><IconButton onClick={deleteCake} aria-label="delete"><DeleteIcon /></IconButton><IconButton onClick={editCake}><EditIcon></EditIcon></IconButton></>)}
      </CardActions>
    </Card>
  );
}