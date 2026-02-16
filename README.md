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

## Application Layers
### `domain`
Core business/domain logic and entities of the application.
Should be the core "brains" of the application and have low-to-zero third party(!) dependencies, meaning the logic of data in your application shouldn't be coupled to specific libraries or hosting models.

### `adapter`
Adapters are the contact points to "the outside world" in the application. Adapters define what real life solution is used for example for data persistence, messaging, automated workflows, hosting or deployment.
Crucially a http server is an adapter.

### `port`
Ports are the shared contracts between the `domain` and `adapter` layers which describe interfaces that both major sides of the application must adhere to.

### `lib`
TBD, intended for shared code with low-to-zero deps like utility functions, math etc.
