import { useState, useEffect, useCallback } from "react";

export const useKeyPress = (target: RegExp) => {
  // State for keeping track of whether key is pressed
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [keyPressed, setKeyPressed] = useState("");
  const backSpaceCode = 8;

  // If pressed key matches our target, then set to true
  // and specify what character has been pressed
  const downHandler = useCallback(
    ({ key, keyCode }: any): void => {
      // If some key is still pressed, don't do anything
      if (isKeyPressed) return;
      // If the user pressed backspace
      if (keyCode === backSpaceCode) {
        setKeyPressed("BACKSPACE");
        setIsKeyPressed(true);
      }

      // If the pressed key matches our regex
      if (target.test(key)) {
        setKeyPressed(key);
        setIsKeyPressed(true);
      }
    },
    [target, isKeyPressed]
  );

  // If released key matches our target, then set to false
  const upHandler = useCallback(
    ({ key, keyCode }: any): void => {
      if (key !== keyPressed && keyCode !== backSpaceCode) return;

      // If the user released backspace
      if (keyCode === backSpaceCode) {
        setIsKeyPressed(false);
      }

      // If the released key matches our regex
      if (target.test(key)) {
        setIsKeyPressed(false);
      }
    },
    [target, keyPressed]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);
  return { keyPressed, isKeyPressed };
};
