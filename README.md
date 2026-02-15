# hexagon tryout

To run you need: `localstack`

```bash
localstack start
```

After this, `docker ps` should output a container with your function.

```bash
npm run buildNotificationLambda
```

```bash
bun run dev
```
