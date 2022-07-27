import ReactDOM from "react-dom";

const modalRoot = document.getElementById("app-modal");
const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="model-container">{children}</div>,
    modalRoot
  );
};

export default Modal;
