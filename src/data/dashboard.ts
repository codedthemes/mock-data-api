export const dashboard = {
    id: 'dashboard',
    title: 'dashboard',
    icon: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'default',
            type: 'item',
            url: '/dashboard/default',
            icon: 'dashboard',
            breadcrumbs: false
        },
        {
            id: 'analytics',
            title: 'analytics',
            type: 'item',
            url: '/dashboard/analytics',
            icon: 'device',
            breadcrumbs: false
        }
    ]
};