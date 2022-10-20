export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

export function formatTime(timestamp: number | undefined): string {
  if (timestamp) {
    return new Date(timestamp).toLocaleTimeString('en-US');
  }
  return '-';
}

export function formatDate(timestamp: number | undefined): string {
  if (timestamp) {
    return `${new Date(timestamp).getDate().toString()} ${new Date(timestamp).toLocaleString('en-us', { month: 'long' })}`;
  }
  return '-';
}

export const formatCurrency: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});
