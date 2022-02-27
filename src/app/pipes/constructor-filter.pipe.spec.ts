import { ConstructorFilterPipe } from './constructor-filter.pipe';

describe('ConstructorFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ConstructorFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
