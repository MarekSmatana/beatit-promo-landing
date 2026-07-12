export const legalUpdatedDate = "July 13, 2026";
export const supportEmail = "support@buildit.studio";

export const privacyPolicy = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  subtitle:
    "This Privacy Policy explains how Buildit Studio collects, uses, shares, and protects information when you use Beat It.",
  intro: [
    `Effective date: ${legalUpdatedDate}`,
    `Buildit Studio ("Buildit Studio", "we", "us", or "our") provides Beat It, a workout planning, training, progress tracking, and workout analysis app. Questions or requests can be sent to ${supportEmail}.`,
  ],
  sections: [
    {
      title: "Information We Collect",
      body: [
        "We collect information you provide, information created when you use Beat It, and limited technical information needed to operate the app.",
      ],
      bullets: [
        "Account and profile information, such as email address, display name, username, sign-in provider identifiers, unit system, week start day, theme preference, training goal, experience level, preferred training days, and height if you add it.",
        "Workout and training information, including exercises, workouts, programs, plans, calendar activity, workout sessions, sets, reps, weight, rest, duration, notes, streaks, muscle recovery states, and workout analysis results.",
        "Progress information, including body weight, body measurements, progress entries, progress photos, and workout photos when you choose to add them.",
        "AI feature inputs and outputs, such as workout-generation preferences, available equipment, target muscles, training preferences, selected exercise context, completed workout data, matching exercise history, and notes submitted for workout analysis. Workout analysis does not send photos.",
        "Purchase and subscription information from the App Store, Google Play, and RevenueCat, such as entitlement status, product identifiers, transaction status, renewal status, app user ID, and subscription management URL. We do not receive your full payment card number.",
        "Support and contact information, such as your name, email address, message, support topic, and platform when you contact us or submit feedback.",
        "Permission and device-related information needed for app features, such as notification permission status, photo-library permission status, platform, app version, and local reminder configuration.",
        "Product analytics collected through PostHog, such as app lifecycle events, screen views, touch interaction metadata, feature usage events, account or app user identifiers, selected profile properties such as username, display name, and unit system, purchase conversion events, workout and progress event metadata, and technical event properties such as latency or failure reason. We do not use PostHog for third-party advertising or cross-app tracking.",
        "Crash, diagnostic, and technical telemetry collected through Sentry, such as crash reports, error messages, stack traces, breadcrumbs, performance traces, session and release health data, app version, release environment, device and operating-system details, timestamps, coarse diagnostic tags, and the Beat It account or demo user ID associated with an event when available.",
      ],
    },
    {
      title: "How We Use Information",
      bullets: [
        "Provide, sync, personalize, and improve Beat It features.",
        "Create and save workout plans, workout history, progress entries, photos, streaks, programs, and custom catalog content.",
        "Operate AI workout generation and AI workout analysis when you choose to use those features.",
        "Manage subscriptions, premium entitlements, restores, and subscription support.",
        "Measure product usage, feature adoption, funnels, retention, and conversion so we can improve Beat It.",
        "Monitor app stability, diagnose crashes and errors, improve performance, and prioritize reliability fixes.",
        "Respond to support requests, troubleshoot issues, prevent abuse, and protect the security of the app.",
        "Comply with legal obligations and enforce our Terms of Use.",
      ],
    },
    {
      title: "Local and Offline Data",
      body: [
        "Beat It is designed to preserve local/offline workout behavior. Some workout history, progress entries, reminders, settings, photos, and catalog data may be stored locally on your device. If you use Beat It without signing in, some data may remain only on that device unless you export it or later enable sync.",
      ],
    },
    {
      title: "Photos and Media",
      body: [
        "Photo-library access is used only when you choose to add or save photos or media. Progress photos, workout photos, and custom media may be stored locally and, if you are signed in and sync is available, uploaded to our Supabase storage so they can be available with your account.",
      ],
    },
    {
      title: "AI Features",
      body: [
        "Beat It may use Supabase Edge Functions and OpenAI to generate workouts or analyze completed workouts. We send only the information needed for the requested AI feature. AI outputs can be inaccurate and should not be treated as medical, rehabilitation, injury-treatment, or diagnostic advice.",
      ],
    },
    {
      title: "Product Analytics",
      body: [
        "Beat It uses PostHog to understand how people use the app, such as which screens and features are used, whether onboarding, workouts, AI generation, program enrollment, progress check-ins, review prompts, and subscription flows are completed, and where errors or drop-offs occur. Analytics events are linked to an app or account identifier when available so we can measure retention and improve the product. We do not send free-form workout notes, feedback message text, or payment card numbers to PostHog, and we do not use PostHog for third-party advertising or cross-app tracking.",
      ],
    },
    {
      title: "Crash and Diagnostics",
      body: [
        "Beat It uses Sentry to receive crash reports, handled error reports, performance traces, release health information, and related diagnostic data. We configure Sentry not to send default personally identifiable information. We currently attach only a Beat It account or demo user ID when available and an authentication-mode tag, and we do not enable Sentry error screenshots or view hierarchy capture.",
      ],
    },
    {
      title: "How We Share Information",
      body: [
        "We do not sell personal information and we do not use Beat It data for third-party advertising or cross-app tracking. We share information only as needed to provide the app, process purchases, respond to you, or comply with law.",
      ],
      bullets: [
        "Supabase, for authentication, database storage, file storage, account maintenance, feedback submissions, and server-side functions.",
        "RevenueCat, Apple, and Google, for subscriptions, purchase verification, entitlement management, restores, billing support, and subscription management.",
        "OpenAI, when you choose to use AI workout generation or AI workout analysis.",
        "PostHog, for product analytics, feature usage measurement, funnels, retention analysis, and product improvement.",
        "Sentry, for crash reporting, handled error reporting, performance monitoring, release health, diagnostic logs where enabled, and reliability troubleshooting.",
        "Email and support tools, when needed to receive and respond to your messages.",
        "Legal, safety, and compliance recipients, when required by law or necessary to protect rights, users, or the service.",
      ],
    },
    {
      title: "Retention and Deletion",
      body: [
        "We keep account data for as long as needed to provide Beat It, maintain your account, comply with legal obligations, resolve disputes, and enforce agreements. You can delete individual items in the app where deletion is available. Signed-in users can clear account data or delete their account from Settings > Account. You can also request deletion by contacting us.",
        "When an account is deleted, we delete or de-identify account data associated with that account unless we must retain limited information for legal, fraud-prevention, security, tax, accounting, or dispute-resolution reasons. Backup copies and logs may take additional time to expire.",
      ],
    },
    {
      title: "Security",
      body: [
        "We use reasonable technical and organizational safeguards designed to protect personal information, including authenticated access to account data, secure transport where supported, and service-provider security controls. No method of transmission or storage is completely secure.",
      ],
    },
    {
      title: "Your Choices and Rights",
      bullets: [
        "Update profile, settings, reminders, workouts, progress entries, and photos inside the app.",
        "Disable app permissions such as notifications or photo-library access in your device settings.",
        "Cancel or manage subscriptions through the App Store or Google Play account used for purchase.",
        "Request access, correction, export, deletion, or objection/restriction where applicable by contacting us.",
      ],
    },
    {
      title: "Children",
      body: [
        "Beat It is not intended for children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child provided personal information, contact us so we can take appropriate action.",
      ],
    },
    {
      title: "International Processing",
      body: [
        "Your information may be processed in countries other than where you live. Where required, we rely on appropriate safeguards for international transfers through our service providers.",
      ],
    },
    {
      title: "Changes to This Policy",
      body: [
        "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new effective date. Material changes may also be communicated in the app or by other reasonable means.",
      ],
    },
    {
      title: "Contact",
      body: [`Email ${supportEmail} for privacy requests, account deletion requests, or questions about this policy.`],
    },
  ],
};

