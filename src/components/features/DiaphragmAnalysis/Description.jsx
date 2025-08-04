import React from "react";

export default function Description({ text }) {
  return (
    <div className="text-sm text-muted-foreground text-center">
      {text}
    </div>
  );
}
