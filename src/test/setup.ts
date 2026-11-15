import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Bersihkan DOM setelah setiap test supaya test tidak saling memengaruhi.
afterEach(() => cleanup())
