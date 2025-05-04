export default {
    rootDir: '.', // 👈🏼 muy importante
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // o testRegex: '.*\\.spec\\.ts$'
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleDirectories: ['node_modules', 'src'],
  };
  