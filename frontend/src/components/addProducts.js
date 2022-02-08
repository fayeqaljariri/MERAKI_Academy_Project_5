import React, { useContext, useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../reducers/products/index";

//===============================================================

const NewProduct = () => {
  const history = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const { token, isLoggedIn } = state;

  const dispatch = useDispatch();
  const [Image, setImage] = useState("");
  // const [url, setUrl] = useState("");
  const [img, setimg] = useState("");
  // const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [Product_Name, setProduct_Name] = useState("");
  const [Price, setPrice] = useState(0);
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  // }; //===============================================================
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "oodpuzew");
      data.append("cloud_name", "aljariri");

      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/aljariri/image/upload",
        data
      );
      console.log(result);
      console.log(img);
      console.log(typeof result.data.url);
      if (result.data.url) {
        console.log("cloud")
        setImage(result.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  {
  }
  const createNewProduct = async (e) => {
    e.preventDefault();
    try {
      // const product = {
      //   Product_Name,
      //   Price,
      //   Description,
      //   Category,
      // };
      console.log(Image);
      const result = await axios.post(
        "http://localhost:5000/product",
        {
          Product_Name,
          Price,
          Description,
          Category,
          Image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(Image);

      console.log(result.data);
      if (result.data.success) {
        setStatus(true);
        console.log("dddd");
        dispatch(
          addProducts({
            Product_Name,
            Description,
            Price,
            Category,
            Image,
          })
        );
        setMessage("The product has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history("/login");
    }
  });

  //===============================================================
  return (
    <div id="addProductBackGround">
      <>

        {/* <div id="categoryNavBar">
          <Link className="categoryLinks" to={"/"}>
            <h2 id="logoCategory">Xchange</h2>
          </Link>
          <div id="categoryLinksDiv">
            <Link className="categoryLinks" to={"/Home"}>
              Home
            </Link>
            <Link className="categoryLinks" to={"/category"}>
              category
            </Link>
            <Link className="categoryLinks" to={"/addproduct"}>
              add Product
            </Link>
            {state.token ? (
              <Link className="categoryLinks" to={"/logout"}>
                logout
              </Link>
            ) : (
              <Link className="categoryLinks" to={"/login"}>
                login
              </Link>
            )}
          </div> */}
        {/* </div> */}
        <form id="form" onSubmit={createNewProduct}>
          <br />
          <input
            id="postTitle"
            type="text"
            placeholder="Product name here"
            onChange={(e) => setProduct_Name(e.target.value)}
          />
          <br />
          <textarea
            id="PostDescription"
            placeholder="product description here"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <textarea
            id="PostPrice"
            placeholder="product price here"
            onChange={(e) => setPrice(e.target.value)}
          ></textarea>
          <br />
          <input
            type="file"
            onChange={(e) => setimg(e.target.files[0])}
          ></input>
          <button onClick={uploadImage}>Upload</button>
          <div>
            <select
              id="categorySelector"
              placeholder="category"
              id="categorySelector"
              onClick={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option>vehicles</option>
              <option>clothes</option>
              <option>pc</option>
              <option>phones</option>
              <option>tools</option>
              <option>realEstate</option> options
            </select>
          </div>{" "}
          <button id="createPost">Create New product</button>
        </form>
        <br />
        {status
          ? message && (
              <div className="SuccessMessage">
                {message} && <p>{console.log(status)}</p>
              </div>
            )
          : message && (
              <div className="ErrorMessage">
                {message}
                <p>{console.log(status)}</p>
              </div>
            )}
      </>
    </div>
  );
};

export default NewProduct;
//5.2.11.36
