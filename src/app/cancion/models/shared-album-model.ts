export class SharedAlbumModel {
  album: any;
  user: string;

  constructor(album: any, user: string) {
    this.album = album;
    this.user = user;
  }
}
