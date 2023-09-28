"use client"

import { Status } from "@/lib/db"
import { Select, SelectItem, TextInput } from "@tremor/react"
import { useRouter } from "next/navigation"
import React from "react"

export const FilterByStatus: React.FC<{ defaultStatus?: Status }> = ({ defaultStatus }) => {

    const router = useRouter()
    return (
        <Select
            defaultValue={defaultStatus}
            placeholder="Filter by Status"
            onValueChange={(status) => { status === "none" ? router.push("/") : router.push(`/?status=${status}`) }}
            className="w-full"
        >
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="building">Building</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
        </Select>
    )
}


export const FilterByAuthor: React.FC<{ defaultAuthor?: string }> = ({ defaultAuthor }) => {

    const router = useRouter()
    return (
        <TextInput
            defaultValue={defaultAuthor}
            onChange={(value) => { router.push(`/?author=${value.currentTarget.value}`) }}
            className="w-full"
            placeholder="Filter by Author"
        />

    )
}

export const FilterByProject: React.FC<{ defaultProject?: string }> = ({ defaultProject }) => {

    const router = useRouter()
    return (
        <TextInput
            defaultValue={defaultProject}
            onChange={(value) => { router.push(`/?project=${value.currentTarget.value}`) }}
            className="w-full"
            placeholder="Filter by Project"
        />

    )
}