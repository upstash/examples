import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const sendComment = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/submit", {
      body: JSON.stringify({
        comment: event.target.comment.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
    event.target.reset();
    loadComments();
  };

  const loadComments = async () => {
    setLoading(true);
    setData([]);
    setData2([]);
    const res = await fetch("/api/load");

    const result = await res.json();
    setData(result.comments);
    setData2(result.censored);
    setLoading(false);
    console.log(result);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4 className={styles.title}>
          Content Moderation
          <br />
          with Upstash Kafka
        </h4>

        <p className={styles.description}>
          Check the <a href={"#"}>blog post </a> for details.
        </p>

        <div className={styles.grid}>
          <div className={styles.div1}>
            <form onSubmit={sendComment}>
              <textarea name="comment" type="text" className={styles.textarea} />
              <br />
              <button type="submit" className={styles.submitbutton}>
                Submit
              </button>
            </form>
          </div>

          <div className={styles.div2}>
            <h3>Accepted Comments</h3>

            {loading ? <div className={styles.loader} /> : data.map((item) => <p className={styles.comment}>{item}</p>)}
          </div>

          <div className={styles.div2}>
            <h3>Censored Comments</h3>
            {loading ? (
              <div className={styles.loader} />
            ) : (
              data2.map((item) => <p className={styles.censored}>{item}</p>)
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://upstash.com?utm_source=content-moderation-demo" target="_blank" rel="noopener noreferrer">
          Powered by <span className={styles.logo}> Upstash</span>
        </a>
      </footer>
    </div>
  );
}
