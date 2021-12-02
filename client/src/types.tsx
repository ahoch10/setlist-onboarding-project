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
}

export interface SongwithId extends Song {
  id: number
}
