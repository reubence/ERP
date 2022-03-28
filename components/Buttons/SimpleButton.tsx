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
        className={`inline-flex items-center text-sm font-medium rounded-md ${props.btnClass}`}
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
