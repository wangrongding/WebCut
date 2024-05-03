import { IconVideo, IconText, IconMusic, IconImage } from '~/assets/icons/index'

export enum ActiveType {
  Video = 1,
  Image = 2,
  Audio = 3,
  Text = 4,
  SVG = 5,
  GIF = 6,
}

export const typeList = [
  {
    id: ActiveType.Video,
    name: '视频',
    icon: IconVideo,
  },
  {
    id: ActiveType.Image,
    name: '图片',
    icon: IconImage,
  },
  {
    id: ActiveType.Audio,
    name: '音频',
    icon: IconMusic,
  },
  {
    id: ActiveType.Text,
    name: '文字',
    icon: IconText,
  },
  {
    id: ActiveType.SVG,
    name: 'SVG',
    icon: IconVideo,
  },
  {
    id: ActiveType.GIF,
    name: 'GIF',
  },
]
