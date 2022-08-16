import GoogleAnalyticsLogo from '../assets/google-analytics-logo.png';
import InstagramLogo from '../assets/Instagram_logo.png';
import DefaultImage from '../assets/DefaultImage.png';
import FacebookLogo from '../assets/FacebookLogo.png'
import GoogleAdsLogo from '../assets/GoogleAdsLogo.png';
import GoogleSheetsLogo from '../assets/GoogleSheetsLogo.png';
import LinkedinLogo from '../assets/LinkedIn_logo.png';
import TwitterLogo from '../assets/Twitter-logo.png';
import TikTokLogo from '../assets/TikTokLogo.png';
import ShopifyLogo from '../assets/ShopifyLogo.png';
import PinterestLogo from '../assets/Pinterest-logo.png';
import YoutubeLogo from '../assets/Youtube-logo.png';
import S3Logo from '../assets/S3-logo.png'
import KlaviyoLogo from '../assets/KlaviyoLogo.svg'
import OutbrainLogo from '../assets/OutbrainLogo.png'
import AmplitudeLogo from '../assets/AmplitudeLogo.png'

const ConnectorIcons = {
    google_analytics: GoogleAnalyticsLogo,
    instagram_business: InstagramLogo,
    google_ads: GoogleAdsLogo,
    linkedin: LinkedinLogo,
    google_sheets: GoogleSheetsLogo,
    twitter_organic: TwitterLogo,
    tiktok_organic: TikTokLogo,
    facebook_ads: FacebookLogo,
    shopify: ShopifyLogo,
    youtube: YoutubeLogo,
    klaviyo: KlaviyoLogo,
    s3: S3Logo,
    pinterest: PinterestLogo,
    outbrain_amplify: OutbrainLogo,
    amplitude: AmplitudeLogo
}

export function getConnectorIcon (connectorType) {
    return ConnectorIcons[connectorType] || DefaultImage;
}