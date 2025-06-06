This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Voting Apps Configuration Guide

This guide explains how to configure voting apps, manage tutorials, and organize image assets in the project.

## Directory Structure

```
public/
  └── images/
      └── tutorials/
          ├── starplanet/
          │   ├── collecting/
          │   │   ├── currency1/
          │   │   └── currency2/
          │   └── voting/
          ├── idolchamp/
          │   ├── collecting/
          │   └── voting/
          └── other-apps/
```

## Adding a New Voting App

1. Add the app configuration in `src/data/votingApps.ts`:

    ```typescript
    export const votingApps: VotingApp[] = [
        {
            id: 'app-id',
            name: 'App Name',
            icon: 'https://path-to-app-icon.png',
            musicShow: 'Show Name',
            description: 'App description',
            link: '/voting/app-id',
            hasCurrency: true,
            scheduleInfo: 'Information about voting schedule periods'
        }
    ];
    ```

2. Create a new page at `src/app/voting/[app-id]/page.tsx`:

    ```typescript
    export default function AppPage() {
        const app = votingApps.find(a => a.id === 'app-id');
        
        const schedule = [
            {
                day: 'Tuesday',
                time: '6:00 PM',
                channel: 'Channel Name',
                timezone: 'KST'
            }
        ];

        const currencies = app.hasCurrency ? [
            {
                name: 'Currency Name',
                description: 'Currency description',
                howToCollect: [
                    {
                        name: 'Collection Method',
                        steps: [
                            {
                                image: "/images/tutorials/app-id/collecting/method-1.png",
                                description: "Step description"
                            }
                        ]
                    }
                ]
            }
        ] : undefined;

        const votingMethods = [
            {
                name: "Voting Method Name",
                steps: [
                    {
                        image: "/images/tutorials/app-id/voting/step-1.png",
                        description: "Step description"
                    }
                ]
            }
        ];

        const events = [
            {
                type: 'tracking',
                startDay: 0,  // Monday
                endDay: 6,   // Sunday
                startTime: "00:00",
                endTime: "23:59"
            }
        ];

        return (
            <VotingAppTemplate
                app={app}
                schedule={schedule}
                currencies={currencies}
                votingMethods={votingMethods}
                events={events}
            />
        );
    }
    ```

## Managing Tutorial Images

1. Create directories for your app's tutorial images:
    ```bash
    mkdir -p public/images/tutorials/[app-id]/collecting
    mkdir -p public/images/tutorials/[app-id]/voting
    ```

2. Add tutorial images following the naming convention:
    - Collecting tutorials: `/images/tutorials/[app-id]/collecting/[method]-[step].png`
    - Voting tutorials: `/images/tutorials/[app-id]/voting/[method]-[step].png`

3. Reference images in your code using paths relative to the `public` directory:
    ```typescript
    {
        image: "/images/tutorials/app-id/collecting/daily-1.png",
        description: "Step description"
    }
    ```

## Calendar Events Configuration

Configure voting periods using the `events` array:
```typescript
const events = [
    {
        type: 'tracking',  // 'tracking', 'prevote', or 'live'
        startDay: 0,       // 0-6 for Monday-Sunday
        endDay: 6,
        startTime: "00:00",
        endTime: "23:59"
    }
];
```

## Show Schedule Configuration

Configure show broadcast times using the `schedule` array:
```typescript
const schedule = [
    {
        day: 'Tuesday',
        time: '6:00 PM',
        channel: 'Channel Name',
        timezone: 'KST'
    }
];
```

## Type Definitions

All type definitions can be found in `src/types/voting.ts`. Refer to this file for the complete interface definitions when adding new properties or modifying existing ones.

## Best Practices

1. Use descriptive file names for tutorial images
2. Maintain consistent image dimensions
3. Optimize images before adding them to the project
4. Keep tutorial steps concise and clear
5. Use proper typing for all data structures
6. Follow the established directory structure
7. Use KST (Korean Standard Time) for all schedules

## Notes

- All times should be in 24-hour format
- Days are numbered 0-6 (Monday-Sunday)
- Images should be in PNG or JPG format
- All paths in code should start with `/images/`
- All image files should be placed in the `public` directory
