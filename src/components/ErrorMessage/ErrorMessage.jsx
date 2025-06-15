import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
}) {
  return <p className={styles.error}>{message}</p>;
}
