export const isSong = (obj: any): obj is Song => {
  return (
          obj != null &&
          typeof obj.id==="number" &&
          typeof obj.title==="string" &&
          typeof obj.key ==="string" &&
          typeof obj.instrumentation==="string" &&
          typeof obj.notes==="string"
          )
}

export interface Song {
  title: string,
  key: string,
  instrumentation: string,
  notes: string
  setlist_id: number
}

export interface SongWithId extends Song {
  id: number,
  order_index: number,
}

export interface SetlistInterface {
  title: string,
  date: string
}

export interface SetlistWithId extends SetlistInterface {
  id: number,
  user_id: number
}
