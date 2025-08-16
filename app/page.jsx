import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    // TODO: Add your HTML here
    <main>
			<h1>Home</h1>
			<p>There is no content here yet. Check out the <Link href={"/music"}>Music</Link> page!</p>
		</main>
  );
}
