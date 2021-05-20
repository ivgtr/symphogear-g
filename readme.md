# symphogear-g

cacheable mp3 player from files and url for CLI

[![Publish to npm](https://github.com/ivgtr/symphogear-g/actions/workflows/publish.yml/badge.svg)](https://github.com/ivgtr/symphogear-g/actions/workflows/publish.yml)

> 📌✨ Forked: https://github.com/akameco/symphogear

## Differences from the original version.

- support `node:>=12.17`
- `JS` -> `TS`
- Made file writing stream.
- Deletes the cache when playback fails.

## Usages

### CLI

```shell
$ npm install --global symphogear-g
```

```shell
$ symphogear --help

	Usage
	  $ symphogear [file]

	Examples
	  $ symphogear さな.mp3

	  $ symphogear http://sanabutton.ojaru.jp/sound/%E3%81%9B%E3%82%93%E3%81%9B%E3%81%88%E3%81%A8%E3%81%AA%E3%81%84%E3%81%97%E3%82%87%E3%81%B0%E3%81%AA%E3%81%97/%E3%81%A4%E3%81%8E%E3%81%A4%E3%81%8E%E3%81%A4%E3%83%BC%E3%81%8E06.mp3
```

### Packages

```shell
$ yarn add symphogear-g
```

```js
const symphogear = require("symphogear-g");

await symphogear("music.mp3");
```

## License

MIT ©[ivgtr](https://github.com/ivgtr)

[![Twitter Follow](https://img.shields.io/twitter/follow/ivgtr?style=social)](https://twitter.com/ivgtr) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)
