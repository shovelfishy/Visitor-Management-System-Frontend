import "./stylesheets/ButtonComponent.css";
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
  color?: string;
  onClick?: any;
}

function Button( {children, color="#B82601", onClick=undefined}: props ) {

  const style = {borderColor: color};

  return (
    <button id="button-component" style={style} onClick={onClick}>{children}</button>
  )
}

export default Button