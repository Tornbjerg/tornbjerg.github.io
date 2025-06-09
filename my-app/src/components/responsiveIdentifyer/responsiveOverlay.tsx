import './responsiveOverlay.scss';

const ResponsiveOverlay = () => {
    return (
        <div className="responsive-container">
            <h1>The page is yet to be optimised for a mobile experience.</h1>
            <h1>Please check back later or use a desktop computer to view this website.</h1>
            <h1>Thank you for your understanding<span className="dot">.</span></h1>
        </div>
    );
};

export default ResponsiveOverlay;