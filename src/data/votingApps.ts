import { VotingApp } from '@/types/voting';

export const votingApps: VotingApp[] = [
    {
        id: 'starplanet',
        name: 'Star Planet',
        icon: 'https://play-lh.googleusercontent.com/PuuE9Y9_YxT0FrgJ9KecTsX6WB_AzdlL2zubNBr23AzWT1cgVTH4vB7PA0O2ATC1nw',
        musicShow: 'The Show',
        description: 'Vote for your favorite artists on SBS MTV The Show',
        link: '/voting/starplanet',
        hasCurrency: true,
        scheduleInfo: 'Tracking: the period in which MV views are counted towards the final score.\nPre-vote: the period in which you can vote before the live broadcast.\nLive vote: the period in which you can vote during the live broadcast.',

    },
    {
        id: 'idolchamp',
        name: 'IdolChamp',
        icon: 'https://play-lh.googleusercontent.com/gyv_sTnyMfz1ixqetwdCPOVskZpgPozNKwAhebJm2Oxl0bi4IVLhe3WUn16RE0doU1HB',
        musicShow: 'Show Champion & The Show',
        description: 'Multi-platform voting app for various music shows',
        link: '/voting/idolchamp',
        hasCurrency: true,
        scheduleInfo: 'Tracking: the period in which MV views are counted towards the final score.\nPre-vote: the period in which you can vote before the live broadcast.\nLive vote: the period in which you can vote during the live broadcast.',
    },
    {
        id: 'mnet',
        name: 'MNET+',
        icon: 'https://play-lh.googleusercontent.com/-u7g-Lzc5Es734PfDlg-IE5O8oVFUsVZxcKZUI0-2Jokp4GqSYtK7lH-BOPN-92g8Mbb',
        musicShow: 'Show Champion',
        description: 'Vote for your favorite artists on Show Champion',
        link: '/voting/mnetplus',
        hasCurrency: false,
        scheduleInfo: 'Tracking: the period in which MV views are counted towards the final score.\nPre-vote: the period in which you can vote before the live broadcast.\nLive vote: the period in which you can vote during the live broadcast.',
    },
    {
        id: 'mubeat',
        name: 'Mubeat',
        icon: 'https://play-lh.googleusercontent.com/YHVs88UIQzMbRbRFABiDq3hQgPY6Br2GuXDj09AqCjoxx4mJxiyqwO2RF2prYoLLPAIF',
        musicShow: 'Show Champion',
        description: 'Vote for your favorite artists on Show Champion',
        link: '/voting/mubeat',
        hasCurrency: true,
        scheduleInfo: 'Tracking: the period in which MV views are counted towards the final score.\nPre-vote: the period in which you can vote before the live broadcast.\nLive vote: the period in which you can vote during the live broadcast.',

    },

];