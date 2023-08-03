import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { Redis } from "@upstash/redis";

export default function Home() {
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [usernameList, setUsernameList] = useState<string[]>(Array<string>);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue: string = e.target.value;
        setUsernameInput(inputValue);
    };

    const addUsernameClient = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setUsernameList([...usernameList, usernameInput]);
        setUsernameInput("");
    };
    return (
        <div className={styles.container}>
            <div className={styles.welcomeSection}>
                <h1>Welcome to the demo message app!</h1>
                <p>
                    This application uses Upstash Kafka for message passing, and
                    Upstash Redis for state management.
                    <br />
                    <br />
                    To get started, create several clients by typing in unique
                    usernames to the input section below and submitting.
                    <br />
                    <br />
                    The usernames will be added to the list of current clients.
                    Click on a username to open a new tab with that
                    client&apos;s message display.
                    <br />
                    <br />
                    You can have multiple sessions open at once.
                </p>
            </div>
            <form className={styles.formSection} onSubmit={addUsernameClient}>
                <input
                    type="text"
                    className={styles.formInput}
                    value={usernameInput}
                    onChange={handleInputChange}
                ></input>

                <button className={styles.formSubmit} type="submit">
                    Create the client!
                </button>
            </form>
            <div className={styles.clientListSection}>
                <p className={styles.clientListHeader}>Current Clients</p>
                <div className={styles.clientList}>
                    {usernameList.map((username, i) => {
                        return (
                            <Link
                                href={`/user/${username}`}
                                key={i}
                                className={styles.userClient}
                                target="_blank"
                            >
                                <p>{username}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const redis = Redis.fromEnv();

    await redis.del("messagesList");

    return {
        props: {},
    };
}
