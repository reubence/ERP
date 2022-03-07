import { Children, MouseEventHandler } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface AppProps {
  text?: string;
  setSolid: boolean;
  icon?: Function;
  onClick?: MouseEventHandler;
  btnClass?: string;
  iconClass?: string;
  notify?: Function;
}

export default function SimpleButton(props: AppProps) {
  return (
    <div className="relative group ml-2">
      <button
        type="button"
        className={
          props.setSolid
            ? "inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-cream-light bg-coffee-light group-hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
            : `inline-flex items-center px-2 py-1 text-sm font-medium rounded-md ${props.btnClass}`
        }
        onClick={props.onClick}
      >
        {props.icon ? (
          <props.icon
            className={
              props.text
                ? `h-4 w-4 mr-1 ${props.iconClass}`
                : `h-4 w-4 ${props.iconClass}`
            }
            aria-hidden="true"
          />
        ) : null}

        {props.text ? <span className=""> {props.text} </span> : null}
      </button>
    </div>
  );
}
