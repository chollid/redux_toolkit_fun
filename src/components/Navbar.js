import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  // useSelector is a hook that allows us to access the store
  // it takes a callback function as a parameter
  // the callback function receives the store as a parameter
  // we can then return the part of the store we want to use
  // in this case we want to use the cart part of the store
  // we can then destructure the amount property from the cart part of the store
  // we can then use the amount property in our component
  const { amount } = useSelector((store) => {
    return store.cart;
  });

  return (
    <nav>
      <div className="nav-center">
        <h3>Redux Toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
