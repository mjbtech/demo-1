import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { FaUpload, FaSortDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import s from "./elements.module.scss";

export const Form = ({ defaultValues, children, onSubmit }) => {
  const { handleSubmit, register, watch, setValue, getValues } = useForm({
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...child.props,
              register: register,
              watch: watch,
              key: child.props.name,
              getValues: getValues,
              setValue: setValue,
            })
          : child;
      })}
    </form>
  );
};

export const Input = ({
  register = () => {},
  label,
  name,
  placeholder,
  onChange,
  type,
  icon,
  className,
  required,
  readOnly,
  min,
  max,
}) => {
  return (
    <section className={`${s.input} ${className || ""}`}>
      {label && <label>{label}</label>}
      <input
        {...register(name || label)}
        name={name || label}
        placeholder={placeholder || "Enter"}
        type={type || "text"}
        required={required}
        min={min}
        max={max}
        readOnly={readOnly}
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
    <section data-testid="fileInput" className={s.fileInput}>
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
export const CustomRadio = ({
  register,
  name,
  watch,
  label,
  options,
  setValue,
  multiple,
  onChange,
  required,
}) => {
  const [selected, setSelected] = useState(watch?.(name) || []);
  useEffect(() => {
    setValue?.(name, selected);
  }, [selected]);
  return (
    <section className={s.customRadio}>
      {label && <label>{label}</label>}
      <input {...register?.(name)} required={required} />
      <div className={s.options}>
        {options.map(({ label, value: v, disabled }) => (
          <span
            onClick={() => {
              setSelected((prev) => {
                const _selected = selected.find((item) => item === v);
                if (_selected) {
                  return prev.filter((item) => item !== v);
                }
                if (multiple) {
                  return [...prev.filter((item) => item !== v), v];
                } else {
                  return [v];
                }
              });
            }}
            key={v}
            className={`${s.option} ${
              watch?.(name).includes(v) ? s.selected : ""
            } ${disabled ? s.disabled : ""}`}
          >
            {label}
          </span>
        ))}
      </div>
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
    <div data-testid="switchInput" className={s.switchInput}>
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
export const Toggle = ({
  register = () => {},
  getValues,
  watch,
  name,
  onChange,
}) => {
  const id = useRef(Math.random().toString(36).substr(-8));
  const watching = watch?.([name]);
  return (
    <section
      className={`${s.toggle} ${watching && watching[0] ? s.on : ""}`}
      onClick={(e) => {
        e.target.querySelector("label")?.click();
      }}
    >
      <input
        type="checkbox"
        {...register(name)}
        style={{ display: "none" }}
        name={name}
        id={id.current}
      />
      <label className={s.ball} htmlFor={id.current} />
    </section>
  );
};
export const Combobox = ({
  label,
  name,
  register,
  watch,
  setValue,
  placeholder,
  required,
  options,
  multiple,
  className,
}) => {
  const container = useRef();
  const [selected, setSelected] = useState(watch?.(name) || []);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setValue?.(name, selected);
  }, [selected]);
  useEffect(() => {
    const handler = (e) => {
      if (e.path && !e.path.includes(container.current)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);
  return (
    <section
      data-testid="combobox-container"
      className={`${s.combobox} ${className || ""} ${open ? s.open : ""}`}
    >
      {label && <label data-testid="combobox-label">{label}</label>}
      <div className={s.field} onClick={() => setOpen(true)} ref={container}>
        <p
          className={`${s.displayValue} ${
            !selected.join("") ? s.placeholder : ""
          }`}
        >
          {(selected.length > 3
            ? `${selected.length} items selected`
            : selected?.reduce(
                (p, a, i, arr) => `${p} ${a}${i < arr.length - 1 ? ", " : ""}`,
                ""
              )) ||
            placeholder ||
            "Select one"}
        </p>
        <input
          data-testid="combobox-input"
          {...register?.(name)}
          required={required}
        />
        <span data-testid="combobox-btn" className={s.btn}>
          <FaSortDown />
        </span>
        {open && (
          <ul className={s.options} data-testid="combobox-options">
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
                data-testid={`combobox-${option}`}
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
export const Checkbox = ({ register, name, label, required }) => {
  const id = useRef(Math.random().toString(36).substr(-8));
  return (
    <section className={s.checkbox}>
      <input {...register(name)} id={id} required={required} type="checkbox" />
      {label && <label htmlFor={label}>{label}</label>}
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
