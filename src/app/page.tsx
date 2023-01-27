"use client";

import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

let interval: NodeJS.Timer | undefined;

const Redirect = ({ url }: { url: string }) => {
  const [seconds, setSeconds] = useState(5000);

  useEffect(() => {
    interval = setInterval(() => {
      setSeconds((val) => Math.max(val - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      if (interval) clearInterval(interval);
      window.location.replace(url);
    }
  }, [seconds, url]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ textAlign: "center" }}>
        Redirecting in <span className={styles.code}>{seconds}</span> seconds
      </p>
      <small style={{ color: "black", textAlign: "center" }}>{url}</small>
    </div>
  );
};

const getUrlParam = (input: string | null): string | undefined => {
  if (!input) return undefined;

  if (Array.isArray(input)) return input[0];

  if (input.length === 0) return undefined;

  return input;
};

export default function Home() {
  const searchParams = useSearchParams();
  const url = getUrlParam(searchParams.get("url"));
  const isValidInput = !!url;

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <p className={styles.header}>AutoRedirect</p>
        <div className={styles.description}>
          {isValidInput && <Redirect url={url} />}
          {!isValidInput && (
            <p>
              You need to pass in <span className={styles.code}>url</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
