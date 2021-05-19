import { Router } from 'express';

import { bootstrapPerson, createPerson, getPerson, getExtendedPerson, updatePerson, getColleague, updateFollow } from '../services/person-service';
import { verifyAuthentication } from '../helpers/auth';
import { NotAuthorisedError } from '../common/errors';

const router = Router()

router.post('/', async (req, res, next) => {
  const id = req.body?.id;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;
  const email = req.body?.email;
  const phoneNumber = req.body?.phoneNumber;

  try {
    const [token] = await verifyAuthentication(req.headers);
    if (id !== token.personId) throw new NotAuthorisedError('You are not allowed to create a person for a user other than yourself.');
    const person = await createPerson(id, firstName, lastName, email, phoneNumber);
    res.status(201);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/bootstrap', async (req, res, next) => {

  try {
    const [, isServerToServer] = await verifyAuthentication(req.headers);
    if (!isServerToServer) throw new NotAuthorisedError('Individual accounts are not allowed to bootstrap users only server to server authentication.')
    const person = await bootstrapPerson();
    res.status(201);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/me', async (req, res, next) => {

  try {
    const [token] = await verifyAuthentication(req.headers);
    const person = await getExtendedPerson(token.personId);
    res.status(200);
    res.json(person);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.post('/me/follow', async (req, res, next) => {
  const { id, type } = req.body;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const person = await updateFollow(token.personId, id, type);
    res.status(201);
    res.json(person);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params?.id;
  const body = req.body;
  try {
    await verifyAuthentication(req.headers);
    const person = await updatePerson(id, body);
    res.status(200);
    res.json(person)
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params?.id;

  try {
    const person = await getPerson(id);
    res.status(200);
    res.json(person);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})

router.get('/:id/colleague', async (req, res, next) => {
  const id = req.params?.id;

  try {
    const [token] = await verifyAuthentication(req.headers);
    const person = await getColleague(id, token.organisations);
    res.status(200);
    res.json(person);
  } catch (e) {
    res.status(e.code);
    res.json(e.toJSON());
  }
})


export default router;