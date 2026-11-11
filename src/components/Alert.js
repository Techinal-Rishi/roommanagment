import React from 'react';

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const getAlertIcon = (type) => {
    if (type === "success") return "fa-solid fa-circle-check text-success";
    if (type === "danger" || type === "error") return "fa-solid fa-circle-exclamation text-danger";
    return "fa-solid fa-circle-info text-primary";
  };

  return (
    <div style={{ minHeight: '56px' }} className="alert-container-wrapper">
      {props.alert && (
        <div
          className={`alert modern-alert alert-${props.alert.type} alert-dismissible fade show shadow-sm`}
          role="alert"
        >
          <i className={`${getAlertIcon(props.alert.type)} fs-5 me-2`}></i>
          <div>
            <strong>{capitalize(props.alert.type)}:</strong> {props.alert.msg}
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;
