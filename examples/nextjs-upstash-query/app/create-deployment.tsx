"use client"
import React, { useState } from "react"
import { Button, TextInput, } from "@tremor/react";
import { createDeployment } from "./action"


export const CreateDeployment: React.FC = () => {
    const [isLoading, setLoading] = useState(false)


    return (
        <form action={async (data)=>{
            setLoading(true)
            await createDeployment(data)
            setLoading(false)
        }}
        className="flex flex-col space-y-4"
        >

            <TextInput id="author" name="author" placeholder="Author" />
            <TextInput id="project" name="project" placeholder="Project"/>


            <Button type="submit" loading={isLoading} disabled={isLoading}>Create</Button>

        </form>
    )


}