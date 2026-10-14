import { env } from "cloudflare:workers";
import { handleApi } from "../../../server/api.mjs";
export const dynamic = "force-dynamic";
export async function GET(request: Request){return handleApi(request,env)}
export async function POST(request: Request){return handleApi(request,env)}
