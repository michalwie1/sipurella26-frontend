const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { sipService as local } from './sip.service.local'
import { sipService as remote } from './sip.service.remote'

function getEmptySip() {
	return {
        id: makeId(),
        giverName: '',
		email: '',
		receiverName: '',
		relation: '',
        event: '',
        storyInput: [],
        wish: '',
        backCover: '',
        imgs: []
	}
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const sipService = { getEmptySip, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.sipService = sipService
