// generate https://app.quicktype.io/?l=ts

export interface Post {
  title:           string
  titleCustom:     string
  slug:            string
  date:            string
  url:             string
  category:        string[]
  credit:          string
  colorBackground: string
  colorText:       string
  colorCustom:     string
  archive:         boolean
  notAvailable:    boolean
  thumbnail:       Image
  images:          Image[]
}

export interface Image {
  _id:         string
  altText:     string
  description: string
  fileName:    string
  fileSize:    number
  fileType:    string
  height:      number
  metadata:    Metadata
  src:         string
  title:       string
  width:       number
}

export interface Metadata {
}
