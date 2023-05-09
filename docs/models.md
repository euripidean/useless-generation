## Models

| Model | Description |
| :--- | :--- |
| Users | A user of the API
| Albums | Studio albums
| Songs | Songs contained on the studio albums (Original UK Releases only for now)


## Model Attributes


### User Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
id | Integer | Unique identifier for the user
username | String | Username of the user
password | String | Password of the user

### Album Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
| id | Integer | Unique identifier for the album
| title | String | Title of the album
| year | Number | The year the album was originally released
| totalTracks | Integer | Number of tracks on the album
| coverArtUrl | String | Url for the album cover (usually from Wikipedia)
| songs | Array | Array of songs on the album


### Song Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
| id | Integer | Unique identifier for the song
| title | String | Title of the song
| length | String | Length of the song
| isSingle | Boolean | Was the song ever released as a single
| highestChartPosition | Integer | Highest chart position the song reached in the UK
| singleReleaseDate | Date | Date the song was released as a single
| album | ObjectId | Album the song is on
