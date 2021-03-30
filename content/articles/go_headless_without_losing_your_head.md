---
title: Go Headless Without Losing Your Head
date: 2019-06-23
published: true       
tags: ['AEM', 'Adobe Experience Manager']
series: false
cover_image: /images/articles/mika-748558-unsplash.jpg
cover_caption: Photo by Mika on Unsplash
canonical_url: false
author: Gordon Pike
author_image: /images/authors/GordonPike.jpg
description: "Use Adobe Experience Manager as a hybrid headless CMS"
---

<figcaption>Photo by Mika on Unsplash</figcaption>

It’s an exciting time in technology. There seems to be an ever increasing number of connected devices that becoming indispensable in our day to day lives. Our expectations of these devices continue to increase as well. We want them to do more, do it faster, when and where it’s convenient for us. This has led to an explosion of communication channels that marketers need to work with.

Smart brands see this as an opportunity to meet their customers at the right time, in the right context, bringing value that would have been difficult or impossible to deliver just a few years ago. The challenge for marketers is to seamlessly use each channel as a touchpoint for customers and still deliver a consistent brand story.

Many marketers are turning to a headless CMS’ as a backend only repository of digital assets to help keep a consistent brand message while covering the most channels.

# Traditional Content CMS
A traditional Content Management System (CMS), bundles digital asset management (DAM), site authoring tools and publishing capabilities into a complete platform. When the web was “the” channel for communication this worked well. It allowed authors to create digital content and deliver without waiting for a technical middle man. As new channels emerged authors were at the mercy of a CMS product development roadmap if they wanted to take advantage of a new channel. Producers of CMS’s want their products to appeal to a large market without losing an alienating an existing user base. It can take too long for them to deliver the new features, difficult to deliver new channels without breaking currently functionality or worse, they may deliver a middle of the road feature no one gets excited about. It can be as interesting as a lukewarm glass of water.

# Birth Of Headless
Headless CMS unbundle the content from the presentation. Allowing digital content to be managed as before but allowing the presentation to be untethered. This can be great for flexibility but now the burden publishing is on the producer. It can require more work to deliver the same results. Worse, content can become fragmented across different tools or embedded in silos across applications. It can be difficult to deliver a consistent brand story across all channels.


# Every Project Is Not A Nail
Every site and every channel is not created equal. Those debating headless versus a traditional CMS make it appear to be a binary decision. That you have to pick one or the other, that every problem can be best solved with the selected hammer. In reality that is simply not true. Adobe has continued to evolve Experience Manager to be a hybrid CMS. To be more of a tool-belt instead of just a hammer. You can deliver a spectrum of solutions using the tools that best suits the task at hand while taking advantage of the best in class asset and brand management. This allows the project to dictate the approach.


# A Spectrum Of Choices
There are a variety of ways AEM can be used as a traditional CMS with content and presentation and at the same time as a headless CMS. Adobe was already a strong digital asset manager regarding image and video assets but it now has the capability of treating copy or text as available assets as well. So in a headless approach content models, sling models and content fragments provide externalization of JSON content.

Content models represent page meta data in JSON form. This provides the caller not only the content but also layout information. This can be retrieved by adding “*.model.json” to any hosted page url. It gives the caller the most information but most of it may be unnecessary.

Sling models allow a developer to define in code the structure of content. The caller gets the data in JSON along with some meta data but requires development to define the structure of the data.

Content fragments allow an author to define a template describing the structure of the data as well as the entry specific instances of that data. This gives a more targeted JSON representation and doesn’t necessarily require code to enable.

All of these approaches give you flexibility in regards to how best to utilize the CMS while giving you the flexibility of treating content as data.

Here are 4 common approaches to incorporating AEM ranging from a traditional CMS to purely headless CMS or somewhere in between. They differ in author-ability, development time, flexibility, channel diversity and deployment complexity.

An approach with high author-ability would mean a content author should be able to be highly involved in delivering the solution. A low author-ability would mean more involvement by development.

As you move away from a traditional CMS, developers will have more responsibility for presentation and layout. This can add to the time needed in the development phase.

A pure headless CMS gives you more flexibility where a traditional approach can limit what can be accomplished.

A traditional CMS for the most part targets the web as a channel sometimes at the cost of other channels. A headless approach allows the same content to be utilized by a wider number of channels.

Deployment assumes that AEM is already installed so adding a new granite application leverages the existing platform. For other approaches more components need to be added to the overall architecture.


# AEM Traditional Granite
This is the traditional approach with the CMS being responsible for content and layout. It offers the most author friendly solution at the expense of flexibility. There are many applications that can still take advantage of this approach.

# AEM SPA with SPA Editor
With the addition of SPA Editor Adobe has allowed the WYSIWYG authoring of single page web apps. There some restrictions to what you can do in the SPA but this gives authors more control of the layout while allowing the benefits that a SPA can bring.

# AEM Hosted Web Application
This approach allows the development of the main application utilizing modern tools for SPA applications with hosting of the static html, css, and javascript on the AEM publishers. Assets of the SPA build for instance can be included as client libs and hosted like other traditional pages.

External Headless Application
This approach gives you the most flexibility as well as diversity in channels. This comes at a cost in development time and author-ability. AEM in this case is utilized as a pure headless CMS.

# Conclusion
Adobe Experience Manager is a best in class content management system that brings a lot of value in content management, integration to creative tools and a robust author experience. You don’t have to lose that value in order to pursue a headless approach. You can realize the power of consistent digital content management and a consistent brand story in a single CMS.
