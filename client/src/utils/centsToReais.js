export function centsToReais(cents) {
  return (cents / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}