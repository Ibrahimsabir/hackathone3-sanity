export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-22'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skIglqUqSOmBvUVUaE8EuvPVJZHmg5NDlsNvfkd2LcyYPiFF5olIikH9ykVnQ1n0OWIOhqGbRPNYv5of2WZ1rzjdMa5fb52PguKWxhaE0z30736XdwHx9ftiv65uUR0OUeUNoNNvqyrwoA7fgruZh9mESBz6XnDMxFlTurVUGmAFNEIuVLD2",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
