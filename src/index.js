export function hello() {
  return 'demo-project-app';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(hello());
}
