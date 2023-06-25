import * as React from 'react';
import { RectReadOnly } from 'react-use-measure';

type ContainerData = Partial<RectReadOnly>;

const ContainerContext = React.createContext<ContainerData>({});

export const useContainer = (): ContainerData => {
  const container = React.useContext(ContainerContext);
  return container;
};

export const Container = ContainerContext.Provider;