export const termsOfUse = {
  eyebrow: "Legal",
  title: "Terms of Use",
  subtitle:
    "These Terms govern your access to and use of Beat It, including workout planning, training, progress tracking, subscriptions, and AI features.",
  intro: [
    `Effective date: ${legalUpdatedDate}`,
    `These Terms of Use ("Terms") are between you and Buildit Studio ("Buildit Studio", "we", "us", or "our"). By using Beat It, you agree to these Terms. If you do not agree, do not use the app.`,
  ],
  sections: [
    {
      title: "Fitness and Safety",
      body: [
        "Beat It provides workout planning and tracking tools for general fitness and informational purposes only. Beat It is not medical advice, physical therapy, rehabilitation, diagnosis, or treatment. Exercise involves risk. You are responsible for choosing activities, intensity, equipment, and technique appropriate for your condition and environment.",
        "Stop exercising and seek professional help if you feel pain, dizziness, shortness of breath, or other concerning symptoms. Consult a qualified medical professional before starting or changing an exercise program, especially if you have an injury, medical condition, or other health concern.",
      ],
    },
    {
      title: "Accounts",
      body: [
        "You may need an account to sync data, use paid features, submit feedback, or access certain AI features. You are responsible for keeping your credentials secure and for activity under your account. Provide accurate information and keep it up to date.",
      ],
    },
    {
      title: "Subscriptions and Purchases",
      body: [
        "Beat It may offer paid subscriptions or premium features, including Beat It Pro. Purchases are processed by the App Store or Google Play and may be managed through your store account. Subscriptions may automatically renew unless canceled according to the store's rules. Refunds, billing issues, and cancellation timing are handled by the applicable store unless required otherwise by law.",
        "Premium entitlement status may be verified through RevenueCat. We may change free or paid features, prices, trials, and subscription plans prospectively where allowed by law.",
      ],
    },
    {
      title: "License",
      body: [
        "Subject to these Terms, Buildit Studio grants you a limited, personal, non-exclusive, non-transferable, revocable license to use Beat It for your own personal fitness planning and tracking. You may not copy, modify, reverse engineer, resell, sublicense, or misuse the app except where the law gives you a right that cannot be waived.",
        "For apps downloaded through the Apple App Store, Apple's Standard Licensed Application End User License Agreement applies to the app license in addition to these Terms. If there is a conflict about the app license, Apple's Standard EULA controls to the extent required by Apple.",
      ],
    },
    {
      title: "Your Content and Data",
      body: [
        "You keep ownership of workouts, notes, progress entries, photos, and other content you add to Beat It. You grant Buildit Studio a limited license to host, process, transmit, display, back up, and otherwise use that content as needed to provide, secure, support, and improve Beat It.",
        "Do not upload content that you do not have the right to use, content that violates law, or content that infringes another person's rights.",
      ],
    },
    {
      title: "AI Features",
      body: [
        "AI workout generation and AI workout analysis may produce incomplete, inaccurate, unsafe, or unsuitable output. Review all AI output before using it. AI features must not be used for medical, rehabilitation, injury-treatment, diagnosis, or emergency purposes.",
      ],
    },
    {
      title: "Acceptable Use",
      bullets: [
        "Do not use Beat It unlawfully, fraudulently, abusively, or to harm others.",
        "Do not interfere with, overload, scan, or reverse engineer the app, backend, or related systems.",
        "Do not attempt to access another user's account or data.",
        "Do not bypass subscription, entitlement, quota, or security controls.",
        "Do not upload malware, illegal content, or content that violates privacy, publicity, intellectual property, or other rights.",
      ],
    },
    {
      title: "Third-Party Services",
      body: [
        "Beat It relies on third-party services such as app stores, RevenueCat, Supabase, OpenAI, PostHog, Sentry, and device operating-system services. PostHog may process product analytics events and related identifiers to help us understand feature usage, funnels, retention, and conversion. Sentry may process crash reports, handled error reports, performance traces, release health information, and related diagnostics to help us operate and improve the app. Those services may have their own terms and policies. Buildit Studio is not responsible for third-party services outside our control.",
      ],
    },
    {
      title: "Availability and Changes",
      body: [
        "We may modify, suspend, or discontinue parts of Beat It at any time. We may also update these Terms. Continued use after changes become effective means you accept the updated Terms.",
      ],
    },
    {
      title: "Termination",
      body: [
        "You may stop using Beat It at any time and may delete your account where account deletion is available. We may suspend or terminate access if you violate these Terms, create risk for the service or other users, or if required by law.",
      ],
    },
    {
      title: "Disclaimers",
      body: [
        "Beat It is provided on an \"as is\" and \"as available\" basis. To the maximum extent permitted by law, Buildit Studio disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, availability, and uninterrupted operation.",
      ],
    },
    {
      title: "Limitation of Liability",
      body: [
        "To the maximum extent permitted by law, Buildit Studio will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, business interruption, personal injury, or property damage arising from your use of Beat It. Where liability cannot be excluded, it is limited to the greater of the amount you paid for Beat It in the 12 months before the claim or USD $50.",
      ],
    },
    {
      title: "Consumer Rights",
      body: [
        "Nothing in these Terms limits rights that cannot be waived under applicable consumer protection laws. Some limitations may not apply to you depending on where you live.",
      ],
    },
    {
      title: "Contact",
      body: [`Email ${supportEmail} for support, subscription questions, legal notices, or questions about these Terms.`],
    },
  ],
};
