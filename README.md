# whitelister

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]:       https://img.shields.io/npm/v/@tadashi/whitelister.svg
[npm]:           https://www.npmjs.com/package/@tadashi/whitelister
[ci-img]:          https://github.com/lagden/redirect-whitelister/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/redirect-whitelister/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/redirect-whitelister/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/redirect-whitelister?branch=master


```shell
npm install -S @tadashi/whitelister
```


## Usage

```js
import Whitelister from 'whitelister'

const whitelister = new Whitelister(<domain-list>)
const validUrl = whitelister.verify('https://example.com/test/1234?s=test')
```


#### Options

  - `domain-list` - Either an array or single string domain. Domains may contain wildcards eg: `test.*.example.com`. You can also use simple regex (see tests cases).


#### Overriding Protocols

By default only http and https are allowed. If you need to change this, say to support a custom protocol for a mobile app:

```javascript
import Whitelister from 'whitelister'
const whitelister = new Whitelister(<domain-list>)

whitelister.allowedProtocols = ['gopher:', 'http:', 'https:']
```

#### Validating a url

- `verify(<url>)` - Returns a boolean if the url contains a domain that matches any of the allowed domains.
