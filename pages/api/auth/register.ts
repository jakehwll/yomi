import { NextApiRequest, NextApiResponse } from 'next'
import { createAccount, createUser, getUser, getUsers } from 'util/users'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res
      .status(400)
      .json({ error: 'Malformed or empty body. Is it JSON?', code: 400 })
    return res.end()
  }
  // TODO. Open this up to public registration, if enabled.
  // check if we already have a user, disable if so.
  if (await getUsers()) {
    res.status(400).json({ error: 'Registrations are closed.', code: 400 })
    return res.end()
  }
  // grab our content from the body.
  const data = req.body
  // ensure our email is legit.
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    res.status(400).json({ error: "Email isn't valid.", code: 400 })
    return res.end()
  }
  // ensure our user is new.
  if (await getUser(data.email)) {
    res
      .status(409)
      .json({ error: 'Account already exists for email.', code: 409 })
    return res.end()
  }
  // create a new user!
  const response = await createUser(data.email)
  await createAccount(data.email, data.password, response.id, true)
  //
  res.status(201).json({
    data: response,
  })
  return res.end()
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
