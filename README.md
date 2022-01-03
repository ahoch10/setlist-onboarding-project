# setlist-onboarding-project

This is my onboarding project at Kepler Group.
The purpose of the project is to put all the technologies I have learned together in one project.

## What it does

This setlist app allows you to create setlists, add songs, drag and drop the songs to change the order.
You can also login through Spotify OAuth and export setlists as Spotify playlists.

## Structure

The overall structure of the project includes a database, an API, and a frontend user interface.
The project also connects to Spotify's API using Spotipy, a Python SDK for the Spotify API.

## Technologies

* Python
* Poetry
* Flask
* PostgreSQL
* Flask-SQLAlchemy
* Flask-Migrate
* Typescript
* React
* react-beautiful-dnd
* CSS

## Challenges
* Persisting order of songs after drag-n-drop
* Connecting to Spotify

## Future Improvements
* More beautiful UI
* Organize setlists by date
* Additional Spotify functionality beyond choosing the firt song searched
