import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [products, setProducts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    count: "",
    company: "",
    weight: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    count: "",
    company: "",
    weight: "",
  });

  const [editProductId, setEditProductId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: nanoid(),
      fullName: addFormData.fullName,
      count: addFormData.count,
      company: addFormData.company,
      weight: addFormData.weight,
    };

    const newProducts = [...products, newProduct];
    setProducts(newProducts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedProduct = {
      id: editProductId,
      fullName: editFormData.fullName,
      count: editFormData.count,
      company: editFormData.company,
      weight: editFormData.weight,
    };

    const newProducts = [...products];

    const index = products.findIndex((product) => product.id === editProductId);

    newProducts[index] = editedProduct;

    setProducts(newProducts);
    setEditProductId(null);
  };

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      fullName: product.fullName,
      count: product.count,
      company: product.company,
      weight: product.weight,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditProductId(null);
  };

  const handleDeleteClick = (productId) => {
    const newProducts = [...products];

    const index = products.findIndex((product) => product.id === productId);

    newProducts.splice(index, 1);

    setProducts(newProducts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Company</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product,index) => (
              <Fragment key={index}>
                {editProductId === product.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Product</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="count"
          required="required"
          placeholder="Enter an count..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="company"
          required="required"
          placeholder="Enter a company..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="weight"
          required="required"
          placeholder="Enter an weight..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
