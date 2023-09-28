"use server"

import { allDeployments, status } from "@/lib/db"
import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"

export async function createDeployment(data: FormData) {

    const id = randomUUID().split("-")[0]
    await allDeployments.set(id, {
        id,
        author: data.get("author") as string,
        project: data.get("project") as string,
        status: status[Math.floor(Math.random() * status.length)],
        gitCommit:  randomUUID().split("-")[0]

    })
    revalidatePath("/")
}


export async function removeDeployment(data: FormData) {

    await allDeployments.delete(data.get("deploymentId") as string)
    revalidatePath("/")
}