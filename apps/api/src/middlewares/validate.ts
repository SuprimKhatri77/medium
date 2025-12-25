import { NextFunction, Request, Response } from 'express'
import z from 'zod'

export const validate =
  <Schema extends z.ZodTypeAny>(schema: Schema) =>
  (
    req: Request<{}, {}, z.infer<Schema>>,
    res: Response,
    next: NextFunction,
  ) => {
    console.log('i got triggered')
    console.log('req body received: ', req.body)
    const result = schema.safeParse(req.body)
    console.log('validation result: ', result.error?.issues)

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {}
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.') || 'root'
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = []
        }
        fieldErrors[fieldName].push(issue.message)
      })
      console.log('field errors: ', fieldErrors)
      return res.status(400).json({
        message: 'Validation failed.',
        errors: {
          properties: fieldErrors,
        },
      })
    }
    console.log('no validation error')
    console.log('data: ', result.data)
    req.body = result.data
    console.log('invoking the controller.')
    next()
  }
