// NEXT_OUTPUT=export produit un site 100 % statique dans out/ (variante nginx, voir Dockerfile.static).
// Par défaut : serveur Node autonome (output standalone, voir Dockerfile).
const isStaticExport = process.env.NEXT_OUTPUT === "export";

// styled-components injecte ses <style> à l'exécution : 'unsafe-inline' est requis pour style-src.
// Les scripts restent limités à l'origine (Next n'injecte aucun script inline exécutable en Pages Router).
const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self'",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"font-src 'self' https://fonts.gstatic.com",
	"img-src 'self' data: blob:",
	"connect-src 'self' https://api.github.com",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: isStaticExport ? "export" : "standalone",
	reactStrictMode: true,
	poweredByHeader: false,
	compiler: {
		styledComponents: true,
	},
	// L'optimiseur d'images a besoin du serveur Node ; en export statique les images sont servies telles quelles.
	images: isStaticExport ? { unoptimized: true } : {},
};

// headers() n'est pas supporté en export statique (nginx les pose) ; en dev, la CSP bloquerait le HMR.
if (!isStaticExport && process.env.NODE_ENV === "production") {
	nextConfig.headers = async () => [{ source: "/:path*", headers: securityHeaders }];
}

module.exports = nextConfig;
