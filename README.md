# Rest-to-graphql-migration

An app trying to be useful, but being useful is beside the point here.

## Local development with docker compose

1. Navigate to root
2. Run the following

```sh
npm run dev

```

This will spin up both the frontend (port 5173) and the backend (port 4000).

If you want to see application logs, open another terminal and run:

```sh
npm run logs

```

To stop the container stack run

```sh
docker compose down

```

## Local development without docker compose

### Frontend

1. Navigate to packages/frontend
2. Run the following

```sh
npm run dev

```

### Backend

1. Navigate to packages/backend
2. Run the following

```sh
npm run dev

```

### json-server
1. Navigate to packages/backend
Run the following:

```sh
json-server --watch db.json --port 3001
```
