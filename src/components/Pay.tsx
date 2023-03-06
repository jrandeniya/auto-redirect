"use client";

import { useState } from "react";

export default function Pay() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  const onSubmit = async () => {
    if (!amount || !invoiceId) {
      alert("Invoice ID and amount required");
      return;
    }

    setLoading(true);
    setToken(undefined);

    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceId,
        amount,
        callback: `${window.location.origin}/complete`,
      }),
    });

    const {
      data: { token },
    } = await response.json();

    setToken(token);
    setLoading(false);
  };

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
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p
          style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
        >
          Payment
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <input
            style={{ padding: "1rem", borderRadius: "16px" }}
            name="invoiceId"
            placeholder="Invoice ID"
            onChange={(e) => setInvoiceId(e.target.value)}
          />
          <input
            type="number"
            min={0}
            style={{ padding: "1rem", borderRadius: "16px" }}
            name="amount"
            placeholder="Amount"
            onChange={(e) => setAmount(`${e.target.value}`)}
          />
        </div>

        <button
          style={{
            padding: "1rem 2rem",
            cursor: "pointer",
            borderRadius: "16px",
            backgroundColor: "#90ee90",
            color: "black",
          }}
          disabled={loading}
          onClick={onSubmit}
        >
          {loading ? "Loading..." : "Submit"}
        </button>

        {token && (
          <div className="modal-t2p show-modal-t2p">
            <div className="modal-content-t2p">
              <div id="credit-from">
                <iframe
                  className="frame-t2p"
                  src={`https://api-checkout.t2p.co.th/api/payment/creditcardFrame?token=${token}`}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
