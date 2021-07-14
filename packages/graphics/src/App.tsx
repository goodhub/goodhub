import { getSceneById, Scene } from './lib';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [name, setName] = useState<string>('quote');
  const [scene, setScene] = useState<Scene<any>>();
  const [configuration, setConfiguration] = useState<{[key: string]: any }>({});

  useEffect(() => {
    const scene = getSceneById(name);
    if (!scene) return;
    setScene(scene);
    const defaultConfiguration = Object.keys(scene.configuration).reduce<{[key: string]: any }>((config, key) => {
      config[key] = scene.configuration[key]?.default
      return config;
    }, {})
    setConfiguration(defaultConfiguration);
  }, [name])
  
  return <main>
      <ConfigurationPanel 
        name={name}
        setName={setName}
        configuration={configuration}
        setConfiguration={(key: string, value: string) => {
          setConfiguration({
            ...configuration,
            [key]: value
          })
        }}
        scene={scene}
      /> 
      <div className="scene-containers">
        <div className="scene-container" style={{ height: 261, width: 500 }}>
          { scene ? <scene.view {...configuration} ></scene.view> : null }
        </div>
      </div>
    </main>
  }

export default App;
