import { useState } from "react";
import useOuterClick from "../../hooks/outer.click";

export default function DropMenuButton({ text, children, className, ...rest }) {
  let [open, setOpen] = useState(false);
  let outerRef = useOuterClick(() => setOpen(false));

  return (
    <div
      className={
        className ? "drop-menu-button " + className : "drop-menu-button"
      }
      {...rest}
    >
      <button
        className="btn btn-primary"
        ref={outerRef}
        type="button"
        onClick={() => setOpen(!open)}
      >
        {text}
        <span className="arrow-down"></span>
      </button>
      {open && <div className="drop-down">{children}</div>}
    </div>
  );
}
