import "./buttons.scss";
import {FormEvent} from "react";
export default function CloseButton(params: {clickHandler: Function}) {
    const {clickHandler} = params;

    const clickWrapper = (event: FormEvent) => {
       clickHandler(event);
    }

    return (
        <button onClick={clickWrapper} className="button__close">x</button>
    )
}