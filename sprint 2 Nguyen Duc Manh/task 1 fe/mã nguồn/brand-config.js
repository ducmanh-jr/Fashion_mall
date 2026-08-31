/* ==============================================================================
 * DYNAMIC BRAND IDENTITY CONFIGURATION (White-label Brand System)
 * Phù hợp tiêu chuẩn thiết kế sản phẩm Mobbin / SaaS White-label
 * ============================================================================== */

const BRAND_CONFIG = {
    name: 'Aethelgard',
    subTitle: 'AI E-Commerce Shopping Mall',
    slogan: 'Nền tảng mua sắm thương mại điện tử đa ngành hàng tích hợp AI',
    badgeText: 'AI Smart Marketplace v3.0',
    headline: 'Create your shopping account',
    description: 'Your personal shopping space starts here. Create an account for full access to all categories, exclusive deals, and AI smart shopping.',
    
    // Support info
    supportEmail: 'support@aethelgard.com',
    supportLang: 'VI/EN',
    
    // Primary Hue Accent Token
    primaryHue: 238
};

if (typeof module !== 'undefined') {
    module.exports = { BRAND_CONFIG };
}
