import React, { useEffect } from "react";
import { themeChange } from "theme-change";

function ThemeToggle() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="flex flex-row">
      
    </div>
  );
}

export default ThemeToggle;
