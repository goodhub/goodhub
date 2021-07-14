import { FC } from 'react';
import { Scene } from '../lib';
import './configuration-panel.css';

export const ConfigurationPanel: FC<{ 
  scene?: Scene<any>
  name?: string
  configuration?: {[key: string]: any }
  setName: (name: string) => void
  setConfiguration: (key: string, value: string) => void
}> = ({ scene, name, configuration, setName, setConfiguration }) => {

  return <div className="configuration-panel">
    <h2>Configuration</h2>
    <label>Scene name</label>
    <input value={name} onChange={(e) => setName(e.target.value)}></input>

    { scene ? Object.keys(scene.configuration).map(name => {
      return <>
        <label>{name}</label>
        <input value={configuration?.[name] ?? ''} onChange={(e) => setConfiguration(name, e.target.value)}></input>
      </>
    }) : null  }
  </div>
}