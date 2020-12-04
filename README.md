<h1 align="center">Cardinal (WIP)</h1>

<p align="center">
    A jack-of-all-trades Discord bot for all your botty needs!
</p>

<p align="center" style="text-align: center">  
  <a href="https://github.com/hbjydev/cardinal/actions?query=workflow%3A%22Release+Builds%22">
    <img src="https://github.com/hbjydev/cardinal/workflows/Release%20Builds/badge.svg" />
  </a>
  <a href="https://results.pre-commit.ci/latest/github/hbjydev/cardinal/main">
    <img src="https://results.pre-commit.ci/badge/github/hbjydev/cardinal/main.svg" />
  </a>
</p>

---

### Setup

```shell
$ echo 'DISCORD_TOKEN=<your.token.here>' >> .env
$ npm install
$ npm run build
$ npm start
```

Or, for deployments to Kubernetes, there is an [official Helm chart](https://github.com/hbjydev/helm-charts/tree/main/charts/cardinal) available.

> Be aware, the Helm chart does *not* include a PostgreSQL database, you will have to provide a connection URI as an overridden value. See the repo for that information.
