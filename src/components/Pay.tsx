"use client";

import { useState } from "react";

export default function Pay() {
  const [showCharge, setShowCharge] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "black",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p style={{ fontSize: "2rem" }}>Payment</p>
        <button
          style={{ padding: "1rem 2rem" }}
          disabled={false}
          onClick={(e) => {
            setShowCharge(true);
          }}
        >
          Charge
        </button>

        {showCharge && (
          <div className="modal-t2p show-modal-t2p">
            <div className="modal-content-t2p">
              <div id="credit-from">
                <iframe
                  className="frame-t2p"
                  src="https://api-checkout.t2p.co.th/api/payment/creditcardFrame?token=test_token"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
