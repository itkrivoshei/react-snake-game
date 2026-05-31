import React, { memo } from "react";

function Snake({ snakePart }) {
  return (
    <>
      {snakePart.map((part, index) => {
        const style = {
          left: `${part[0]}%`,
          top: `${part[1]}%`,
        };
        const isHead = index === snakePart.length - 1;

        return (
          <div
            aria-hidden="true"
            className={`snakePart${isHead ? " snakeHead" : ""}`}
            key={`${part[0]}-${part[1]}-${index}`}
            style={style}
          />
        );
      })}
    </>
  );
}

export default memo(Snake);
