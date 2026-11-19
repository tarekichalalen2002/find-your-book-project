# Find your book

A book recommendation site. Readers register, mark what they have read, want to read, or liked, follow other readers, and follow authors. Recommendations are Cypher queries over that graph, not a separate machine-learning model. The database is Neo4j. The API is Express. There are two React apps: the reader and admin site in `frontend/findyourbook`, and a smaller catalog app in `client`.

## Graph

Everything is a node and a relationship in the `neo4j` database.

| Node | Stored fields |
| --- | --- |
| `Reader` | `first_name`, `last_name`, `email`, bcrypt `password`, `picture`, `bio`, `createdAt` |
| `Book` | `isbn`, `title`, `description`, `page_count`, `ratings_average`, `ratings_count`, `readings_count` |
| `Author` | `key`, `name` |
| `Genre` | `name` |
| `Publisher` | `name` |

| Relationship | Meaning |
| --- | --- |
| `HAS_WRITTEN` | Author wrote the book. Property `date` |
| `HAS_PUBLISHED` | Publisher published the book. Property `date` |
| `SPEAK_ABOUT` | Book belongs to a genre |
| `HAS_READ` | Reader finished the book. Properties `rating`, `review`, `date`. A rating above the controller’s threshold also creates `LIKE` |
| `HAS_READ_GENRE` | Reader has read a genre. Property `reading_count`, incremented on each new read |
| `WANT_READ` | Reader saved the book to read later. Property `date` |
| `LIKE` | Reader liked the book |
| `VISITED` | Reader opened the book. Repeat visits update the same relationship |
| `FOLLOWS` | Reader follows another reader |
| `FAN_OF` | Reader follows an author |

Adding a book refuses a duplicate ISBN, then creates the book and merges its authors, genres, and publisher.

## Recommendations

All of these live under `/api/v1/recommendations` and skip books the reader has already read. Most also skip books already on the want-to-read list. `viewMore` in the JSON body pages the result.

| Route | What it returns |
| --- | --- |
| `POST /global/:id` | One ranked list. Points come from books by followed authors (5), books liked by people the reader follows (4), books liked by people those people follow (1), books liked by readers who liked the same books (3), books in a liked genre (2), books from a liked book’s publisher (1), books in a visited genre (2), books visited by people the reader follows (1), books in a want-to-read genre (3), and books visited by the reader and by someone they follow (2). If that list is short, it fills with the highest-rated books the reader has not read or saved |
| `POST /readertastes/:id` | Highest-rated books in genres the reader has already read |
| `POST /friendtastes/:id` | Books people the reader follows have read or saved |
| `POST /readerauthors/:id` | Books by authors the reader is a fan of |
| `GET /books/similar/:isbn` | Other books by the same authors, plus books in the same genres |
| `GET /books/readers/:isbn` | Other books read by people who read this one |

Each item is `[isbn, title, ratings_average]`.

## Statistics

`/api/v1/statistics` counts nodes and relationships.

- `GET /global` counts books, readers, authors, publishers, genres, and how many books are read, visited, wanted, or liked, plus genre breakdowns.
- `GET /personal/:id` is the same kind of counts for one reader, including visits and reads over time.
- `GET /bookvisits/:isbn` is the visit history of one book.

## HTTP API

The server listens on `PORT` or **3000**. Every route below `/api/v1` except login and register requires `Authorization: Bearer <token>`. Tokens last 30 days and are signed with `JWT_SECRET`. `middleware/authAdmin.js` expects an `Admin ` prefix and `JWT_SECRET_ADMIN`, but `app.js` does not mount that middleware. Catalog routes use the reader check.

Login looks up a `Reader` by email, compares the password with bcrypt, and returns `{ token, user }`. Register creates a `Reader` with a bcrypt hash. The body is `firstName`, `lastName`, `email`, `password`, `picturePath`, `bio`.

