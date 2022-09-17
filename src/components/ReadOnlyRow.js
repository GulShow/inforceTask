import React from "react";

const ReadOnlyRow = ({ product, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{product.fullName}</td>
      <td>{product.count}</td>
      <td>{product.company}</td>
      <td>{product.weight}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, product)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(product.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
