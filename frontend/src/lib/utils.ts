import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx + tailwind-merge.
 * Sử dụng: cn('px-4 py-2', isActive && 'bg-blue-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format số thành tiền VNĐ: 2,790,000 đ
 */
export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}

/**
 * Format số thành tiền USD: $18,900
 */
export function formatUSD(amount: number): string {
  return '$' + amount.toLocaleString('en-US');
}

/**
 * Lấy chữ cái đầu từ tên (cho avatar)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Truncate text với ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
}

/**
 * Delay helper cho async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Tính toán tài chính seller cho 1 sản phẩm
 */
export function calculateSellerFinancials(retailPrice: number) {
  const PLATFORM_FEE = 0.035;
  const VAT = 0.08;
  const COGS_RATIO = 0.58;

  const originalPrice = Math.round((retailPrice * 1.18) / 10000) * 10000;
  const cogsPrice = Math.round((retailPrice * COGS_RATIO) / 10000) * 10000;
  const platformFee = Math.round(retailPrice * PLATFORM_FEE);
  const vatFee = Math.round(retailPrice * VAT);
  const netProfit = retailPrice - cogsPrice - platformFee - vatFee;
  const marginPercent = retailPrice > 0 ? ((netProfit / retailPrice) * 100).toFixed(1) : '0.0';

  return { originalPrice, cogsPrice, platformFee, vatFee, netProfit, marginPercent };
}

/**
 * Detect brand name từ tên sản phẩm
 */
export function detectBrand(productName: string): string {
  const name = productName.toLowerCase();
  if (name.includes('adidas')) return 'ADIDAS';
  if (name.includes('balenciaga')) return 'BALENCIAGA';
  if (name.includes('dior')) return 'DIOR';
  if (name.includes('nike')) return 'NIKE';
  if (name.includes('puma')) return 'PUMA';
  return 'GUCCI';
}

/**
 * Tạo mã SKU prefix từ tên sản phẩm
 */
export function generateSkuCode(productName: string, productId: number): string {
  const name = productName.toLowerCase();
  let prefix = 'GC';
  if (name.includes('adidas')) prefix = 'AD';
  else if (name.includes('balenciaga')) prefix = 'BL';
  else if (name.includes('dior')) prefix = 'CD';
  else if (name.includes('nike')) prefix = 'NK';
  else if (name.includes('puma')) prefix = 'PM';
  return `${prefix}-${productId.toString().padStart(5, '0')}`;
}
