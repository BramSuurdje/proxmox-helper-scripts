# Proxmox Helper Scripts

official re-design of the [Proxmox helper script website](https://tteck.github.io/Proxmox/)

feel free to fork the project. or post feedback in the [Discussion tab](https://github.com/BramSuurdje/proxmox-helper-scripts/discussions). your feedback is always welcomed.

## Todo

- [ ] fix issue with accordions not expanding when searching
- [X] when no item is selected. display populair scripts etc.

## How to contribute

First, install the dependencies:

```bash
npm install
# or 
yarn install
# or
pnpm install
# or
bun install
```

After that, run the docker container to host your own pocketbase instance

```bash
docker compose up -d
```

Head over to localhost:8080 and register with random details (will be overwritten later)
After that, apply the `pb_backup.zip` that is shipped in the repo.

you will be logged out from your pocketbase instance and you can then login again wit the following details
email: `example@example.com`
password: `changeme123`

finally you need to rename `example.env` to `.env`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
