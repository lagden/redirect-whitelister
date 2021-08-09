/* eslint no-new: 0 */

import test from 'ava'
import Whitelister from '../src/whitelister.js'

test('invalid options', t => {
	t.throws(() => {
		new Whitelister()
	}, {instanceOf: TypeError, message: 'allowed must be an array or string'})
	t.throws(() => {
		new Whitelister(() => {})
	}, {instanceOf: TypeError, message: 'allowed must be an array or string'})
})

test('allows multiple domains', t => {
	const validator = new Whitelister([
		'example.com',
		'test.example.com',
	])
	t.true(validator.verify('https://example.com/query'))
	t.true(validator.verify('https://test.example.com/account'))
	t.false(validator.verify('http://google.com/search'))
})

test('allows single domain', t => {
	const validator = new Whitelister('example.com')
	t.true(validator.verify('https://example.com/query'))
	t.false(validator.verify('http://google.com/search'))
})

test('allows wildcard domains', t => {
	const validator = new Whitelister([
		'*.example.com',
		'test.*.example2.com',
	])
	t.false(validator.verify('https://example.com/query'))
	t.true(validator.verify('https://metrics.example.com/query'))
	t.false(validator.verify('https://test.example2.com/account'))
	t.true(validator.verify('https://test.auth.example.com/account'))
})

test('allows regex domains', t => {
	const validator = new Whitelister([
		'[a-n]+.com',
	])
	t.false(validator.verify('https://example.com/query'))
	t.true(validator.verify('https://acen.com/query'))
	t.false(validator.verify('https://acenz.com/query'))
})

test('Checks protocol', t => {
	const validator = new Whitelister('example.com')
	t.true(validator.verify('https://example.com/query'))
	t.false(validator.verify('gopher://example.com/query'))
})

test('Override protocol', t => {
	const validator = new Whitelister('example.com')
	validator.allowedProtocols = ['gopher:']

	t.false(validator.verify('https://example.com/query'))
	t.true(validator.verify('gopher://example.com/query'))
})
