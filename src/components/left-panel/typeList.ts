import { IconVideo, IconText, IconMusic, IconImage } from '~/assets/icons/index'

export enum ActiveType {
  Video = 1,
  Audio = 2,
  Text = 3,
  Image = 4,
  SVG = 5,
  GIF = 6
}

export const typeList = [
  {
    id: ActiveType.Video,
    name: '视频',
    icon: IconVideo
  },
  {
    id: ActiveType.Audio,
    name: '音频',
    icon: IconMusic
  },
  {
    id: ActiveType.Text,
    name: '文字',
    icon: IconText
  },
  {
    id: ActiveType.Image,
    name: '图片',
    icon: IconImage
  },
  {
    id: ActiveType.SVG,
    name: 'SVG',
    icon: IconVideo
  },
  {
    id: ActiveType.GIF,
    name: 'GIF'
  }
]
