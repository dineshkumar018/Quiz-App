import React from "react";
import clsx from "clsx";

const Card = ({ children,className }) => {
  return (
  <article className={clsx("card-wrapper", className)}>{children}</article>
  )
};

export default Card;
