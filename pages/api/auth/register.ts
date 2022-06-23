import { NextApiRequest, NextApiResponse } from 'next'
import { tryCatch } from 'util/prisma'
import { createAccount, createUser, getUser, getUsers } from 'util/users'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body)
    return res
      .status(400)
      .json({ error: 'Malformed or empty body. Is it JSON?', code: 400 })
  // TODO. Open this up to public registration, if enabled.
  // check if we already have a user, disable if so.
  if (await getUsers())
    return res
      .status(400)
      .json({ error: 'Registrations are closed.', code: 400 })
  // grab our content from the body.
  const data = req.body
  // ensure our email is legit.
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    return res.status(400).json({ error: "Email isn't valid.", code: 400 })
  // ensure our user is new.
  if (await getUser(data.email))
    return res
      .status(409)
      .json({ error: 'Account already exists for email.', code: 409 })
  // create a new user!
  const response = tryCatch(res, async () => {
    const user = await createUser(data.email)
    await createAccount(data.email, data.password, user.id, true)
    return user
  })
  //
  res.status(201).json({
    data: response,
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') await post(req, res)
  else
    return res
      .status(404)
      .json({ error: 'Invalid method for route.', code: 404 })
}
