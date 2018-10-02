import React from "react";
/*React isn't just for buildinf web applications it can also be used for building mobile applications as such the react module doesnt come bundled with DOM functinonality, we must import it separately.
 */
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/style.css";

render(<Router />, document.querySelector("#main"));
