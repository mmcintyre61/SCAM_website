import React from 'react';
import logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const BadgeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8200DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const FreeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const CheckIconLight = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const PremiumIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const CheckIconGradient = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const FamilyIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const PricingCard: React.FC<{
    title: string;
    subtitle: string;
    price: string;
    per: string;
    cta: string;
    icon: React.ReactNode;
    features: string[];
    badge?: string;
    gradient?: string;
    accentGradient: string;
    buttonVariant: 'gradient' | 'light';
}> = ({ title, subtitle, price, per, cta, icon, features, badge, gradient, accentGradient, buttonVariant }) => {
    const bulletBg = accentGradient;
    return (
        <div
            style={{
                position: 'relative',
                background: '#FFF',
                border: '1px solid #F3F4F6',
                borderRadius: '24px',
                boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.10), 0px 8px 10px -6px rgba(0,0,0,0.10)',
                padding: '1px',
                overflow: 'hidden'
            }}
        >
            {badge && (
                <div
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 50%, #E60076 100%)',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: '#FFF',
                            lineHeight: '16px'
                        }}
                    >
                        {badge}
                    </span>
                </div>
            )}

            <div style={{ padding: '24px 32px 32px 32px', position: 'relative' }}>
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                        backgroundImage: gradient || 'linear-gradient(135deg, #6A7282 0%, #4A5565 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '8px auto 24px auto'
                    }}
                >
                    {icon}
                </div>

                <h3
                    style={{
                        fontFamily: 'Arimo, sans-serif',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        lineHeight: '32px',
                        color: '#101828',
                        textAlign: 'center',
                        margin: 0
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontFamily: 'Arimo, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        color: '#4A5565',
                        textAlign: 'center',
                        margin: '8px 0 16px 0'
                    }}
                >
                    {subtitle}
                </p>

                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <span
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            lineHeight: '48px',
                            color: '#101828'
                        }}
                    >
                        {price}
                    </span>
                    <div
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '20px',
                            color: '#6A7282',
                            marginTop: '4px'
                        }}
                    >
                        {per}
                    </div>
                </div>

                <button
                    style={{
                        width: '100%',
                        height: '48px',
                        borderRadius: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Arimo, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: '24px',
                        color: buttonVariant === 'gradient' ? '#FFF' : '#101828',
                        backgroundImage:
                            buttonVariant === 'gradient'
                                ? 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 50%, #E60076 100%)'
                                : '#F3F4F6',
                        backgroundColor: buttonVariant === 'gradient' ? undefined : '#F3F4F6',
                        boxShadow:
                            buttonVariant === 'gradient'
                                ? '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)'
                                : undefined,
                        marginBottom: '24px',
                        transition: 'transform 200ms ease, box-shadow 200ms ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow =
                            buttonVariant === 'gradient'
                                ? '0px 15px 20px -3px rgba(0,0,0,0.2), 0px 6px 8px -4px rgba(0,0,0,0.15)'
                                : '0px 6px 10px -4px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow =
                            buttonVariant === 'gradient'
                                ? '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)'
                                : 'none';
                    }}
                >
                    {cta}
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '999px',
                                    backgroundImage: bulletBg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {buttonVariant === 'gradient' ? <CheckIconGradient /> : <CheckIconLight />}
                            </div>
                            <span
                                style={{
                                    fontFamily: 'Arimo, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    color: '#364153'
                                }}
                            >
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FaqItem: React.FC<{ title: string; body: string }> = ({ title, body }) => (
    <div
        style={{
            background: '#FFF',
            border: '1px solid #F3F4F6',
            borderRadius: '16px',
            boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}
    >
        <p
            style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: '27px',
                color: '#101828',
                margin: 0
            }}
        >
            {title}
        </p>
        <p
            style={{
                fontFamily: 'Arimo, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22.75px',
                color: '#4A5565',
                margin: 0
            }}
        >
            {body}
        </p>
    </div>
);

const ConnectionPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                background: 'linear-gradient(118.38deg, #EFF6FF 0%, #FAF5FF 50%, #FDF2F8 100%)'
            }}
        >
            <header className="landing-header">
                <div className="login-brand">
                    <div className="login-brand-badge">
                        <img src={logo} alt="Bookify" className="login-brand-logo" />
                    </div>

                    <span
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            lineHeight: '28px',
                            backgroundImage: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Bookify
                    </span>
                </div>

                <nav className="landing-nav">
                    <button
                        style={{ whiteSpace: 'nowrap' }}
                        className="landing-nav-button"
                        onClick={() => navigate('/')}
                    >
                        Home
                    </button>
                    <button
                        className="landing-nav-button"
                        onClick={() => navigate('/about')}
                    >
                        About
                    </button>
                    <button className="landing-nav-button" onClick={() => navigate('/feedback')}>Feedback</button>
                    <button
                        className="landing-nav-primary"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </nav>
            </header>

            {/* Main content */}
            <div style={{ maxWidth: '1184px', margin: '0 auto', padding: '65px 24px 80px 24px' }}>
                {/* Hero */}
                <div style={{ position: 'relative', height: '463px', marginTop: '16px' }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            border: '1px solid #E9D4FF',
                            borderRadius: '9999px',
                            height: '38px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <BadgeIcon />
                        <span
                            style={{
                                fontFamily: 'Arimo, sans-serif',
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: '20px',
                                color: '#8200DB'
                            }}
                        >
                            Simple, Transparent Pricing
                        </span>
                    </div>

                    <h1
                        style={{
                            position: 'absolute',
                            top: '126px',
                            left: '16px',
                            right: '16px',
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '60px',
                            fontWeight: 'bold',
                            lineHeight: '60px',
                            color: '#101828',
                            textAlign: 'center',
                            margin: 0
                        }}
                    >
                        Choose Your
                    </h1>
                    <h1
                        style={{
                            position: 'absolute',
                            top: '186px',
                            left: '16px',
                            right: '16px',
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '60px',
                            fontWeight: 'bold',
                            lineHeight: '60px',
                            textAlign: 'center',
                            margin: 0,
                            backgroundImage: 'linear-gradient(90deg, #155DFC 0%, #9810FA 50%, #E60076 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Perfect Plan
                    </h1>

                    <p
                        style={{
                            position: 'absolute',
                            top: '270px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '24px',
                            color: '#4A5565',
                            textAlign: 'center',
                            margin: 0,
                            maxWidth: '620px'
                        }}
                    >
                        Start free and upgrade anytime. All plans include our core playlist generation features.
                    </p>

                    {/* Toggle */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '328px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'Arimo, sans-serif',
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                color: '#364153'
                            }}
                        >
                            Monthly
                        </span>
                        <div
                            style={{
                                position: 'relative',
                                width: '56px',
                                height: '32px',
                                borderRadius: '999px',
                                backgroundImage: 'linear-gradient(90deg, #2B7FFF 0%, #9810FA 100%)',
                                padding: '4px 28px 4px 4px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '999px',
                                    background: '#FFF',
                                    boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)'
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '999px',
                                    pointerEvents: 'none',
                                    boxShadow: 'inset 0px 2px 4px 0px rgba(0,0,0,0.05)'
                                }}
                            />
                        </div>
                        <span
                            style={{
                                fontFamily: 'Arimo, sans-serif',
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px',
                                color: '#6A7282'
                            }}
                        >
                            Annual
                        </span>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#DCFCE7',
                                color: '#008236',
                                padding: '4px 12px',
                                borderRadius: '999px',
                                fontFamily: 'Arimo, sans-serif',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                lineHeight: '16px'
                            }}
                        >
                            Save 20%
                        </div>
                    </div>
                </div>

                {/* Pricing cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: '24px',
                        marginTop: '40px'
                    }}
                >
                    <PricingCard
                        title="Free"
                        subtitle="Perfect for casual readers"
                        price="$0"
                        per="forever"
                        cta="Get Started"
                        icon={<FreeIcon />}
                        features={[
                            '5 playlists per month',
                            'Basic genre matching',
                            'Standard playlist length',
                            'Community ratings',
                            'Mobile app access'
                        ]}
                        accentGradient="linear-gradient(135deg, #6A7282 0%, #4A5565 100%)"
                        buttonVariant="light"
                    />

                    <PricingCard
                        title="Premium"
                        subtitle="For the avid reader"
                        price="$9.99"
                        per="per month"
                        cta="Start Free Trial"
                        icon={<PremiumIcon />}
                        features={[
                            'Unlimited playlists',
                            'Advanced AI matching',
                            'Extended playlists',
                            'Offline downloads',
                            'Priority support',
                            'Custom playlist editing',
                            'Early access to new books'
                        ]}
                        badge="MOST POPULAR"
                        gradient="linear-gradient(135deg, #2B7FFF 0%, #9810FA 50%, #E60076 100%)"
                        accentGradient="linear-gradient(135deg, #2B7FFF 0%, #9810FA 50%, #E60076 100%)"
                        buttonVariant="gradient"
                    />

                    <PricingCard
                        title="Family"
                        subtitle="Share with your loved ones"
                        price="$14.99"
                        per="per month"
                        cta="Start Free Trial"
                        icon={<FamilyIcon />}
                        features={[
                            'Everything in Premium',
                            'Up to 6 family members',
                            'Individual profiles',
                            'Parental controls',
                            'Family playlist sharing',
                            'Kids book section'
                        ]}
                        gradient="linear-gradient(135deg, #AD46FF 0%, #E60076 100%)"
                        accentGradient="linear-gradient(135deg, #AD46FF 0%, #E60076 100%)"
                        buttonVariant="light"
                    />
                </div>

                {/* Trusted logos */}
                <div style={{ marginTop: '48px', textAlign: 'center' }}>
                    <p
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '24px',
                            color: '#4A5565',
                            margin: '0 0 12px 0'
                        }}
                    >
                        Trusted by over 25,000 readers worldwide
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '32px',
                            opacity: 0.4,
                            color: '#99A1AF',
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            lineHeight: '32px'
                        }}
                    >
                        <span>Spotify</span>
                        <span>Apple Music</span>
                        <span>YouTube Music</span>
                        <span>Amazon Music</span>
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ marginTop: '72px', marginBottom: '48px' }}>
                    <h2
                        style={{
                            fontFamily: 'Arimo, sans-serif',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            lineHeight: '36px',
                            color: '#101828',
                            textAlign: 'center',
                            margin: '0 0 32px 0'
                        }}
                    >
                        Frequently Asked Questions
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '768px', margin: '0 auto' }}>
                        <FaqItem
                            title="Can I switch plans anytime?"
                            body="Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle."
                        />
                        <FaqItem
                            title="Do you offer a free trial?"
                            body="All premium plans come with a 14-day free trial. No credit card required to start."
                        />
                        <FaqItem
                            title="What music platforms do you support?"
                            body="We support Spotify, Apple Music, YouTube Music, and Amazon Music. You can export playlists to any of these platforms."
                        />
                        <FaqItem
                            title="Can I cancel anytime?"
                            body="Absolutely. Cancel anytime with no fees or penalties. You'll continue to have access until the end of your billing period."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectionPage;