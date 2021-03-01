import { Router } from 'express';

import { createPerson, getPerson, getPersonByOId } from '../services/person-service';
import { verifyAuth } from '../helpers/auth';
import { NotAuthorisedError } from '../common/errors';

const router = Router()

router.post('/', async (req, res, next) => {
  const oId = req.body?.oId;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;
  const email = req.body?.email;
  const phoneNumber = req.body?.phoneNumber;

  try {
    const token = await verifyAuth(req.headers);
    if (oId !== token.sub) throw new NotAuthorisedError('You are not allowed to create a person for a user other than yourself.');
    const person = await createPerson(token.sub, firstName, lastName, email, phoneNumber);
    res.status(200);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/', async (req, res, next) => {
  const oId = req.query?.['oId'] as string;

  try {
    await verifyAuth(req.headers);
    const person = await getPersonByOId(oId);
    res.status(200);
    res.json(person);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params?.id;

  try {
    await verifyAuth(req.headers);
    const person = await getPerson(id);
    res.status(200);
    res.json(person);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;