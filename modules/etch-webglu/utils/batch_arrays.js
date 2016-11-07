/* @flow */

type Batch<T> = {
  data: T,
  size: number,
};

function* batchArrays<T: $TypedArray>(buffer: T, items: Iterable<T>): Iterable<Batch<T>> {
  let position = 0;
  let available = buffer.length;

  for (let item of items) {
    while (item.length > available) {
      buffer.set(item.slice(0, available), position);
      yield { data: buffer, size: buffer.length };

      item = item.slice(available);
      position = 0;
      available = buffer.length;
    }

    buffer.set(item, position);
    position += item.length;
    available -= item.length;
  }

  if (position > 0) {
    yield { data: buffer, size: position };
  }
}

export default batchArrays;
