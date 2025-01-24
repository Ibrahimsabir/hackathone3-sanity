import { createClient } from "next-sanity";

const client = createClient({
    projectId: "r520isj1",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-13"
})

export async function sanityFetch({query, params = {}}: {query: string, params?: {}}){
    return await client.fetch(query, params)
}