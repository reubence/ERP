import { MouseEventHandler } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface AppProps {
  text?: string;
  setSolid: boolean;
  icon?: Function;
  onClick?: MouseEventHandler;
  className?: string;
}

export default function SimpleButton(props: AppProps) {
  return (
    <div className="relative group ml-2">
      <button
        type="button"
        className={
          props.setSolid
            ? "inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-md text-cream-light bg-coffee-light group-hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
            : `inline-flex items-center p-2 text-sm font-medium rounded-md text-cream ${props.className}`
        }
        onClick={props.onClick}
      >
        {props.icon ? (
          <props.icon
            className={props.text ? "h-5 w-5 text-cream" : "h-5 w-5 text-cream"}
            aria-hidden="true"
          />
        ) : null}

        {props.text ? <span className=""> {props.text} </span> : null}
      </button>
    </div>
  );
}
