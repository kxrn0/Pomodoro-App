import { useState, useEffect } from "react";
import "./popup.css";

export default function Popup({ children, shown, close, duration = .33 }) {
  const [hasContent, setHasContent] = useState(shown);

  useEffect(() => {
    let timeout;

    timeout = null;

    if (shown) setHasContent(true);
    else timeout = setTimeout(() => setHasContent(false), 1000 * duration);

    return () => clearTimeout(timeout);
  }, [shown]);

  return (
    <div
      className={`popup ${shown ? "shown" : "hidden"}`}
      style={{ "--duration": `${duration}s` }}
    >
      <div className="backdrop" onClick={close}></div>
      <div className="container">{hasContent ? children : null}</div>
    </div>
  );
}
