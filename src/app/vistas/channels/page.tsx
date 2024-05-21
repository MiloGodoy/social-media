'use client'

import { useEffect } from 'react';
import { ChannelFilters, ChannelSort, User } from 'stream-chat';
import {
  Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
  type AttachmentProps,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';
import '../../../app/styles.css'

const apiKey = 'dz5f4d5kzrue';
const userId = 'winter-hall-9';
const userName = 'winter';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoid2ludGVyLWhhbGwtOSIsImV4cCI6MTcxNjIzODYxN30.hqimzu0REZBB8ys1lJ4oYIPftrkzH2gfgoYqSCgTnFg';

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

const sort: ChannelSort = { last_message_at: -1 };
const filters: ChannelFilters = {
  type: 'messaging',
  members: { $in: [userId] },
};

export type CustomAttachmentType = {
  image: string;
  name: string;
  type: string;
  url: string;
};

const attachments: CustomAttachmentType[] = [
  {
    image:
      'https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg',
    name: 'iPhone',
    type: 'product',
    url: 'https://goo.gl/ppFmcR',
  },
];

const CustomAttachment = (props: AttachmentProps) => {
  const { attachments } = props;
  const [attachment] = (attachments || []) as CustomAttachmentType[];
  if (attachment?.type === 'product') {
    return (
      <div>
        Product:
        <a href={attachment.url} rel="noreferrer">
          <img alt="custom-attachment" height="100px" src={attachment.image} />
          <br />
          {attachment.name}
        </a>
      </div>
    );
  }

  return <Attachment {...props} />;
};

const App = () => {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const initAttachmentMessage = async () => {
      const [channel] = await client.queryChannels(filters, sort);

      await channel.sendMessage({
        text: 'Your selected product is out of stock, would you like to select one of these alternatives?',
        attachments,
      });
    };

    initAttachmentMessage().catch((error) => {
      console.error(`Failed to initialize attachments`, error);
    });
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} />
      <Channel Attachment={CustomAttachment}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
