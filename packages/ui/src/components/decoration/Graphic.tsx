import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSceneById, Scene } from '../graphics';
import { getGraphic } from '../../services/image-service';
import { IGraphic } from '../../../../shared';

export interface GraphicProps {}
const Graphic: FC<GraphicProps> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [graphic, setGraphic] = useState<IGraphic>();
  const graphicId = params.get('graphicId');

  useEffect(() => {
    (async () => {
      if (!graphicId) return;
      const graphic = await getGraphic(graphicId);
      console.log(graphic);
      setGraphic(graphic);
    })();
  }, [graphicId]);

  const name = graphic?.configuration.name as string;
  const scene = getSceneById(name);

  return (
    <div className="flex w-screen h-screen">
      {scene && graphic ? <scene.view {...graphic.configuration}></scene.view> : null}
    </div>
  );
};

export default Graphic;
