import React, { memo } from "react";

function Food({ part }) {
  const style = {
    left: `${part[0]}%`,
    top: `${part[1]}%`,
  };

  return <div aria-hidden="true" className="food" style={style} />;
}

export default memo(Food);
