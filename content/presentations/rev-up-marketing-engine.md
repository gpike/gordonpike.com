---
title: 'Rev Up Your Marketing Engine'
date: 2016-09-09
event: "EVOLVE'16 | Enhance"
location: 'Virtual'
duration: '40 mins'
tags: ['AEM', 'Analytics', 'Marketing', 'Performance', 'ELK Stack']
cover_image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
slides_url: 'https://www.slideshare.net/slideshow/evolve16-enhance-gordon-pike-rev-up-your-marketing-engine/65872324'
video_url: ''
description: 'Session on building ELK-powered AEM dashboards to monitor site health and drive marketing performance decisions.'
takeaways:
   - Build log data pipelines that support measurable, actionable KPIs.
   - Use ELK architecture to move from reactive troubleshooting to proactive operations.
   - Align analytics strategy with business outcomes, not vanity metrics.
---

# Rev Up Your Marketing Engine

You've invested in AEM as your marketing engine. You need a dashboard that shows how your sites are working, know before your customers call that you have a problem. In this session, I'll show you how to build a metrics dashboard that shows how healthy your apps are and alert you when it's not working.

## Key Topics

### Log Data Strategy

- **Measure**: If you can't measure it, you can't improve it
- **Monitor**: Turn measurements into actions
- **Discover**: Query metrics to uncover insights
- **Audit**: Maintain retrievable history

### Log Collection vs. Inline Collection

Log collection is measured in nanoseconds or microseconds, optimized for write, and has minimal impact on site performance. Inline collection, however, is measured in milliseconds or seconds, includes JavaScript, external links, and increases page latency.

### ELK Stack Architecture

The ELK (Elasticsearch, Logstash, Kibana) stack provides a complete solution for log management:

- **Filebeat**: Lightweight log forwarder that collects, pre-processes, and forwards log data
- **Logstash**: Data collection engine that unifies data from disparate sources and normalizes it
- **Elasticsearch**: Document-oriented storage that makes all data searchable and analyzable
- **Kibana**: Visualization platform that provides real-time summary and charting of data

### Implementation with AEM

The architecture integrates with AEM components:

- Author, Publisher, and Dispatcher logs are collected
- Filebeat agents ship logs to Logstash
- Logstash processes and enriches the data
- Elasticsearch stores the data
- Kibana provides visualization and analysis

## Key Insights

1. **Log data is valuable**: Medium to large sites can generate 20-30 GB of log data daily, which is often collected and forgotten.

2. **Choose the right metrics**: Not all metrics are equal. Focus on Key Performance Indicators (KPIs) that align with your business goals rather than vanity metrics.

3. **Make KPIs SMART**: Specific, Measurable, Attainable, Relevant, and Time-bound.

4. **Different site types need different KPIs**:

   - Blog sites: Subscriber rate, leads per day, income per page
   - eCommerce sites: Conversion rate, cart abandonment rate, products per order
   - Lead generation sites: Leads per day, form abandonment, content requests

5. **Log management maturity levels** progress from reactive (debugging, troubleshooting) to proactive (monitoring, analyzing).

By implementing a comprehensive log data strategy with the ELK stack, you can transform your AEM investment into a powerful marketing engine that provides actionable insights and proactive monitoring.
