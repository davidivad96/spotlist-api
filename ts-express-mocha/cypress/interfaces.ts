export interface CreateListPayload {
  list: List;
}

export interface CreateUserPayload {
  user: User;
}

export interface AddSongPayload {
  song: Song;
}

export interface Song {
  title: string;
  artist: string;
}

export interface List {
  name: string;
  songs: Song[];
}

export interface User {
  name: string;
  password: string;
}

export interface DBUser extends User {
  id: string;
}
