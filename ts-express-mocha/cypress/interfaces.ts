export interface User {
  id: string;
  name: string;
  password: string;
}

export interface CreateListPayload {
  list: List;
}

export interface AddSongPayload {
  song: Song;
}

export interface List {
  name: string;
  songs: Song[];
}

export interface Song {
  title: string;
  artist: string;
}
