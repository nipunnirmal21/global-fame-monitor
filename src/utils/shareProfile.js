export const getProfileUrl = (slug) => `${window.location.origin}/profile/${slug}`;

export const shareProfile = async ({ name, slug, onCopied, onError }) => {
    const url = getProfileUrl(slug);
    const shareData = {
        title: `${name} - Global Fame Monitor`,
        text: `Check out ${name} on Global Fame Monitor`,
        url
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return { method: 'share' };
        } catch (err) {
            if (err.name === 'AbortError') {
                return { method: 'cancelled' };
            }
        }
    }

    try {
        await navigator.clipboard.writeText(url);
        onCopied?.();
        return { method: 'clipboard' };
    } catch {
        onError?.();
        return { method: 'error' };
    }
};
