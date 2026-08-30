import React from "react";

export function CharReveal({ text, delay = 0, style = {}, className = "" }) {
  return (
    <span style={style} className={className}>
      {text.split("").map((c, i) => (
        <span key={i} className="ch">
          <span style={{ animationDelay: `${delay + i * 0.036}s` }}>
            {c === " " ? "\u00a0" : c}
          </span>
        </span>
      ))}
    </span>
  );
}

export function WordReveal({ text, delay = 0, style = {}, className = "" }) {
  return (
    <span style={style} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="ww" style={{ display: "inline-block", marginRight: "0.3em" }}>
          <span style={{ animationDelay: `${delay + i * 0.08}s` }}>{w}</span>
        </span>
      ))}
    </span>
  );
}
