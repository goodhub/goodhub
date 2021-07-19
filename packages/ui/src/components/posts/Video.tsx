import { FC } from 'react';
import { useMeasure } from 'react-use';
import YouTube from 'react-youtube';

interface VideoProps {
  video: { url: string }
  className?: string
}

const Video: FC<VideoProps> = ({ video, className }) => {

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const url = new URL(video.url);
  const id = url.searchParams.get('v');

  return id ? <div className={`${className} overflow-hidden relative bg-black`} style={{ height: width / 1.778 }} ref={ref}>
    <YouTube videoId={id} opts={{ height: `${width / 1.778}`, width: `${width}` }} />
  </div> : null;
}

export default Video;