export default function selectRandomIn<T = unknown>(collection: T[]): T {
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}
