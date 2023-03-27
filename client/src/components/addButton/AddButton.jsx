import "./addButton.css";

export const AddButton = ({ setClose }) => {
  return (
    <button className="adminButtonAdd" onClick={() => setClose(true)}>
      Add Product
    </button>
  );
};
