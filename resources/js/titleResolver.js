// Shared by app.js (client) and ssr.js (server) so the <title> tag is built
// identically on both, instead of each entry point keeping its own copy.
// Pages pass just their own fragment (optionally ending in " -", which is
// stripped) via <Head title="..." /> - this appends the site name once.
export default function resolveTitle(title) {
    const cleanTitle = title ? title.replace(/\s*-\s*$/, '').trim() : '';

    if (!cleanTitle) {
        return 'Srpska Tenis Liga - Open Tennis Srbija';
    }

    return `${cleanTitle} - Open Tennis Srbija`;
}
