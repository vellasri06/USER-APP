import { WorkingCountPipe } from './working-count.pipe';

describe('WorkingCountPipe', () => {
  it('create an instance', () => {
    const pipe = new WorkingCountPipe();
    expect(pipe).toBeTruthy();
  });
});
