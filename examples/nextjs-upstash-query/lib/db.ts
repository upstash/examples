import { Redis } from "@upstash/redis";
import { Query } from "@upstash/query";





const query = new Query({
    redis: Redis.fromEnv({ automaticDeserialization: false })
})


export const status = ["queued", "building", "success", "failed"] as const
export type Status = typeof status[number]
export type Deployment = {
    id: string;
    project: string;
    status: Status
    author: string;
    gitCommit: string;

}
export const allDeployments = query.createCollection<Deployment>("deployments")


const deploymentsByGitCommitAndProject = allDeployments.createIndex({name: "x", terms: ["gitCommit", "project"]})




export const deploymentsByProject = allDeployments.createIndex({ name: "by_project", terms: ["project"] })


export const deploymentsByAuthor = allDeployments.createIndex({ name: "by_author", terms: ["author"] })
export const deploymentsByStatus = allDeployments.createIndex({ name: "by_status", terms: ["status"] })







