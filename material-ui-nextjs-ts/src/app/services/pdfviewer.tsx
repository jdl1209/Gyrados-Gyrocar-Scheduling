import React from "react";

const PdfViewer: React.FC<{ scribdUrl: string }> = ({ scribdUrl }) => {
  return (
    <div style={{ margin: "12px auto 6px auto" }}>
      <p style={{ fontFamily: "Helvetica, Arial, Sans-serif", fontStyle: "normal", fontVariant: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "normal", fontSizeAdjust: "none", fontStretch: "normal", WebkitTextSizeAdjust: "none", MsTextSizeAdjust: "none", display: "block" }}>
        <a href={scribdUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>GyroGoGo Rental Terms and Conditions</a> on Scribd
      </p>
      <iframe
        title="GyroGoGo Rental Terms and Conditions"
        src={scribdUrl.replace("/document/", "/embeds/")}
        width="100%"
        height="600"
        frameBorder="0"
      ></iframe>
    </div> 
  );
};

export default PdfViewer;
