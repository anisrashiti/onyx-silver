"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Subscriptions are currently unavailable. Please try again later.");
  }
  return <div className="newsletter" id="newsletter"><div className="newsletter-copy"><h2>JOIN THE ONYX LIST</h2><p>Be the first to discover new arrivals, curated edits, and special offers from Onyx Silver.</p></div><form onSubmit={submit}><label htmlFor="newsletter-email" className="sr-only">Email address</label><div className="newsletter-input-row"><input id="newsletter-email" name="email" type="email" pattern=".+@.+\..+" required autoComplete="email" placeholder="Your email address" aria-describedby="newsletter-status" onChange={() => setMessage("")} /><button type="submit">SUBSCRIBE</button></div><p id="newsletter-status" className="newsletter-status" aria-live="polite">{message}</p></form></div>;
}
