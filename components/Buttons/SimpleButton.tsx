import { MouseEventHandler } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface AppProps {
  text?: string;
  setSolid: boolean;
  icon?: Function;
  onClick?: MouseEventHandler;
}

export default function SimpleButton(props: AppProps) {
  return (
    <div className="relative flex text-left">
      <button
        type="button"
        className={
          props.setSolid
            ? "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-cream-light bg-coffee-light hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
            : "inline-flex items-center px-4 py-2 border-2 border-coffee-light shadow-sm text-sm font-medium rounded-md text-gray-700 bg-cream-light hover:border-accent-light hover:text-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light"
        }
        onClick={props.onClick}
      >
        {props.text ? <span className=""> {props.text} </span> : null}

        {props.icon ? (
          <props.icon
            className={
              props.text
                ? "-mr-1 ml-2 h-5 w-5 text-coffee group-hover:text-coffee-light"
                : "h-5 w-5 text-coffee group-hover:text-coffee-light"
            }
            aria-hidden="true"
          />
        ) : null}
      </button>
    </div>
  );
}
