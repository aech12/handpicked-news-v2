// import { setActivePinia, createPinia } from 'pinia'
import '@testing-library/jest-dom/extend-expect'

// setActivePinia(createPinia())

vi.mock('#imports', () => ({
  definePageMeta: (meta: any) => {},
}))
