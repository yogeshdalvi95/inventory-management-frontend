import React from "react";
import styles from "./NotFoundPage.module.css";
export default function NotFoundPage(props) {
  return (
    <div className={styles.mydiv}>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
    </div>
  );
}
