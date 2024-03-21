export enum Role {
  Admin = "8816",
  User = "0808",
}

export enum HeaderKey {
  clientId = "x-client-id",
  apiKey = "x-api-key",
  contentType = "content-type",
  token = "authorization",
}

export enum Gender {
  Female = 1,
  Male = 2,
  NonBinary = 3,
}

export enum ContentType {
  Single = 1,
  Series = 2,
  Shows = 3,
  Animation = 4,
  Cinema = 5,
  Vietnamese = 6,
}

export enum Status {
  Trailer = 1,
  OnGoing = 2,
  Full = 3,
}
