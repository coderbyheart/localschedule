import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Unmount React trees between tests so queries don't see leftover DOM.
afterEach(() => {
	cleanup()
})
