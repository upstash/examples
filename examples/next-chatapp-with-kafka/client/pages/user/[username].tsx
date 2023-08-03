import useWebSocket from "react-use-websocket";
import { useState } from "react";
import { useRouter } from "next/router";
import { Redis } from "@upstash/redis";
import styles from "@/styles/Home.module.css";
import redis from "../../lib/redis";

type Message = {
    id: number;
    sender: string;
    text: string;
};

export default function MessageApp(props: { messagesData: Message[] }) {
    const { messagesData } = props;
    const { username } = useRouter().query;
    const [inputText, setInputText] = useState<string>("");
    const [messageList, setMessageList] = useState<Message[]>(messagesData);
    const [messageCounter, setMessageCounter] = useState<number>(0);

    const handleMessage = function (message: Message) {
        const nextMessages = [...messageList, message];
        setMessageList(nextMessages);
    };

    const { sendMessage } = useWebSocket("wss://next-chatapp-server.fly.dev", {
        share: true,
        filter: () => false,

        onOpen: () => {
            console.log("WebSocket connection!");
            return "none!";
        },

        onMessage: (message) => {
            const data = JSON.parse(message.data);
            const { sender, text }: { sender: string; text: string } = data;
            const messageData: Message = {
                id: messageCounter,
                sender: sender,
                text: text,
            };
            setMessageCounter(messageCounter + 1);
            handleMessage(messageData);
            return message;
        },

        onClose: () => {
            console.log("WebSocket disconnected!");
            return "nope!";
        },
    });

    function handleSendMessage(messageText: string) {
        const messageData = {
            sender: username,
            text: messageText,
        };

        sendMessage(JSON.stringify(messageData));
    }

    return (
        <div className={styles.Container}>
            <MessageDisplay messages={messageList} />
            <MessageInput
                inputText={inputText}
                setInputText={setInputText}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
}

const MessageDisplay = function (props: { messages: Message[] }) {
    const { messages } = props;

    return (
        <div className={styles.messageContainer}>
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    sender={message.sender}
                    text={message.text}
                />
            ))}
        </div>
    );
};

const MessageInput = (props: {
    inputText: string;
    setInputText: (msg: string) => void;
    handleSendMessage: (msg: string) => void;
}) => {
    const { inputText, setInputText, handleSendMessage } = props;

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue: string = e.target.value;
        setInputText(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleSendMessage(inputText);
        if (inputText.trim() !== "") {
            setInputText(" ");
        }
    };

    return (
        <form className={styles.inputSection} onSubmit={handleSubmit}>
            <input
                className={styles.inputText}
                type="text"
                value={inputText}
                onChange={handleInputChange}
            ></input>
            <button className={styles.inputSendButton} type="submit">
                Send
            </button>
        </form>
    );
};

const MessageBubble = (props: {
    sender: string;
    text: string;
    key: number;
}) => {
    const { sender, text } = props;

    const { username } = useRouter().query;

    const isSender = sender === username;
    const senderClass = isSender ? "sender" : "receiver";
    return (
        <div className={`${styles["messageBubble"]} ${styles[senderClass]}`}>
            <div className={styles.messageSender}>
                {isSender ? "You" : sender}
            </div>
            <div className={styles.messageText}>{text}</div>
        </div>
    );
};

export async function getServerSideProps() {
    const messagesData = (await redis.lrange("messagesList", 0, -1)).reverse();

    return {
        props: {
            messagesData,
        },
    };
}
