import { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/src/tasks/tests/task[0-9]+.test.[jt]s?(x)'],
}

export default createJestConfig(config)