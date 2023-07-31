import type { Actions, PageServerLoad } from './$types';
import redis, { databaseName } from "$lib/redis";
import type { Todo } from "$lib/types";
import { error } from '@sveltejs/kit';

export const load = (async () => {
    let todos: Todo[] = [];

    const data = await redis.hgetall(databaseName);

    if (!data) {
        return {
            todos
        };
    }

    todos = Object.keys(data)
        .map((key) => ({
            id: key,
            text: data[key]["text"],
            status: data[key]["status"],
        }))
        .sort((a, b) => parseInt(b.id) - parseInt(a.id));

    return {
        todos
    };
}) satisfies PageServerLoad;

export const actions = {
    new: async ({ request }) => {
        const form = await request.formData();
        const text = form.get("text");
        const id = Date.now().toString();

        if (!text) {
            throw error(400, "Text is required");
        }

        await redis.hset<Todo>(databaseName, { [id]: { id, text: text as string, status: false } });

        return {}
    },
    change: async ({ request }) => {
        const form = await request.formData();
        const todo = form.get("todo");

        const { id, text, status } = JSON.parse(todo as string);
        const newTodo = { id, text, status: !status };

        await redis.hset<Todo>(databaseName, { [id]: newTodo });
        return {}
    },
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get("id");

        await redis.hdel(databaseName, id as string);
    }
} satisfies Actions