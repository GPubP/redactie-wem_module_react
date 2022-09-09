# Events module (React)

### Install all dependencies

```
npm install 
```

### Build the library

```
// from root
npm run build
// or
npm run build:w
// To watch the file
```

## Deploy
### Publish library to package registry

```
npm login --scope=@redactie --registry=https://nexusrepo.antwerpen.be/repository/npm-all
npm publish
```

### WCM config

* add module/version to list of modules
* add translations module to dependencies
* enable module/version in tenant
