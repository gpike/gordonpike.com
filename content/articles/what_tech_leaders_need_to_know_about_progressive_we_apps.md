---
title: What Tech Leaders Need To Know About Progressive Web Apps
date: 2019-07-02
published: true
tags: ['AEM', 'Adobe Experience Manager']
series: false
cover_image: /images/articles/race.jpeg
cover_caption: 'Hello'
canonical_url: false
author: Gordon Pike
author_image: /images/authors/GordonPike.jpg
description: "It was cold and wet. Wind gusts drove biting rain into the cheeks of determined spectators. These were not the conditions in which to do the impossible. Some doctors and scientist believed it was beyond a humans physical ability. Experts speculated it could only be achieved under perfect conditions. “Runners, take your mark”, by the time he put his feet in the blocks the wind was blowing at 15 mph. “Get set”, he had spent the morning working at the hospital where he was a med student. In fact his schedule didn’t allow him to prepare like an elite athlete, he only devoted thirty minutes a day to running. When the starter's gun rang out, he was determined to do the unthinkable, he had a vision of the possible. On May 6, 1954 at Iffley Road Track in Oxford England, Roger Bannister became the first person to run a mile in under 4 minutes, He redefined the boundaries of the possible and paved the way for over 1600 sub 4 minute miles since."
---

It was cold and wet. Wind gusts drove biting rain into the cheeks of determined spectators. These were not the conditions in which to do the impossible. Some doctors and scientist believed it was beyond a humans physical ability. Experts speculated it could only be achieved under perfect conditions. “Runners, take your mark”, by the time he put his feet in the blocks the wind was blowing at 15 mph. “Get set”, he had spent the morning working at the hospital where he was a med student. In fact his schedule didn’t allow him to prepare like an elite athlete, he only devoted thirty minutes a day to running. When the starter's gun rang out, he was determined to do the unthinkable, he had a vision of the possible. On May 6, 1954 at Iffley Road Track in Oxford England, Roger Bannister became the first person to run a mile in under 4 minutes, He redefined the boundaries of the possible and paved the way for over 1600 sub 4 minute miles since.

He redefined the boundaries of the possible
Today’s conditions are no better. True there is a rise in mobile devices but 65% of mobile users download 0 apps, 80% of apps that are downloaded, are uninstalled within a week and 25% are deleted after only one use. Given the investment, does it make sense to build something only 1 out of 10 people are going to use after one week?

Despite the conditions determined companies are seeing an increase of revenue via mobile devices; Best Western River North 300%, Mobify 20%, Lancome 16%, and West Elm 9%. Others are seeing increases in recovered shopping carts; Lancome 8% and Jumia 9 times more conversions on abandoned carts. Customer engagements are up too; Pinterest 60% increase, Forbes 2 times increase in session length, Lancome 53%, MakeMyTrip 160%, Twitter 25% and Trivago 150% more repeat visits. All this while being able to decrease development and maintenance costs by as much as 33%. Is this unthinkable or is it the new possible?

Progressive Web Apps (PWA) are pushing the boundaries of what’s possible. It is the secret weapon many companies are using to increase revenue, increase engagement and reduce costs.

Before PWAs There Were Hybrid Mobile Apps
Hybrid Mobile App Lineup
Even Mr. Magoo could pick a hybrid out of a lineup.
Hybrid mobile apps tried to bridge the gap between mobile devices and web developers. With frameworks like Phonegap and Cordova web developers could package web applications in a native skeleton and submit them to the App stores. This worked for simple applications but the apps didn’t look, feel and perform like their native counterparts. it was easy for most users to tell the difference, even Mr. Magoo could pick a hybrid out of a lineup. This fed a stigma that anything other than a native app was a was complete waste of time.

There was still a gap between capability and usability. Worse you had the challenges of publishing to an app store, getting approval or re-submitting for approval if denied, rolling out new versions, getting approval for those and waiting for users to update their applications. You had to support multiple versions because you had no control over when a user upgraded.

Enter Progressive Web Apps
Dynamic web pages have been around since 2010 but it wasn’t until 2 new web technologies emerged in 2015, service workers and web app manifests that the modern PWA really took shape. Google began to put significant effort into promoting PWAs for the android platform and other vendors have fallen suit. Google built tooling around verifying and validating that applications adhere to a standard. This allows a web developer to build an application that functions like a native application but at its heart is a web application. It can have the look and feel of a native app, can be downloaded directly from a web site and saved to a user's home screen and users get the latest version when it’s deployed. No messing with the app store. This is the best of both worlds, the ease of developing web apps and the reach of a mobile app.

PWAs are peeling back the stigma for non native mobile apps. The results are turning heads. Most users can’t discern between a PWA and a native application, In fact if you’ve ordered a latte at Starbucks using your phone, you’ve used a PWA.

A Set Of Best Practices
A PWA is a single page web application (SPA) built using html, css and Javascript. A SPA is a PWA if it adheres to a set of best practices. The criteria insures it is fast, reliable and engaging when run on a broad number of mobile devices. These are goals an app should have anyway. There are 2 levels of compliance, Basic PWA and Exemplary PWA.

The criteria insures it is fast, reliable and engaging when run on a broad number of mobile devices.
No alt text provided for this image


At the core a PWA takes advantage of service workers and a Web App Manifest. Service workers provide local resource caching and push notifications. A local cache helps the app to continue to work, even with intermittent connectivity and helps the app to be fast. Most people will abandon a site after a 3 second page load. PWAs are obsessed with first screen paint and first meaningful screen paint. Painting a page skeleton first and then filling in with higher fidelity images. This gives the user the perception of speed. When offline the app still needs to be available, it can pull from cache or store data until the connectivity is back online. A Web App Manifest linked in the index.html informs browsers of resources the app needs, app name, icon and splash screen. Using this, a mobile browser can help the OS treat the app like a native app. It can be full screen (no browser header), have a splash screen on loading and an icon that can be displayed on the home screen. The criteria for a baseline PWA are shown in the above diagram.

No alt text provided for this image


A PWA can be considered exemplary if it satisfies the baseline criteria and exemplifies the criteria above. The app exhibits the additional traits in indexability, user experience, performance and push notifications. Optionally it can include support additional functionality like implementing credential management and payment apis. A PWA doesn’t have to meet all of the criteria but authors should strive for complete compliance.

A Unified Team
Progressive Web Apps help development organizations in another way. Before implementing PWAs an organization needed a web app team, an android mobile team and an IOS mobile team each with different and specialized skills and separate code bases. Moving a team member across teams is a challenge because they need to be proficient in a completely different set of skills. Code reuse is hampered because of the difference in languages and platforms. All of this adds to silos of knowledge and capabilities, It can also lead to inconsistency across applications. Since a PWA uses the same underlying technology as web apps, the teams have a shared skill set with minor specialization. It makes it possible to have a shared code base. That could be one app across all platforms or at the very least a core of shared code and functionality. This helps reduce the development cost, maintenance and helps the team to be efficient.

PWAs are helping organizations realize their vision in imperfect conditions, redefining the possible and paving the way for continued success.
