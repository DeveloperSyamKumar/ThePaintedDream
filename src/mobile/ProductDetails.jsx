import React, { useState } from "react";

function ProductDetails({ text }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-[10px] sm:text-sm text-gray-500 mb-1 ${
          expanded ? "" : "line-clamp-1"
        }`}
      >
        {text}
      </p>

      {text.length > 40 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] text-blue-600 font-medium"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}

export default ProductDetails;
