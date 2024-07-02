import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const user = await prisma.user.findMany({ cacheStrategy: { swr: 10, ttl: 30 } });
		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' },
		});
	},
} satisfies ExportedHandler<Env>;
