function ConfirmModal({ message, onConfirm, onCancel }) {

  return (
    <div style={overlay}>

      <div style={modal}>

        <p>{message}</p>

        <button onClick={onCancel}>Cancel</button>

        <button onClick={onConfirm}>
          Confirm
        </button>

      </div>

    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "6px"
};

export default ConfirmModal;