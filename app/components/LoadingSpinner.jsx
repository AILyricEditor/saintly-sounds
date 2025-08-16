import styles from "./styles/LoadingSpinner.module.css";

export default function LoadingSpinner({ size = 50 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={styles.loadingSpinner}
    >
      <p className={""}></p>
    </div>
  );
}

function Loader({ props }) {
  return (
    <div className={"flex flex-col"}>
    <p>
    <span></span>
    </p>
    </div>
);
}
