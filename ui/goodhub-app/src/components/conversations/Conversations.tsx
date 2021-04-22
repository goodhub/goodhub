import { FC } from 'react';
import Button from '../generic/Button';

export interface ConversationsProps {}

const Conversations: FC<ConversationsProps> = () => {

  return <div className="flex-1 flex flex-col pt-2">
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold tracking-tight">Conversations</h1>
      <Button mode="primary">AS</Button>
    </div>
  </div>;
}

export default Conversations;