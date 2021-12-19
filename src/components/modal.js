import React, { useEffect, forwardRef } from "react";
import ReactDOM, { createPortal } from "react-dom";

export const Modal = forwardRef(
  (
    {
      open,
      setOpen,
      children,
      className,
      onBackdropClick,
      backdropClass,
      style,
    },
    ref
  ) => {
    if (open) {
      return createPortal(
        <>
          <div
            className={`modalBackdrop ${backdropClass}`}
            onClick={(e) => {
              e.stopPropagation();
              onBackdropClick?.();
            }}
          />
          <div
            style={{ ...style }}
            ref={ref}
            className={`modal ${className || ""}`}
          >
            {children}
          </div>
        </>,
        document.querySelector("#portal")
      );
    }
    return null;
  }
);
