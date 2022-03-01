import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSceneById, Scene } from '@goodhub/graphics';

export interface GraphicProps { }
const Graphic: FC<GraphicProps> = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const input = params.get('config') ?? ''

  const config = (() => {
    try {
      return JSON.parse(input);
    } catch {
      return {}
    }
  })()

  const [scene, setScene] = useState<Scene<any>>();

  useEffect(() => {
    const scene = getSceneById(config.name);
    setScene(scene);  
  }, [config])



  return <div className="flex w-screen h-screen">
    { scene ? <scene.view {...config} ></scene.view> : null }
  </div>
}

export default Graphic;