import { NextApiRequest, NextApiResponse } from 'next'
import { createUser, getUser } from 'util/users'

async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body)
    return res
      .status(400)
      .json({ error: 'Malformed or empty body. Is it JSON?', code: 400 })
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
  const response = await createUser(data.email, data.password)
  //
  res.status(200).json({
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
