// generate https://app.quicktype.io/?l=ts

export interface Post {
  _id:             string
  title:           string
  titleCustom:     string
  slug:            string
  date:            string
  url:             string
  categories:      Category[]
  credit:          string
  colorBackground: string
  colorText:       string
  colorCustom:     string
  archive:         boolean
  notAvailable:    boolean
  thumbnail:       Image
  images:          Image[]
}

export interface Category {
  _id:  string
  _sys: Sys
  name: string
  slug: string
}

export interface Sys {
  raw:         Raw
  customOrder: number
  createdAt:   Date
  updatedAt:   Date
}

export interface Raw {
  createdAt:        Date
  updatedAt:        Date
  firstPublishedAt: Date
  publishedAt:      Date
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

export interface Metadata {
}
