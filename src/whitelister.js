import Url from 'node:url'

class Whitelister {
	constructor(allowed) {
		this.allowedProtocols = ['http:', 'https:']

		if (!Array.isArray(allowed) && typeof allowed !== 'string') {
			throw new TypeError('allowed must be an array or string')
		}

		if (typeof allowed === 'string') {
			allowed = [allowed]
		}

		this.allowed = allowed.map(allow => new RegExp(`^${allow.split('*').join('.*')}$`))
	}

	verify(url) {
		const parsed = Url.parse(url, true)
		const {hostname, protocol} = parsed

		if (!this.allowedProtocols.includes(protocol)) {
			return false
		}

		return this.allowed.some(allow => allow.test(hostname))
	}
}

export default Whitelister
