# whitelister


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
  
