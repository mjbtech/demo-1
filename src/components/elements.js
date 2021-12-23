import { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { FaUpload, FaSortDown } from "react-icons/fa";
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
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
      />
      {icon && icon}
    </section>
  );
};
export const FileInput = ({ label, required, multiple, onChange }) => {
  const id = useRef(Math.random().toString(36).substr(4));
  const [files, setFiles] = useState([]);
  useEffect(() => {
    onChange?.(files);
  }, [files]);
  return (
    <section className={s.fileInput}>
      <div className={s.label}>
        <label>{label}</label>
        <span className={s.fileCount}>{files.length} files selected</span>
      </div>
      <input
        id={id.current}
        style={{ display: "none" }}
        type="file"
        multiple={multiple}
        required={required}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setFiles((prev) => [
              ...prev,
              ...[...e.target.files].filter(
                (item) => !files.some((file) => file.name === item.name)
              ),
            ]);
          }
        }}
      />
      <div className={s.inputField}>
        <label htmlFor={id.current}>
          <span className={s.fileNames}>
            {files.reduce((p, a) => {
              return p + a.name + ", ";
            }, "") || "Item select"}
          </span>
          <span className={s.btn}>
            <FaUpload />
          </span>
        </label>
      </div>
    </section>
  );
};
export const Textarea = ({
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
    <section className={`${s.input} ${s.textinput} ${className || ""}`}>
      {label && <label>{label}</label>}
      <textarea
        placeholder={placeholder || "Enter"}
        value={defaultValue}
        required={required}
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
export const Combobox = ({
  label,
  placeholder,
  required,
  options,
  onChange,
  preSelected,
  multiple,
  className,
}) => {
  const container = useRef();
  const [selected, setSelected] = useState(preSelected || []);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (!e.path.includes(container.current)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);
  return (
    <section
      className={`${s.combobox} ${className || ""} ${open ? s.open : ""}`}
    >
      {label && <label>{label}</label>}
      <div className={s.field} onClick={() => setOpen(true)} ref={container}>
        <input
          value={
            selected.length > 3
              ? `${selected.length} items selected`
              : selected?.reduce(
                  (p, a, i, arr) =>
                    `${p} ${a}${i < arr.length - 1 ? ", " : ""}`,
                  ""
                )
          }
          placeholder={placeholder || "Select one"}
          readOnly={true}
        />
        <span className={s.btn}>
          <FaSortDown />
        </span>
        {open && (
          <ul className={s.options}>
            {options.map((option, i) => (
              <li
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((prev) => {
                    const _selected = selected.find((item) => item === option);
                    if (_selected) {
                      return prev.filter((item) => item !== option);
                    }
                    if (multiple) {
                      return [
                        ...prev.filter((item) => item !== option),
                        option,
                      ];
                    } else {
                      return [option];
                    }
                  });
                  if (!multiple) {
                    setOpen(false);
                  }
                }}
                className={
                  selected.find((item) => item === option) || false
                    ? s.selected
                    : ""
                }
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={selected.find((item) => item === option) || false}
                    readOnly={true}
                  />
                )}{" "}
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
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

export const Chip = ({ label, remove }) => {
  return (
    <span className={s.chip}>
      {label}{" "}
      <button
        onClick={() => {
          remove?.();
        }}
        className="clear"
      >
        <IoIosClose />
      </button>
    </span>
  );
};
