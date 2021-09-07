export class SharedAlbumModel {
  album: any;
  user: string;
  idUser:number;

  constructor(album: any, user: string, idUser: number) {
    this.album = album;
    this.user = user;
    this.idUser = idUser;
  }
}
