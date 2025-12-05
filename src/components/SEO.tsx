import { Helmet } from 'react-helmet-async';
import { SEOProps } from '@/types/seo';
import { PHONE_NUMBER_MAIN } from '@/constants/contacts';
import { socialLinks } from '@/constants/footer';

const SEO = ({
    title = "Shelter Housing Ltd. | Premium Real Estate Development",
    description = "Crafting Luxury Living Since 2006. Shelter Housing Bangladesh has been a pioneer in premium real estate development within Dhaka for nearly three decades.",
    canonical = "https://www.shelterhousinglimited.com/",
    image = "/og-image.jpg",
    type = "website"
}: SEOProps) => {
    const siteUrl = "https://www.shelterhousinglimited.com";
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const fullUrl = canonical;

    const sameAsLinks = socialLinks
        .filter(link => link.href.startsWith('http'))
        .map(link => link.href);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Shelter Housing Ltd.",
        "url": siteUrl,
        "logo": `${siteUrl}/android-chrome-512x512.png`,
        "sameAs": sameAsLinks,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": PHONE_NUMBER_MAIN,
            "contactType": "customer service"
        },
        "description": description
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:site_name" content="Shelter Housing Ltd." />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