| Prefix | Main operations |
| --- | --- |
| `POST /api/v1/register` | Create a reader |
| `POST /api/v1/login` | Email and password |
| `/api/v1/books` | List, create, delete. `POST /search` by name. `GET /:isbn`. `GET /reviews/:isbn` |
| `/api/v1/authors` | List, create, delete. `GET /:key`, `GET /books/:key`, `GET /fans/:key` |
| `/api/v1/genres` | List, create, delete. Books, readers, and authors for one genre name |
| `/api/v1/readers` | All readers. Profile by id or email. Read, want, visited, and liked books. Genres, friends (`FOLLOWS`), and followed authors |
| `/api/v1/recommendations` | The six queries above |
| `/api/v1/statistics` | Global, personal, and per-book visit stats |
| `/api/v1/avatars` | `GET` and `DELETE /:id`. `POST /upload/:id` with multipart field `file` |

A reader’s read list is `GET`, `POST`, and `DELETE /readbooks/:id`. Want-to-read is the same shape on `/wantbooks/:id`. Visited books are get and post only. Liked books are get and delete. Friends and followed authors are get, post, and delete.

Unknown paths return the app’s 404 error. `controllers/errorController.js` formats thrown `AppError`s.

## Reader and admin site

`frontend/findyourbook` is Create React App with React Router, Redux, Tailwind, Formik, and Chart.js. `App.js` switches the page background with a light and dark mode flag in Redux.

| Path | Screen |
| --- | --- |
| `/` | Login |
| `/register` | Register |
| `/users/:id/home` | Home |
| `/users/:id/explore` | Explore |
| `/users/:id/saved` | Saved books |
| `/users/:id/preferences` | Preferences |
| `/users/:id/personalStatistics` | That reader’s charts |
| `/users/:id/globalStatistics` | Site-wide charts |
| `/books/:id` | One book |
| `/authors/:id` | One author |
| `/search/:query` | Search results |
| `/admin` | Admin login |
| `/admin/home` | Admin home |
| `/admin/stats` | Admin statistics |
| `/admin/users` | Users |
| `/admin/add-book` | Add a book |
| `/admin/add-author` | Add an author |

The sidebar links Home, Explore, Global statistics, Saved, Personal statistics, and Preferences. Those links are written as the literal path `/users/:id/...`, so they do not substitute the signed-in reader’s id. The profile block shows a fixed name, “Arthur Alvarez”, and the label “Premium Plan”.

## Catalog app

`client/` is a Vite app with Redux and Tailwind. It is a shorter catalog, not the full reader dashboard.

| Path | Screen |
| --- | --- |
| `/` | Paginated book list. The header button goes to add-book |
| `/authors` | Authors |
| `/add-book` | Add a book |
| `/register` | Sign-in form |
| anything else | Home |

It requests `http://localhost:3001/api/v1/books`. The API in this repo defaults to port 3000, and that request does not send a Bearer token, which the books route requires.

## Layout

| Path | Role |
| --- | --- |
| `api/server.js` | Loads `config.env`, listens, exits on uncaught errors |
| `api/app.js` | Mounts the routers and the 404 handler |
| `api/neo4j.js` | Neo4j driver from `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` |
| `api/controllers/` | Cypher for each resource |
| `frontend/findyourbook/` | Reader site and admin screens |
| `frontend/package.json` | Empty package shell. The app to install is inside `findyourbook` |
| `client/` | Vite catalog |

## Run

Neo4j has to be up. `api/config.env` is what `server.js` loads:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=neo4j://localhost:7687
DATABASE_USERNAME=neo4j
DATABASE_PASSWORD=change-me
JWT_SECRET=change-me
```

```bash
cd find-your-book-project/api
npm install
npm start
```

Reader and admin UI, on the usual Create React App port 3000 (change `PORT` on the API if both need to run together):

```bash
cd find-your-book-project/frontend/findyourbook
npm install
npm start
```

Catalog UI:

```bash
cd find-your-book-project/client
npm install
npm run dev
```
