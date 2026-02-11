// microCMS API レスポンス型定義

export interface Post {
  id:           string
  createdAt:    string
  updatedAt:    string
  publishedAt:  string
  revisedAt:    string
  title:        string
  slug:         string
  date:         string
  url:          string
  category:     Category[]
  credit:       string
  colorText:    string
  archive:      boolean
  notAvailable: boolean
  thumbnail?:   Image
  images?:      Image[]
}

export interface Category {
  id:          string
  createdAt:   string
  updatedAt:   string
  publishedAt: string
  revisedAt:   string
  title:       string
  slug:        string
}

export interface Image {
  url:    string
  width:  number
  height: number
}
