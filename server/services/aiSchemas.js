import { z } from "zod";


export const GenerationResultSchema = z.object({
    files: z.record(z.string(),  z.string()),
    description: z.string(),
})

export const FileOpSchema = z.object({
    op: z.enum(["create", "update", "delete"]),
    path: z.string(),
    content: z.string().nullable(),
    search: z.string().nullable(),
    replace: z.string().nullable(),
})

export const RevisionResultSchema = z.object({
    operations: z.array(FileOpSchema),
    description: z.string(),
})

export const FilePlanSchema = z.object({
    files: z.array(
        z.object({
            path: z.string(),
            description: z.string(),
            exports: z.string(),
            imports: z.array(z.string()),
        })
    ),
    projectName: z.string(),
    projectDescription: z.string(),
})

export const FileCodeSchema = z.object({
    code: z.string(),
})