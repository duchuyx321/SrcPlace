import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

function Seo({
    title = "SrcPlace - Thư Viện Đồ Án",
    description = "Đây là trang chủ của SrcPlace",
    noIndex = true,
} = {}) {
    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            <meta
                name="robots"
                content={noIndex ? "noindex, nofollow" : "index, follow"}
            />
            <meta property="og:title" content={title} />
            {description && (
                <meta property="og:description" content={description} />
            )}
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
}
Seo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    noIndex: PropTypes.bool,
};
export default Seo;
