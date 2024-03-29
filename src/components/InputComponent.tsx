import { Fragment } from "react"
import styles from "./stylesheets/InputComponents.module.css"

interface props {
  type: string;
  name: string;
  placeholder: string;
  imgSrc?: any;
  style?: object;
  onChange?: any;
}

function TextInputComponent( {type, name, placeholder, imgSrc=undefined, style={}, onChange=undefined}: props ) {
  
  return (
    <>
      <div id={styles.InputComponent}>
        <img draggable="false" src={imgSrc} style={{display: imgSrc == undefined ? "none" : "inline"}} />
        <input type={type} name={name} placeholder={placeholder} onChange={onChange} style={style} required />
      </div>
    </>
  )
}

export default TextInputComponent