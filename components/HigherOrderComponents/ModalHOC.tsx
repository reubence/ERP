import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ModalHOC({ children, selector }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  return mounted
    ? createPortal(children, document.querySelector(selector))
    : null;
}

export default ModalHOC;
