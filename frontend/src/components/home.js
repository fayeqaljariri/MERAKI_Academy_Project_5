import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  updateProduct,
  deletePorduct,
} from "../reducers/products/index";
import "./home.css";
import { Link } from "react-router-dom";
import NavBar from "./navBar";
const Home = () => {
  const state = useSelector((state) => {
    return {
      products: state.products.products,
      token: localStorage.getItem("token"),
    };
  });

  const { token, products } = state;
  const dispatch = useDispatch();

  // ---------------------------------------------
  const [show, setShow] = useState(false);
  const [Price, setPrice] = useState("");
  const [productsShower, setProductsShower] = useState([]);
  const [Product_Name, setProduct_Name] = useState("");
  const [Description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setproductId] = useState("");
  const [userId, setUserId] = useState("");
  const [found, setFound] = useState([]);
  //=================================================================
  const searchSmallerFunc = () => {
    console.log("inside search");
    axios
      .get(`http://localhost:5000/search/${Product_Name}`)
      .then((result) => {
        console.log(result.data.result);
        setFound(result.data.result);
        console.log(found);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
      });
  };
  //======================================================================
  const allProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product");
      console.log(res.data);
      if (res.data.success) {
        dispatch(setProducts(res.data.results));
        setProductsShower(res.data.results);
        setUserId(res.data.userId);
        console.log(userId);
      } else throw Error;
    } catch (error) {
      console.log(error);
    }
  };
  //====================================================================
  const handleUpdateClick = (element) => {
    setUpdateBox(!updateBox);
    setproductId(element.id);
    // setTitle(article.title);
    setDescription(element.description);
    if (updateBox) updateArticle(element.id);
  };
  //=====================================================================
  const updateArticle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/${id}`, {
        Product_Name,
        Description,
        Price,
      });
      allProducts();
      dispatch(updateProduct({ Product_Name, Description, Price }));
    } catch (error) {
      console.log(error);
    }
  };
  //=====================================================================
  useEffect(() => {
    allProducts();
  }, []);
  return (
    <div>
      <div className="product">
        {" "}
        {/* try map on products instead of productsShower */}
        {productsShower &&
          productsShower.map((element, i) => {
            return (
              <div className="productelement" id="renderProduct" key={i}>
                <img
                  className="productimage"
                  src="https://www.notebookcheck.net/fileadmin/_processed_/c/d/csm_Produktfotos_Apple_iPhone_13_Pro_1448_0001583eaa.jpg"
                />
                <p>{element.Product_Name}</p>
                <p>{element.Product_Description}</p>{" "}
                <p>{element.ProductPrice}</p> <p>{element.Category}</p>
                {/* {element.userId === userId && ( */}
                <>
                  {updateBox && productId === element.id && (
                    <form>
                      <br />
                      <input
                        type="text"
                        defaultValue={element.Product_Name}
                        placeholder="product title here"
                        onChange={(e) => setProduct_Name(e.target.value)}
                      />
                      <br />

                      <textarea
                        placeholder="article description here"
                        defaultValue={element.Product_Description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </form>
                  )}
                  {/* <button
                  className="delete"
                  onClick={() => deleteArticle(article.id)}
                >
                  X
                </button> */}
                  <button
                    className="update"
                    onClick={() => handleUpdateClick(element)}
                  >
                    Update
                  </button>
                </>
                {/* )} */}
              </div>
            );
          })}
      </div>
      <div className="Footer">
        <div>Meraki C4 </div>
        <div>Project Done By team A4 </div>
        <div> c 2022 </div>
      </div>
    </div>
  );
};

export default Home;
