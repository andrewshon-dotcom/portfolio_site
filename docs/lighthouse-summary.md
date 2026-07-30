# Lighthouse audit summary

Audit date: 2026-07-30 (Asia/Tokyo)  
Lighthouse: 13.4.1  
Target: `http://localhost:3000/`  
Build: Next.js production server  
Configuration: standard desktop preset, 1440 × 1000 screen emulation

## Scores

| Category       | Score |
| -------------- | ----: |
| Performance    |    93 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |   100 |

## Core lab metrics

| Metric                   | Result |
| ------------------------ | -----: |
| First Contentful Paint   |  0.5 s |
| Largest Contentful Paint |  1.1 s |
| Speed Index              |  1.2 s |
| Total Blocking Time      | 170 ms |
| Cumulative Layout Shift  |      0 |

The final pass keeps the interactive hero and card motion while removing
expensive document-wide scroll timelines. Native `content-visibility` defers
the long page's off-screen rendering without removing its semantic content or
breaking fragment navigation.
