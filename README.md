# wol-node

## Build
```bash
$ docker build --tag wol-node .
```

## Usage
```bash
$ docker run \
    --env PORT=8080 \
    --env WOL_BROADCAST=10.10.0.1 \
    --env WOL_MAC=00:00:00:00:00 \
    wol-node
```
