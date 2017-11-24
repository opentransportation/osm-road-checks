# OSMLinter using OSM QA Tiles

## How to Start

## Install

Using the current/latest version of NodeJS

```bash
$ git clone git@github.com:opentransportation/osmlinter-qa-tiles.git
$ cd osmlinter-qa-tiles
$ npm install
```

### Download latest [OSM QA Tiles](https://osmlab.github.io/osm-qa-tiles/)

```
$ wget https://s3.amazonaws.com/mapbox/osm-qa-tiles-production/latest.country/indonesia.mbtiles.gz
$ gzip -d indonesia.mbtiles.gz
```

## Start a process

The process will pipe out GeoJSON Features line by line which allows you to stream the data to a file.

There are a few default models that you can pick from, for instace `--model highways` will pipe out all features containing a highway tag from the OSM QA Tiles.

```bash
$ ./bin/osmlinter.js indonesia.mbtiles --tiles [[3258,2116,12]] --model highways > results.geojson
```

## Customize Model

You can modify each operation by providing your own customized script by providing filepath to your script. For example if you want to modify the `reduce.js` script, you would simply add `--reduce myscript/reduce.js` to the CLI.

There are 4 main scripts you can modify:

- `--map`: Fired just before a tile is sent to a worker.
- `--reduce`: Fired when a tile has finished processing.
- `--end`: Fired when all queued tiles have been processed.
- `--start`: Fired before the queued tiles have been processed.

## CLI

```
  Usage:
    $ osmlinter <qa-tiles>
  Options:
    --output      [osmlinter] Filepath to store outputs
    --bbox        Excludes QATiles by BBox
    --tiles       Excludes QATiles by an Array of Tiles
    --debug       [false] Enables DEBUG mode
    --model       [default] Select pre-defined OSMLinter Model
    --map         [models/default/map.js] Map script filepath
    --reduce      [models/default/reduce.js] Reduce script filepath
    --end         [models/default/end.js] Reduce script filepath
    --mapOptions  Passes through arbitrary options to workers. Options are made available to map scripts as global.mapOptions
    --maxWorkers  By default, TileReduce creates one worker process per CPU. maxWorkers may be used to limit the number of workers created.
  Examples:
    $ osmlinter indonesia.mbtiles --model highways > results.geojson
    $ osmlinter indonesia.mbtiles --tiles [[3258,2116,12],[3259,2117,12]] > results.geojson
    $ osmlinter indonesia.mbtiles --bbox [106.3,-6.0,106.4,-5.9] > results.geojson
```

## Models

### 2000+ Node Highways

To find highways with greater than 1500+ nodes since the OSM maximum limit in OSM is 2000 nodes.

```
$ ./bin/osmlinter.js indonesia.mbtiles --model 2000-node-highways > results.geojson
Starting up 4 workers... Job started.
Processing tile coords from "qatiles" source.
23623 tiles processed in 53s.
786102 GeoJSON Features scanned
@id 37947193 => 1839 Nodes
@id 67225347 => 1755 Nodes
@id 149985946 => 1625 Nodes
@id 158317029 => 1668 Nodes
@id 170307501 => 1589 Nodes
@id 174085512 => 1856 Nodes
@id 175856372 => 1993 Nodes
@id 181657761 => 1556 Nodes
@id 185735318 => 1775 Nodes
@id 197840211 => 1770 Nodes
@id 204215338 => 1677 Nodes
@id 243250345 => 2004 Nodes
@id 284136037 => 1882 Nodes
@id 289507655 => 1859 Nodes
@id 323124169 => 1919 Nodes
@id 354013132 => 1722 Nodes
@id 359869305 => 1796 Nodes
@id 360088015 => 1568 Nodes
@id 366065991 => 1694 Nodes
@id 384335286 => 1571 Nodes
@id 384543779 => 1638 Nodes
@id 385836193 => 1598 Nodes
@id 440237215 => 1799 Nodes
@id 444883124 => 1990 Nodes
@id 458350011 => 1548 Nodes
@id 471337757 => 1595 Nodes
@id 477695390 => 1640 Nodes
@id 536910559 => 1568 Nodes
```

## Models (To-Do)

- Bridge Road classification different from before & start highway (http://www.openstreetmap.org/way/377069055)
- Poor Geometry Highway
- Untagged highways
