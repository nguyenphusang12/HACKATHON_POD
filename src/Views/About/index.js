import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "Store";

function About() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <button
          onClick={() => dispatch(addProduct({ name: Math.random() * 100000 }))}
        >
          Add product
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(deleteProduct())}>
          Remove product
        </button>
      </div>

      <ul>
        <h2>List Product</h2>
        {products.map((item, index) => (
          <h2 key={index}>{item.name}</h2>
        ))}
      </ul>

      <div>
        <Link to="/home">Home</Link>
      </div>
    </>
  );
}
export default About;
