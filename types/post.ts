export interface Post {
  _id: string
  title: string
  titleCustom: string
  slug: string
  date: string
  url: string
  category: Array<string>
  credit: string
  colorBackground: string
  colorText: string
  colorCustom: string
  archive: Boolean
  notAvailable: Boolean
  thumbnail: any
  images: any
  // thumbnail: Object
  // images: Array<object>
}
