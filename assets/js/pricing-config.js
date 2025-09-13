// Pricing configuration
const PRICING_CONFIG = {
  monthlyRetainer: {
    price: 700,
    period: 'workflow/month',
    description:
      'Fixed monthly fee for ongoing automation management and support.',
  },
  setupFee: {
    price: 700,
    period: 'workflow',
    description: 'One-time fee for new workflow automation development.',
  },
  trustIndicators: ['99.9% Uptime', '24/7 Support', 'GDPR Compliant'],
  comparison: {
    traditional: {
      hiring: 'Hiring 1 FTE: $4,000+/month',
      development: 'Custom development: $10,000+',
      maintenance: 'Ongoing maintenance: $1,000+/month',
      support: 'Training & support: $500+/month',
      infrastructure: 'Infrastructure costs: $200+/month',
      total: '$15,700+ (First year estimate)',
    },
    flowchat: {
      setup: 'Setup Fee: $700 (one-time)',
      monthly: 'Monthly Retainer: $700/month',
      maintenance: 'Included maintenance',
      support: 'Included training & support',
      infrastructure: 'Included infrastructure',
      totalFirstMonth: '$1,400 (First month)',
      totalOngoing: '$700/month thereafter',
    },
    savings: {
      firstMonth: '91% cost reduction first month',
      ongoing: '95%+ cost reduction ongoing',
      zeroSetup: 'Zero infrastructure setup',
      noExpertise: 'No technical expertise needed',
      monitoring: '24/7 monitoring & support',
      total: '90%+ Savings with guaranteed results',
    },
  },
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRICING_CONFIG };
}
