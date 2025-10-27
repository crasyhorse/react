type PropData = {
  text: string;
  type: "primary" | "secondary" | "danger";
  onClose: () => void;
}

const Alert = ({ text, type, onClose }: PropData) => {
  return (
    <div
      data-bs-dismiss="alert"
      className={`alert alert-${type} isDismissible ? alert-dismissible : '' fade show`}
      role="alert"
    >
      <strong>{text}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Ok"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
