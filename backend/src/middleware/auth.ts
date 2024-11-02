import { auth } from "express-oauth2-jwt-bearer";

const audience = process.env.AUTH0_AUDIENCE
const issuerBaseURL = process.env.AUTH0_ISSUER_URL
console.log({ audience, issuerBaseURL })

export const jwtCheck = auth({
    audience: audience,
    issuerBaseURL: issuerBaseURL,
    tokenSigningAlg: 'RS256'
});