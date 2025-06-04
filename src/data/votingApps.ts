import { VotingApp } from '@/types/voting';

export const votingApps: VotingApp[] = [
    {
        id: 'starpass',
        name: 'StarPass',
        icon: '/images/voting/starpass.png',
        musicShow: 'The Show',
        description: 'Vote for your favorite artists on SBS MTV The Show',
        link: 'https://star.whosfan.com/'
    },
    {
        id: 'mubeat',
        name: 'Mubeat',
        icon: '/images/voting/mubeat.png',
        musicShow: 'Show Champion',
        description: 'Vote for your favorite artists on Show Champion',
        link: 'https://mubeat.tv/'
    },
    {
        id: 'idolchamp',
        name: 'IdolChamp',
        icon: '/images/voting/idolchamp.png',
        musicShow: 'Show Champion & The Show',
        description: 'Multi-platform voting app for various music shows',
        link: 'https://www.idol-champ.com/'
    }
];