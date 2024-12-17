import { FrameMetadata } from '@coinbase/onchainkit/frame';
import { SITE_URL } from '../config';
 
export default function FrameHomePage() {
  return (    
    <FrameMetadata
      buttons={[
        {
          action: 'tx',
          label: 'Join',
          target: `${SITE_URL}/api/frame/tx/join`,
          postUrl: `${SITE_URL}/api/frame/tx/success-join`,
        },
        {
          action: 'tx',
          label: 'Leave',
          target: `${SITE_URL}/api/frame/tx/leave`,
          postUrl: `${SITE_URL}/api/frame/tx/success-leave`,
        },
        {
          action: 'link',
          label: 'Help',
          target: `${SITE_URL}/docs`
        }
      ]}
      image={{
       src: `${SITE_URL}/intro.png`,
       aspectRatio: '1:1'
      }}
      input={{
        text: 'Insert your tokenID..'
      }}
      postUrl={`${SITE_URL}/api/frame`}
    />
  );
}
