# OSMLinter using OSM QA Tiles

## How to Start

### Download latest [OSM QA Tiles](https://osmlab.github.io/osm-qa-tiles/)

```
$ wget https://s3.amazonaws.com/mapbox/osm-qa-tiles-production/latest.country/indonesia.mbtiles.gz
$ gzip -d indonesia.mbtiles.gz
```

## Install

Using the current/latest version of NodeJS

```bash
$ npm install
```

## Start Process

```bash
$ ./bin/osmlinter.js indonesia.mbtiles > results.geojson
```