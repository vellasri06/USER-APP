import { GenderCountPipe } from './gender-count.pipe';

describe('GenderCountPipe', () => {
  it('create an instance', () => {
    const pipe = new GenderCountPipe();
    expect(pipe).toBeTruthy();
  });
});
