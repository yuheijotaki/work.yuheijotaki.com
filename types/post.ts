// microCMS API レスポンス型定義

export interface PostListItem {
  id:         string
  title:      string
  slug:       string
  date:       string
  category:   Category[]
  thumbnail?: Image
}

export interface PostDetail extends PostListItem {
  url:          string
  credit:       string
  colorText:    string
  archive:      boolean
  notAvailable: boolean
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
