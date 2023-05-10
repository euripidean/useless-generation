# Endpoints
![Manic Street Preachers circa 2018](https://i.guim.co.uk/img/media/6c507bb1354046ab8568890b7b3727fed8110d6e/0_596_4116_2470/master/4116.jpg?width=1020&quality=45&dpr=2&s=none)

## Album Queries

### GET Requests
- GET /albums - returns all albums
- GET /albums/:albumId - returns a single album by id
- GET /albums/:albumId/songs - returns all songs from a single album by id

### POST Requests
- POST /albums - creates a new album
- POST  /:albumId/songs - creates a new song for an album by id

### PUT Requests
- PUT /albums/:id - updates an album by id

### DELETE Requests
- DELETE /albums/:id - deletes an album by id

## Song Queries
- GET /songs - returns all songs
- GET /songs/:songId - returns a single song by id

### POST Requests
- POST /songs - creates a new song

### PUT Requests
- PUT /songs/:id - updates a song by id

### DELETE Requests
- DELETE /songs/:id - deletes a song by id

