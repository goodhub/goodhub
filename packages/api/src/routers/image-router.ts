import { Router } from 'express';
import multer from 'multer';
import { WorkingFolder } from '../helpers/temp';
import { MissingParameterError } from '../../../shared';
import { processAndUploadImage, ProcessedImage } from '../services/image-service';
import { verifyAuthentication } from '../helpers/auth';
import { createGraphic, getGraphic, renderGraphic, updateGraphic } from '../services/graphic-service';
import { CustomError } from '../common/errors';

// This is a slightly special use of
// working folder that makes it synchronous
const path = WorkingFolder.makeTempFolderSync();
const dir = new WorkingFolder(path);

const upload = multer({ dest: dir.path });
const router = Router();

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const [token] = await verifyAuthentication(req.headers);
    const alt = req.body.alt;
    if (!alt || !req.file) throw new MissingParameterError('alt', 'image');

    const image: ProcessedImage = {
      location: {
        path: req.file.path
      },
      alt,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype
    };

    const manifest = await processAndUploadImage(image, token.personId);
    res.status(201);
    res.json(manifest);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.get('/graphic/:graphicId', async (req, res) => {
  try {
    const graphicId = req.params.graphicId;
    if (!graphicId) throw new MissingParameterError('graphicId');
    const graphic = await getGraphic(graphicId);
    res.status(200);
    res.json(graphic);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON());
  }
});

router.post('/graphic/:sceneId', async (req, res) => {
  try {
    const [token] = await verifyAuthentication(req.headers);
    const sceneId = req.params.sceneId;
    if (!sceneId) throw new MissingParameterError('sceneId');

    const { id } = await createGraphic(
      token.personId,
      req.body.organisationId,
      sceneId,
      req.body.configuration,
      req.body.alt
    );

    console.log('Created graphic', id);
    const image = await renderGraphic(id);
    console.log('Rendered graphic', id);
    const graphic = await updateGraphic(id, image);
    console.log('Updated graphic', id);
    res.status(201);
    res.json(image);
  } catch (e) {
    const error = e as CustomError;
    res.status(error.code);
    res.json(error.toJSON?.());
  }
});

export default router;
