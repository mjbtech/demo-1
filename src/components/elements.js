import { useState, useEffect } from "react";
import s from "./elements.module.scss";

export const Input = ({
  label,
  placeholder,
  defaultValue,
  onChange,
  type,
  icon,
  className,
  required,
}) => {
  const [value, setValue] = useState(defaultValue || "");
  return (
    <section className={`${s.input} ${className || ""}`}>
      {label && <label>{label}</label>}
      <input
        placeholder={placeholder || "Enter"}
        type={type || "text"}
        value={defaultValue}
        required={true}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
      />
      {icon && icon}
    </section>
  );
};
export const Radio = ({ options, onChange }) => {
  const [value, setValue] = useState("");
  return (
    <section className={s.radio}>
      {options.map(({ label, value: v, hint, disabled }) => (
        <label key={v} className={disabled ? s.disabled : ""}>
          <input
            className="label"
            type="radio"
            checked={v === value}
            onChange={() => {
              setValue(v);
              onChange?.(v);
            }}
          />
          {label}
          {hint && <span className={s.hint}>{hint}</span>}
        </label>
      ))}
    </section>
  );
};
export const SwitchInput = ({
  label,
  defaultValue,
  onChange,
  onLabel,
  offLabel,
}) => {
  const [value, setValue] = useState(defaultValue || false);
  return (
    <div className={s.switchInput}>
      <label>{label}</label>
      <div className={s.btns}>
        <span
          className={`${value ? s.active : ""} ${s.on}`}
          onClick={() => setValue(true)}
        >
          {onLabel || "Yes"}
        </span>
        <span
          className={`${!value ? s.active : ""} ${s.off}`}
          onClick={() => setValue(false)}
        >
          {offLabel || "No"}
        </span>
      </div>
    </div>
  );
};
export const Toggle = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || false);
  return (
    <div
      className={`${s.toggle} ${value ? s.on : ""}`}
      onClick={() => {
        setValue(!value);
        onChange?.(!value);
      }}
    >
      <span className={s.ball} />
    </div>
  );
};

export const Table = ({ columns, className, children }) => {
  return (
    <table
      className={`${s.table} ${className || ""}`}
      cellPadding={0}
      cellSpacing={0}
    >
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={i}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
export const TableActions = ({ actions }) => {
  const [open, setOpen] = useState(false);
  return actions.length < 4 ? (
    <td className={s.tableActions}>
      {actions.map((action) => (
        <button key={action.label} className="clear" onClick={action.callBack}>
          {action.icon}
        </button>
      ))}
    </td>
  ) : (
    <td className={s.tableActions}></td>
  );
};
