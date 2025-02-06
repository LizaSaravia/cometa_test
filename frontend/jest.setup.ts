// frontend/jest.setup.ts
if (!global.fetch) {
    global.fetch = jest.fn();
  }
import '@testing-library/jest-dom';
