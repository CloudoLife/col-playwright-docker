
# col-playwright-docker

[col-playwright-docker](https://github.com/CloudoLife/col-playwright-docker) is a Docker image to use [Fast and reliable end-to-end testing for modern web apps | Playwright - https://playwright.dev/](https://playwright.dev/) to test Web applications automatically.

## Usage

```shell
$ git clone https://github.com/CloudoLife/col-playwright-docker.git

$ cd col-playwright-docker

$ docker build .
# Or run docker-compose build
```

### Docker 

Edit or modify [./Dockerfile](./Dockerfile) with your preferred content.

```Dockerfile
# Docker | Playwright
# https://playwright.dev/docs/docker
# ARG IMAGE=mcr.microsoft.com/playwright:bionic
ARG IMAGE=mcr.microsoft.com/playwright:focal

FROM ${IMAGE}

ARG WORK_DIR="/app"
RUN mkdir -p ${WORK_DIR}

WORKDIR ${WORK_DIR}
COPY . ${WORK_DIR}

RUN npm i -D playwright
```

Run with `docker` command.

```shell
$ docker build 

$ docker run -it --rm --name col-playwright-docker col-playwright-docker bash
```

### Docker Compose

Edit or modify [./docker-compose.yml] with your preferred content.

```yaml
# docker-compose.yml

version: '3'

services:
  # docker-compose run app bash
  # docker-compose run --service-ports app bash
  app:
    build:
      context: .
    image: col-playwright-docker
    # ports:
    #   - 3000:3000
    # environment:
    #   - FLAG_debug_print=true

    volumes:
      - "./:/app"
```

Run with `docker-compose` command.

```shell
$ docker-compose run app bash
```

## References

[1] [CloudoLife/col-playwright-docker: col-playwright-docker - https://github.com/CloudoLife/col-playwright-docker](https://github.com/CloudoLife/col-playwright-docker)

[2] [cloudolife/col-playwright - https://hub.docker.com/r/cloudolife/col-playwright](https://hub.docker.com/r/cloudolife/col-playwright)

[3] [Fast and reliable end-to-end testing for modern web apps | Playwright - https://playwright.dev/](https://playwright.dev/)