import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const prisma = new PrismaClient().$extends(withAccelerate());
		const user = await prisma.user.findMany();
		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' },
		});
	},
} satisfies ExportedHandler<Env>;
