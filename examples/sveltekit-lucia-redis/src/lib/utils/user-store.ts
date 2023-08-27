import { writable, readonly, derived } from "svelte/store"
import { page } from "$app/stores"
import type { InferModel } from "drizzle-orm";
import type { User } from "lucia";

type UserStoreValue = User | undefined;

const createUserStore = () => {
    const _user = writable<UserStoreValue>()

    const userCtx = readonly<UserStoreValue>(_user)

    const setUser = (user: UserStoreValue) => {
        _user.set(user)
    }

    return {
        userCtx,
        setUser
    }
}

const { setUser, userCtx } = createUserStore()

const user = derived([userCtx], ([$user]) => {
    return $user
})

export {
    user,
    setUser
}