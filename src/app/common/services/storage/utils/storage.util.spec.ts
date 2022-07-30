import { storageAvailable } from './storage.util';

describe('StorageAvailable', () => {
  it('should return boolean', () => {
    expect(storageAvailable('localStorage')).toBeTruthy();
  });
});
